import { Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import Salary from "./Components/Salary";
import PO from "./Components/Po";
import Stock from "./Components/Stock";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      
      {/* ✅ PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* ✅ PROTECTED LAYOUT ROUTES */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="salary" element={<Salary />} />
        <Route path="po" element={<PO />} />
        <Route path="stock" element={<Stock />} />
      </Route>

    </Routes>
  );
}
