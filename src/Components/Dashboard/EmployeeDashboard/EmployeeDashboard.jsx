import React from "react";
import Header from "./Header";
import StatsGrid from "./StatsGrid";
import TaskList from "./TaskList";

const EmployeeDashboard = ({ employee, handleLogout, updateTaskStatus }) => {
  const tasks = employee?.tasks || [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Employee Management System
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Employee Panel
          </h1>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-2xl sm:p-6 lg:p-8">
          <Header employee={employee} handleLogout={handleLogout} />

          <StatsGrid tasks={tasks} />

          <TaskList
            employeeId={employee.id}
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;