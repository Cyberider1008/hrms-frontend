import { useEffect, useState } from "react";
import api from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Add employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee_id || !form.full_name || !form.email) {
      alert("Please fill required fields");
      return;
    }

    try {
      await api.post("employees/", form);

      // reset form
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
      });

      fetchEmployees();
    }catch (err) {
        const errors = err.response?.data;

        if (errors) {
            const message = Object.entries(errors)
            .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
            .join("\n");

            alert(message);
        } else {
            alert("Something went wrong");
        }
        }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    await api.delete(`employees/${id}/`);
    fetchEmployees();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Employee Management
        </h1>

        {/* FORM */}
        <div className="bg-white border rounded-lg p-5 mb-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Add Employee
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">

            <input
              placeholder="Employee ID"
              className="border rounded px-3 py-2 text-sm"
              value={form.employee_id}
              onChange={(e)=>setForm({...form, employee_id:e.target.value})}
            />

            <input
              placeholder="Full Name"
              className="border rounded px-3 py-2 text-sm"
              value={form.full_name}
              onChange={(e)=>setForm({...form, full_name:e.target.value})}
            />

            <input
              placeholder="Email"
              className="border rounded px-3 py-2 text-sm"
              value={form.email}
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />

            <input
              placeholder="Department"
              className="border rounded px-3 py-2 text-sm"
              value={form.department}
              onChange={(e)=>setForm({...form, department:e.target.value})}
            />

            <button className="col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add Employee
            </button>

          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-lg shadow-sm">

          <div className="px-5 py-3 border-b flex justify-between">
            <h2 className="text-lg font-medium text-gray-700">
              Employee List
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                <th className="px-5 py-3 text-left border-b">ID</th>
                <th className="px-5 py-3 text-left border-b">Name</th>
                <th className="px-5 py-3 text-left border-b">Email</th>
                <th className="px-5 py-3 text-left border-b">Department</th>
                <th className="px-5 py-3 text-left border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">

                    <td className="px-5 py-3">{emp.employee_id}</td>

                    <td className="px-5 py-3 font-medium text-gray-800">
                      {emp.full_name}
                    </td>

                    <td className="px-5 py-3 text-gray-600">
                      {emp.email}
                    </td>

                    <td className="px-5 py-3">
                      {emp.department}
                    </td>

                    <td className="px-5 py-3">
                      <button
                        onClick={()=>deleteEmployee(emp.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
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