import React from "react";

const priorityStyles = {
  High: "border-red-400/30 bg-red-500/15 text-red-300",
  Medium: "border-yellow-400/30 bg-yellow-500/15 text-yellow-300",
  Low: "border-green-400/30 bg-green-500/15 text-green-300",
};

const TaskCard = ({ task, employeeId, updateTaskStatus }) => {
  const getStatus = () => {
    if (task.failed) {
      return {
        label: "Failed",
        emoji: "⚠️",
        banner: "border-red-400/30 bg-red-500/20 text-red-200",
      };
    }

    if (task.completed) {
      return {
        label: "Completed",
        emoji: "✅",
        banner: "border-green-400/30 bg-green-500/20 text-green-200",
      };
    }

    if (task.newTask) {
      return {
        label: "New Task",
        emoji: "📌",
        banner: "border-blue-400/30 bg-blue-500/20 text-blue-200",
      };
    }

    if (task.active) {
      return {
        label: "Active",
        emoji: "🟡",
        banner: "border-yellow-400/30 bg-yellow-500/20 text-yellow-200",
      };
    }

    return {
      label: "Pending",
      emoji: "⏳",
      banner: "border-gray-400/30 bg-gray-500/20 text-gray-200",
    };
  };

  const status = getStatus();
  const priority = task.priority || "Medium";

  return (
    <div className="min-w-[330px] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl max-sm:min-w-full">
      <div
        className={`mb-4 flex items-center justify-between rounded-2xl border px-4 py-3 ${status.banner}`}
      >
        <span className="text-sm font-black">
          {status.emoji} {status.label}
        </span>

        <span className="text-xs font-semibold">{task.taskDate}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-300">
          {task.category}
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${
            priorityStyles[priority]
          }`}
        >
          {priority}
        </span>
      </div>

      <h3 className="text-xl font-black text-white">{task.taskTitle}</h3>

      <p className="mt-3 h-20 overflow-hidden text-sm leading-6 text-gray-300">
        {task.taskDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {task.newTask && (
          <button
            onClick={() => updateTaskStatus(employeeId, task.id, "active")}
            className="rounded-xl bg-yellow-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-yellow-700"
          >
            Accept
          </button>
        )}

        {task.active && (
          <>
            <button
              onClick={() =>
                updateTaskStatus(employeeId, task.id, "completed")
              }
              className="rounded-xl bg-green-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-700"
            >
              Complete
            </button>

            <button
              onClick={() => updateTaskStatus(employeeId, task.id, "failed")}
              className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
            >
              Fail
            </button>
          </>
        )}

        {(task.completed || task.failed) && (
          <span className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-gray-300">
            No action needed
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;