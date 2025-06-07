import React, { useState } from "react";
import { shortenUrl } from "../services/api.js";
import { motion } from "framer-motion";
import "./URLShortenForm.css";

const URLShortenForm = () => {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const payload = customAlias.trim() ? { url, customAlias } : { url };
      const response = await shortenUrl(payload);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.form
      className="form-container"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Custom alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        className="input"
      />
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {result && (
        <motion.div
          className="result-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="short-url-box">
            <span className="short-url-label">Short URL:</span>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="short-url-link"
            >
              {result.shortUrl}
            </a>
          </div>
          <motion.button
            type="button"
            className={`copy-button ${copied ? "copied" : ""}`}
            whileTap={{ scale: 0.95 }}
            animate={{ backgroundColor: copied ? "#28a745" : "#007bff" }}
            onClick={handleCopy}
          >
            {copied ? "Copied! ✅" : "Copy"}
          </motion.button>
        </motion.div>
      )}

      {error && <p className="error">{error}</p>}
    </motion.form>
  );
};

export default URLShortenForm;
