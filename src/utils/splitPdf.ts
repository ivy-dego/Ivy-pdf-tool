import { PDFDocument } from "pdf-lib";
import { parsePageRanges } from "./pageRanges";

export async function splitPdf(
  file: File,
  range: string
): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer();

  const sourcePdf = await PDFDocument.load(bytes);

  const totalPages = sourcePdf.getPageCount();

  const selectedPages = parsePageRanges(
    range,
    totalPages
  );

  const outputPdf = await PDFDocument.create();

  const copiedPages = await outputPdf.copyPages(
    sourcePdf,
    selectedPages
  );

  for (const page of copiedPages) {
    outputPdf.addPage(page);
  }

  return outputPdf.save();
}