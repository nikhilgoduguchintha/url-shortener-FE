import axios from "axios";

const API_BASE = "https://url-shortener-be-edgf.onrender.com/api";

export const shortenUrl = (payload) => {
  return axios.post(`${API_BASE}/urls`, payload);
};
