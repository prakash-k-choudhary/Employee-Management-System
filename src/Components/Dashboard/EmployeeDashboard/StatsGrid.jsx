import React from "react";

const StatsGrid = ({ tasks = [] }) => {
  const newTaskCount = tasks.filter((task) => task.newTask).length;
  const activeCount = tasks.filter((task) => task.active).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const failedCount = tasks.filter((task) => task.failed).length;

  const stats = [
    {
      title: "New Tasks",
      count: newTaskCount,
      icon: "📌",
      bg: "from-blue-500 to-cyan-400",
    },
    {
      title: "Active",
      count: activeCount,
      icon: "🟡",
      bg: "from-yellow-400 to-orange-500",
    },
    {
      title: "Completed",
      count: completedCount,
      icon: "✅",
      bg: "from-green-500 to-emerald-400",
    },
    {
      title: "Failed",
      count: failedCount,
      icon: "⚠️",
      bg: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`rounded-3xl bg-gradient-to-br ${item.bg} p-5 shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-white">{item.count}</h2>
              <p className="mt-2 text-sm font-bold text-white">
                {item.title}
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;