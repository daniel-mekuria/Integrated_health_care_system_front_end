import React, { useState } from 'react';
import ExcelJS from 'exceljs';

const ExcelSearch = (props) => {
  const [cellLocation, setCellLocation] = useState('');
  const [CellContent, setCellContent] = useState('');


  const printCellContents = async (workbook, cellAddress) => {
    let content = '';
    workbook.eachSheet((sheet, sheetId) => {
      const cell = sheet.getCell(cellAddress);
      if (cell) {
        content = cell.value;
        console.log(`Content of ${cellAddress} in ${sheet.name}:`, content);
        return;
      }
    });
    console.log(content)
    return content;
  };
  

  const searchInWorkbook = async (workbook, searchString) => {
    let foundLocation = '';
    workbook.eachSheet((sheet, sheetId) => {
      sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          // Convert cell value to string for comparison
          const cellValue = cell.value ? cell.value.toString() : '';
          if (cellValue === searchString) {
            foundLocation = `Sheet: ${sheet.name}, Cell: ${cell.address}`;
            console.log(`Found at ${foundLocation}`); // Debugging log
            return;
          }
        });
        if (foundLocation) return;
      });
      if (foundLocation) return;
    });
    return foundLocation;
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const workbook = new ExcelJS.Workbook();
    const searchString = ''; // Replace with your search string
    const content = await printCellContents(workbook, 'J12');
    setCellContent(content);
    try {
      // Read the file into the workbook using the load method
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      // Use the search function to find the string in the workbook
      const location = await searchInWorkbook(workbook, searchString);
      setCellLocation(location);
      console.log(location || 'String not found'); // Debugging log

    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <div className="p-4 mb-1 border">
        <h2 className="font-light">Patient Amount</h2>
        <h1 className="text-4xl">{props.data.length}</h1>
        <p >Patient Number vs Month</p>
      </div>
  );
};

export default ExcelSearch;
