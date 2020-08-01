import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfTable() {
  const [data, setData] = useState([]);

  const printDoc = () => {
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

  return (
    <div>
      <p>some more text</p>
    </div>
  );
}
