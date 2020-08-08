// libraries and frameworks
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
// custom hook
import { useGetEmployees } from './hooks/useGetEmployees';

export default function PdfTable() {
  const { getAll, getById, loading, error } = useGetEmployees();

  const printDoc = (ev) => {
    ev.preventDefault();
    const input = document.getElementById('pdf-elem');
    html2canvas(input)
      .then((canvas) => {
        let imgWidth = 200;
        let pgHeight = 300;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let pos = 0;
        heightLeft = imgHeight;
        pdf.addImage(imgData, 'JPEG', 0, pos, imgWidth, imgHeight);
        pdf.save('new-file.pdf');
      })
      .catch((err) => {
        throw new Error(
          'PDF generator failed! please try again, or contact an administrator.'
        );
      });
  };

  if (loading === true) {
    return (
      <div>
        <p>some text about loading</p>
      </div>
    );
  }
  if (error === true) {
    return (
      <div>
        <p>some error text</p>
      </div>
    );
  }

  return (
    <div>
      <TableContainer id="pdf-elem" className="txt" component={Paper}>
        <Table stickHeader aria-label="sticky-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right" style={{ paddingRight: '60px' }}>
                Department
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAll.map((employee, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {employee.id}
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.city}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={printDoc} variant="contained" color="primary">
          Generate PDF
        </Button>
      </TableContainer>
    </div>
  );
}
