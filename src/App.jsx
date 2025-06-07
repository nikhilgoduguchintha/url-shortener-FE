import React from "react";
import URLShortenForm from "./components/URLShortenForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="title">🔗 URL Shortener</h1>
      <p className="subtitle">
        Paste your long URL below and get a short, shareable link instantly.
        Optionally, customize your short link for better branding!
      </p>
      <URLShortenForm />
    </div>
  );
}

export default App;