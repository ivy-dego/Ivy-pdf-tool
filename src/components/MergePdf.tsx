import { useState } from "react";
import { mergePdfFiles } from "../utils/mergePdf";
import { downloadPdf } from "../utils/download";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  function moveFile(index: number, direction: "up" | "down") {
    const newFiles = [...files];

    const newIndex =
      direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newFiles.length) {
      return;
    }

    [newFiles[index], newFiles[newIndex]] = [
      newFiles[newIndex],
      newFiles[index],
    ];

    setFiles(newFiles);
  }

  function removeFile(index: number) {
    setFiles(files.filter((_, i) => i !== index));
  }

  async function handleMerge() {
    try {
      setMessage("Merging PDFs...");

      const result = await mergePdfFiles(files);

      downloadPdf(result, "merged.pdf");

      setMessage("Done. Your PDFs were merged.");
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
      <h2>Merge PDFs</h2>

      <p>Select two or more PDF files.</p>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(event) => {
          setFiles(Array.from(event.target.files ?? []));
          setMessage("");
        }}
      />

      {files.length > 0 && (
        <>
          <h3>Merge order</h3>

          <p>
            Arrange the files in the order you want them
            to appear in the final PDF.
          </p>

          <ol>
            {files.map((file, index) => (
              <li key={`${file.name}-${file.size}-${index}`}>
                <span>
                  {file.name}
                </span>

                <button
                  type="button"
                  onClick={() => moveFile(index, "up")}
                  disabled={index === 0}
                >
                  ↑ Up
                </button>

                <button
                  type="button"
                  onClick={() => moveFile(index, "down")}
                  disabled={index === files.length - 1}
                >
                  ↓ Down
                </button>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </>
      )}

      <button
        onClick={handleMerge}
        disabled={files.length < 2}
      >
        Merge & Download
      </button>

      <p>{message}</p>
    </section>
  );
}