import { PDFDocument } from "pdf-lib";

export async function mergePdfFiles(
  files: File[]
): Promise<Uint8Array> {
  if (files.length < 2) {
    throw new Error("Please select at least two PDF files.");
  }

  const outputPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();

    const sourcePdf = await PDFDocument.load(bytes);

    const copiedPages = await outputPdf.copyPages(
      sourcePdf,
      sourcePdf.getPageIndices()
    );

    for (const page of copiedPages) {
      outputPdf.addPage(page);
    }
  }

  return outputPdf.save();
}