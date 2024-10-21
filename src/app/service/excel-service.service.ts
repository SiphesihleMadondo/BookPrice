import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }




  // Function to export data to Excel
   exportToExcel(data: any, fileName: any) {
    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Generate a binary string representation of the workbook
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
  
    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
  
    // Append the link to the document and trigger a click to download the file
    document.body.appendChild(link);
    link.click();
  
    // Clean up by removing the link element
    document.body.removeChild(link);
  }
  
 
  
}

//CND for sheetjs.

/* 
npm install https://cdn.sheetjs.com/xlsx-0.20.2/xlsx-0.20.2.tgz

*/