import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <h1>HRMS Lite</h1>
          <div>
            <Link to="/">Employees</Link>
            <Link to="/attendance">Attendance</Link>
          </div>
        </div>

        <div className="container">
          <Routes>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}