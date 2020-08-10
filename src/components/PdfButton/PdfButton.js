// libraries & frameworks
import React, { Fragment } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// materialUI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const PdfButton = () => {
  const classes = useStyles();

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
  return (
    <Fragment>
      <Button
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={printDoc}
        variant="contained"
        color="primary"
      ></Button>
    </Fragment>
  );
};

export default PdfButton;
