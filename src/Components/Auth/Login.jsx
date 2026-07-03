import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    handleLogin(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-lg shadow-blue-500/30">
            <img
              src="/ems-logo.png"
              alt="EMS Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Employee Management System
          </p>

          <h1 className="mt-4 text-4xl font-black">Login</h1>

          <p className="mt-2 text-sm text-gray-400">
            Use demo credentials to explore admin and employee panels
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ems.com"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 pr-20 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-blue-300 transition hover:text-blue-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-blue-300">
            Demo Credentials
          </h2>

          <div className="mt-4 grid gap-3 text-sm text-gray-300">
            <button
              type="button"
              onClick={() => fillDemoCredentials("admin@ems.com", "admin123")}
              className="rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/20"
            >
              <p className="font-bold text-white">Admin: Neha</p>
              <p>admin@ems.com / admin123</p>
            </button>

            <button
              type="button"
              onClick={() => fillDemoCredentials("ops@ems.com", "ops123")}
              className="rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/20"
            >
              <p className="font-bold text-white">Admin: Kunal</p>
              <p>ops@ems.com / ops123</p>
            </button>

            <button
              type="button"
              onClick={() => fillDemoCredentials("raj@ems.com", "123")}
              className="rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/20"
            >
              <p className="font-bold text-white">Employee: Raj</p>
              <p>raj@ems.com / 123</p>
            </button>

            <button
              type="button"
              onClick={() => fillDemoCredentials("riya@ems.com", "123")}
              className="rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/20"
            >
              <p className="font-bold text-white">Employee: Riya</p>
              <p>riya@ems.com / 123</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
