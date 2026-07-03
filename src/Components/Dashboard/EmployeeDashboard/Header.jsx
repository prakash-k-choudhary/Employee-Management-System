import React from "react";

const Header = ({ employee, handleLogout }) => {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">Welcome back</p>

        <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
          Hello, {employee?.firstName || "Employee"} 👋
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          {employee?.department || "General"} • {employee?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="w-fit rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-800"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;