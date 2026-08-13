import { Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import Salary from "./Components/Salary";
import PO from "./Components/Po";
import Stock from "./Components/Stock";
import GNS from "./Components/G&S";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import BasicCalc from "./Components/Calculators/BasicCalc";
import EMICalc from "./Components/Calculators/EMICalc";
import FDCalc from "./Components/Calculators/FDCalc";
import InflationCalc from "./Components/Calculators/InflationCalc";
import ITCalc from "./Components/Calculators/ITCalc";
import LumpsumCalc from "./Components/Calculators/LumpsumCalc";
import PLCalc from "./Components/Calculators/P&LCalc";
import PPFCalc from "./Components/Calculators/PPFCalc";
import RDCalc from "./Components/Calculators/RDCalc";
import SIPCalc from "./Components/Calculators/SIPCalc";
import StepUpCalc from "./Components/Calculators/StepUpCalc";
import SWPCalc from "./Components/Calculators/SWPCalc";

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
        <Route path="gns" element={<GNS />} />
        <Route path="/calculator">
          <Route path="basic" element={<BasicCalc />} />
          <Route path="emi" element={<EMICalc />} />
          <Route path="fd" element={<FDCalc />} />
          <Route path="inflation" element={<InflationCalc />} />
          <Route path="it" element={<ITCalc />} />
          <Route path="lump" element={<LumpsumCalc />} />
          <Route path="pl" element={<PLCalc />} />
          <Route path="ppf" element={<PPFCalc />} />
          <Route path="rd" element={<RDCalc />} />
          <Route path="sip" element={<SIPCalc />} />
          <Route path="stepup" element={<StepUpCalc />} />
          <Route path="swp" element={<SWPCalc />} />
        </Route>
      </Route>

    </Routes>
  );
}
