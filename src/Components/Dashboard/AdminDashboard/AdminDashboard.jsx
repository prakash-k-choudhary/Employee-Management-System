import React, { useContext, useState } from "react";
import AdminHeader from "./AdminHeader";
import CreateTaskForm from "./CreateTaskForm";
import RecentCreatedTasks from "./RecentCreatedTasks";
import EmployeeReports from "./EmployeeReports";
import { AuthContext } from "../../../context/AuthProvider.jsx";

const AdminDashboard = ({ admin, handleLogout }) => {
  const { employees, assignTaskToEmployee } = useContext(AuthContext);
  const [recentTasks, setRecentTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateTask = (taskData) => {
    const selectedEmployee = employees.find(
      (employee) => employee.id === Number(taskData.employeeId)
    );

    if (!selectedEmployee) {
      alert("Please select a valid employee");
      return;
    }

    const newTask = assignTaskToEmployee(taskData.employeeId, taskData);

    const recentTask = {
      ...newTask,
      employeeName: selectedEmployee.firstName,
      employeeEmail: selectedEmployee.email,
      createdBy: admin?.firstName || "Admin",
      status: "New Task",
    };

    setRecentTasks((prevTasks) => [recentTask, ...prevTasks]);

    setSuccessMessage(
      `Task assigned successfully to ${selectedEmployee.firstName}`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed left-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <AdminHeader admin={admin} handleLogout={handleLogout} />

        {successMessage && (
          <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-500/20 px-5 py-4 text-sm font-bold text-green-200">
            ✅ {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[430px_1fr]">
          <CreateTaskForm
            employees={employees}
            onCreateTask={handleCreateTask}
          />

          <div className="space-y-6">
            <EmployeeReports employees={employees} />

            <RecentCreatedTasks tasks={recentTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;