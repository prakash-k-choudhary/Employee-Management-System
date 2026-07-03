import React from "react";

const AdminHeader = ({ admin, handleLogout }) => {
  return (
    <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            Employee Management System
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Admin Panel
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Welcome, {admin?.firstName || "Admin"} •{" "}
            {admin?.department || "Management"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-fit rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-800"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;