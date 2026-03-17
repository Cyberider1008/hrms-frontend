import { useEffect, useState } from "react";
import api from "../api";

export default function Attendance() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  // ✅ Status choices (matches Django model)
  const STATUS_CHOICES = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

  useEffect(() => {
    fetchAll();
  }, []);

  // Fetch data
  const fetchAll = async () => {
    try {
      const emp = await api.get("employees/");
      const att = await api.get("attendance/");
      setEmployees(emp.data || []);
      setData(att.data || []);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  // Submit form
  const submit = async (e) => {
    e.preventDefault();

    if (!form.employee || !form.date) {
      alert("Please select employee and date");
      return;
    }

    try {
      await api.post("attendance/", form);

      // Reset form
      setForm({
        employee: "",
        date: "",
        status: "Present",
      });

      fetchAll();
    } catch (error) {
      console.log("Error:", error.response?.data);

      if (error.response?.data?.non_field_errors) {
        alert("Attendance already exists for this date");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Attendance Management
        </h1>

        {/* FORM */}
        <div className="bg-white border rounded-lg p-5 mb-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Mark Attendance
          </h2>

          <form onSubmit={submit} className="grid grid-cols-4 gap-4">

            {/* Employee */}
            <select
              className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              value={form.employee}
              onChange={(e) =>
                setForm({
                  ...form,
                  employee: e.target.value
                    ? Number(e.target.value)
                    : "",
                })
              }
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            {/* Status */}
            <select
              className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              {STATUS_CHOICES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Button */}
            <button className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700">
              Submit
            </button>

          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-lg shadow-sm">

          <div className="flex justify-between items-center px-5 py-3 border-b">
            <h2 className="text-lg font-medium text-gray-700">
              Attendance Records
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                <th className="text-left px-5 py-3 border-b">Employee</th>
                <th className="text-left px-5 py-3 border-b">Date</th>
                <th className="text-left px-5 py-3 border-b">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {d.employee_name}
                    </td>

                    <td className="px-5 py-3 text-gray-600">
                      {d.date}
                    </td>

                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          d.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}