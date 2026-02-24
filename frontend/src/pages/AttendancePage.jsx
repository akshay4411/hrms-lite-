import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/attendance/", {
        employee_id: parseInt(form.employee_id),
        date: form.date,
        status: form.status,
      });
      alert("Attendance marked");
      setForm({ employee_id: "", date: "", status: "Present" });
    } catch (err) {
      alert(err.response?.data?.detail);
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={form.employee_id}
          required
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          required
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}