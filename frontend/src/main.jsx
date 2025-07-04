// main.jsx or App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { AuthProvider } from "./context/AuthContext";
import { Helmet } from "react-helmet";

<Helmet>
  <title>finSecure | Manage Your Personal Finances</title>
  <meta name="description" content="Track your income, expenses, and savings easily with finSecure – a secure personal finance tracker web app." />
  <meta name="keywords" content="finance tracker, personal finance, budget app, expense manager, finSecure, React finance app" />
  <meta name="author" content="Akash Verma" />
  <meta name="google-site-verification" content="KZDj_6Gseo2H8yzO6sLBYzUkZ4nSeyc62MJvAbz7JSc" />
</Helmet>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
