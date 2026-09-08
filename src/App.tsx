import "./App.css";
import MergePdf from "./components/MergePdf";
import SplitPdf from "./components/SplitPdf";

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Ivy PDF Tool</h1>

        <p>
          Your files are processed locally in your browser.
        </p>
      </header>

      <div className="tools-container">
        <div className="tool-box">
          <MergePdf />
        </div>

        <div className="tool-box">
          <SplitPdf />
        </div>
      </div>

      <footer className="footer">
        🔒 Your documents never leave your device.
        Version 1.0.0
        
      </footer>
    </main>
  );
}

export default App;