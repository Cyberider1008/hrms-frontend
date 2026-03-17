import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6">

        <h2 className="text-xl font-semibold mb-8">HRMS</h2>

        <nav className="space-y-2 text-sm">

          <div
            onClick={() => setPage("employees")}
            className={`p-2 rounded cursor-pointer ${
              page === "employees"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Employees
          </div>

          <div
            onClick={() => setPage("attendance")}
            className={`p-2 rounded cursor-pointer ${
              page === "attendance"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            Attendance
          </div>

        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white px-6 py-4 border-b flex justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            {page === "employees" ? "Employee Management" : "Attendance Management"}
          </h1>

          <div className="text-sm text-gray-500">
            Welcome, Admin
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          {page === "employees" && <Employees />}
          {page === "attendance" && <Attendance />}
        </div>

      </div>
    </div>
  );
}

export default App;