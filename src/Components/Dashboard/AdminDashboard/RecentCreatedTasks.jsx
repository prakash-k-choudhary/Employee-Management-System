import React from "react";

const priorityStyles = {
  High: "border-red-400/30 bg-red-500/15 text-red-300",
  Medium: "border-yellow-400/30 bg-yellow-500/15 text-yellow-300",
  Low: "border-green-400/30 bg-green-500/15 text-green-300",
};

const RecentCreatedTasks = ({ tasks = [] }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Recently Created</h2>
          <p className="mt-1 text-sm text-gray-400">
            Latest tasks assigned in this session
          </p>
        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-gray-300">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
          <p className="text-sm text-gray-400">No task created yet.</p>
        </div>
      ) : (
        <div className="no-scrollbar max-h-[520px] space-y-4 overflow-y-auto pr-1">
          {tasks.map((task) => {
            const priority = task.priority || "Medium";

            return (
              <div
                key={task.id}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      priorityStyles[priority]
                    }`}
                  >
                    {priority}
                  </span>

                  <span className="text-xs text-gray-400">
                    {task.taskDate}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">
                  {task.taskTitle}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {task.taskDescription}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 font-bold text-green-300">
                    Assigned to {task.employeeName}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-gray-300">
                    {task.employeeEmail}
                  </span>

                  <span className="rounded-full bg-purple-500/20 px-3 py-1 font-bold text-purple-300">
                    By {task.createdBy}
                  </span>

                  <span className="rounded-full bg-blue-500/20 px-3 py-1 font-bold text-blue-300">
                    {task.status}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-gray-300">
                    {task.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentCreatedTasks;