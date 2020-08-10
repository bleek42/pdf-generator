// libraries & frameworks
import React, { Fragment } from 'react';
// materialUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableFooter,
} from '@material-ui/core';
// custom hook
import { useGetEmployees } from '../../hooks/useGetEmployees';
// components
import PdfButton from '../PdfButton/PdfButton';

export default function PdfTable() {
  const { getAll, getById, loading, error } = useGetEmployees();

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
            <TextField
              label="Report"
              variant="outlined"
              color="secondary"
            ></TextField>
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
          <TableFooter>
            <PdfButton />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
