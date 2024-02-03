import jsPDF from "jspdf";
import "jspdf-autotable";
import { convertDateToLocaleDateString } from "./helper";

// define a generatePDF function that accepts a tickets argument
export const generatePDF = (headers, data, filename = "spendy") => {
  // extract header & accessor key from head coming from tanstack table
  let filteredHeaders = headers
    .map((item) => ({
      header: item.header,
      key: item.accessorKey,
    }))
    .filter((item) => !!item.header);

  // making an arrray of keys - which will be used to access data
  const keys = filteredHeaders.map((item) => item?.key);

  // define the columns we want and their titles
  const tableColumn = filteredHeaders.map((item) => item?.header || item);

  // initialize jsPDF
  const doc = new jsPDF();

  // define an empty array of rows
  const tableRows = [];
  // for each ticket pass all its data into an array
  data.forEach((item) => {
    const rowData = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if (element === "date")
        rowData.push(convertDateToLocaleDateString(item[element]));
      else rowData.push(item[element]);
    }
    // push each tickcet's info into a row
    tableRows.push(rowData);
  });
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(filename, 14, 15);
  // we define the name of our PDF file.
  doc.save(`${filename}_${dateStr}.pdf`);
};

export const exportPDF = () => {
  const doc = new jsPDF();
  doc.autoTable({ html: "#datagridtable" });
  doc.save("table.pdf");
};
