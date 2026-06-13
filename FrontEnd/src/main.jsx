import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DashboardProvider } from "./Context/DashboardContext";
import NotificationProvider from "./Context/NotificationContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DashboardProvider>
      <NotificationProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0b1c2c",
              color: "#fff",
              border: "1px solid #374151",
              fontSize: "13px",
              padding: "10px 12px",
              maxWidth: "90vw",
              textAlign: "center",
            },
          }}
          containerStyle={{
            top: 30,
          }}
        />
        <App />
      </NotificationProvider>
    </DashboardProvider>
  </BrowserRouter>
);