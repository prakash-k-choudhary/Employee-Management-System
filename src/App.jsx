import React, { useContext } from "react";
import Login from "./Components/Auth/Login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider.jsx";

const App = () => {
  const {
    employees,
    loggedInUser,
    loginUser,
    logoutUser,
    updateTaskStatus,
  } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    const isLoggedIn = loginUser(email, password);

    if (!isLoggedIn) {
      alert("Invalid credentials");
    }
  };

  if (!loggedInUser) {
    return <Login handleLogin={handleLogin} />;
  }

  if (loggedInUser.role === "admin") {
    return (
      <AdminDashboard admin={loggedInUser} handleLogout={logoutUser} />
    );
  }

  const currentEmployee = employees.find(
    (employee) => employee.id === loggedInUser.id
  );

  if (!currentEmployee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-black">Employee not found</h1>

          <p className="mt-2 text-sm text-gray-400">
            Your session data is outdated. Please login again.
          </p>

          <button
            onClick={logoutUser}
            className="mt-6 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <EmployeeDashboard
      employee={currentEmployee}
      handleLogout={logoutUser}
      updateTaskStatus={updateTaskStatus}
    />
  );
};

export default App;