import { useState } from "react";
import { splitPdf } from "../utils/splitPdf";
import { downloadPdf } from "../utils/download";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("");
  const [message, setMessage] = useState("");

  async function handleSplit() {
    if (!file) {
      setMessage("Please choose a PDF file.");
      return;
    }

    try {
      setMessage("Creating your PDF...");

      const result = await splitPdf(file, range);

      downloadPdf(result, `split-${file.name}`);

      setMessage("Done. Your PDF was created.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <section>
      <h2>Split PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(event) =>
          setFile(event.target.files?.[0] ?? null)
        }
      />

      <input
        type="text"
        placeholder="Example: 1-3,5,8-10"
        value={range}
        onChange={(event) => setRange(event.target.value)}
      />

      <p>
        Examples: 1-5 or 1,3,7 or 1-3,5,8-12
      </p>

      <button onClick={handleSplit} disabled={!file}>
        Split & Download
      </button>

      <p>{message}</p>
    </section>
  );
}