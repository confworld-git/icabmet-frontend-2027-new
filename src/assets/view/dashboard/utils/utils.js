
import * as XLSX from "xlsx";
import { toaster } from "evergreen-ui";

export const HandleExcelDownload = (data, name) => {
  if (!data || data.length === 0) {
    toaster.warning("No data available to download.");
    return;
  }
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, `${name}.xlsx`);
};

export const handleDownload = (bufferData, fileType, fileName) => {
  try {
    if (bufferData.type === "Buffer") {
      const byteArray = new Uint8Array(bufferData.data);
      const blob = new Blob([byteArray], { type: fileType });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Invalid buffer data format.");
    }
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};
