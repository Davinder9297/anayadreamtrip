// src/components/ClientWrapper.js
"use client";

import { BrowserRouter as Router } from "react-router-dom";

export default function ClientWrapper({ children }) {
  return <Router>{children}</Router>;
}
