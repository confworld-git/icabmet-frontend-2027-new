import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const downloadURI = (uri, name = "download") => {
  const link = document.createElement("a");
  link.style.display = "none"; // Hide the link
  link.href = uri;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Remove it after click
};

export const downloadBlob = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  downloadURI(url, fileName);
  URL.revokeObjectURL(url); // Clean up
};