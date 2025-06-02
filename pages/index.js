// /pages/index.js
import React from "react";

// Safely import Login. If it fails, render a fallback.
let Login;
let importError = null;
try {
  Login = require("./Login").default;
} catch (err) {
  importError = err;
}

export default function Home(props) {
  // If import failed, show a visible error message
  if (importError) {
    return (
      <div style={{
        fontFamily: "monospace",
        padding: "2rem",
        background: "#fee",
        color: "#900",
        border: "2px solid #900"
      }}>
        <h1>Error: Login page not found</h1>
        <pre>{importError.toString()}</pre>
        <p>
          Make sure <code>pages/Login.js</code> exists and has <code>export default Login</code>.
        </p>
      </div>
    );
  }
  // If Login exists but isn't a function/component, show another error
  if (typeof Login !== "function" && typeof Login !== "object") {
    return (
      <div style={{
        fontFamily: "monospace",
        padding: "2rem",
        background: "#ffe",
        color: "#990",
        border: "2px solid #990"
      }}>
        <h1>Error: Login component invalid</h1>
        <pre>{JSON.stringify(Login)}</pre>
        <p>
          <code>pages/Login.js</code> must export a valid React component.
        </p>
      </div>
    );
  }
  // Render the Login page normally
  return <Login {...props} />;
}
