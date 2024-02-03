import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import { convertDateToLocaleDateString } from "./helper";

export const generateXLSX = (headers, data, filename = "spendy") => {
  // defining file type and extension
  const fileType = "application/vnd.ms-excel;charset=utf-8";
  const fileExtension = ".xlsx";

  // we use a date string to generate our filename.
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  const fileName = `${filename}_${dateStr}`;

  // extract header & accessor key from head coming from tanstack table
  let filteredHeaders = headers
    .map((item) => ({
      header: item.header,
      key: item.accessorKey,
    }))
    .filter((item) => !!item.header);

  // making an arrray of keys - which will be used to access data
  const keys = filteredHeaders.map((item) => item?.key);

  // define the column and title we want
  const columnHeaders = filteredHeaders.map((item) => item?.header || item);

  //   generating rows data here
  let tableRows = [];
  data.forEach((item) => {
    const rowData = [];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      if (element === "date")
        rowData.push(convertDateToLocaleDateString(item[element]));
      else rowData.push(item[element]);
    }

    // saving each generated row
    tableRows.push(rowData);
  });

  const ws = utils.json_to_sheet(tableRows);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  utils.sheet_add_aoa(ws, [[...columnHeaders]], { origin: "A1" });
  const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  const finalData = new Blob([excelBuffer], { type: fileType });
  saveAs(finalData, fileName + fileExtension);
};
