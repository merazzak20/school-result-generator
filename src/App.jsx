import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* For TSX uncomment the commented types below */}
      <span className="countdown font-mono text-2xl">
        <span
          style={{ "--value": 10 } /* as React.CSSProperties */}
          aria-live="polite"
          aria-label={counter}
        >
          10
        </span>
        :
        <span
          style={{ "--value": 24 } /* as React.CSSProperties */}
          aria-live="polite"
          aria-label={counter}
        >
          24
        </span>
        :
        <span
          style={{ "--value": 59 } /* as React.CSSProperties */}
          aria-live="polite"
          aria-label={counter}
        >
          59
        </span>
      </span>
    </>
  );
}

export default App;
