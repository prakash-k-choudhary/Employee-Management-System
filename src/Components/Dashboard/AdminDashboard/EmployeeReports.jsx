import React from "react";

const getTaskCounts = (tasks = []) => {
  return {
    newTask: tasks.filter((task) => task.newTask).length,
    active: tasks.filter((task) => task.active).length,
    completed: tasks.filter((task) => task.completed).length,
    failed: tasks.filter((task) => task.failed).length,
  };
};

const EmployeeReports = ({ employees = [] }) => {
  const totalReport = employees.reduce(
    (total, employee) => {
      const counts = getTaskCounts(employee.tasks);

      return {
        newTask: total.newTask + counts.newTask,
        active: total.active + counts.active,
        completed: total.completed + counts.completed,
        failed: total.failed + counts.failed,
      };
    },
    {
      newTask: 0,
      active: 0,
      completed: 0,
      failed: 0,
    }
  );

  const reportCards = [
    {
      title: "New Tasks",
      count: totalReport.newTask,
      className: "border-blue-400/20 bg-blue-500/20 text-blue-300",
    },
    {
      title: "Active",
      count: totalReport.active,
      className: "border-yellow-400/20 bg-yellow-500/20 text-yellow-300",
    },
    {
      title: "Completed",
      count: totalReport.completed,
      className: "border-green-400/20 bg-green-500/20 text-green-300",
    },
    {
      title: "Failed",
      count: totalReport.failed,
      className: "border-red-400/20 bg-red-500/20 text-red-300",
    },
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-white">Employee Reports</h2>
        <p className="mt-1 text-sm text-gray-400">
          Overall task status of all employees
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {reportCards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl border p-4 ${card.className}`}
          >
            <h3 className="text-3xl font-black">{card.count}</h3>
            <p className="mt-1 text-xs font-bold">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="no-scrollbar mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-gray-400">
              <th className="px-4">Employee</th>
              <th className="px-4">Department</th>
              <th className="px-4">New</th>
              <th className="px-4">Active</th>
              <th className="px-4">Completed</th>
              <th className="px-4">Failed</th>
              <th className="px-4">Total</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => {
              const counts = getTaskCounts(employee.tasks);
              const totalTasks = employee.tasks.length;

              return (
                <tr key={employee.id} className="bg-white/10 text-sm">
                  <td className="rounded-l-2xl px-4 py-4">
                    <p className="font-bold text-white">
                      {employee.firstName}
                    </p>
                    <p className="text-xs text-gray-400">{employee.email}</p>
                  </td>

                  <td className="px-4 py-4 font-semibold text-gray-300">
                    {employee.department}
                  </td>

                  <td className="px-4 py-4 font-bold text-blue-300">
                    {counts.newTask}
                  </td>

                  <td className="px-4 py-4 font-bold text-yellow-300">
                    {counts.active}
                  </td>

                  <td className="px-4 py-4 font-bold text-green-300">
                    {counts.completed}
                  </td>

                  <td className="px-4 py-4 font-bold text-red-300">
                    {counts.failed}
                  </td>

                  <td className="rounded-r-2xl px-4 py-4 font-bold text-white">
                    {totalTasks}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReports;