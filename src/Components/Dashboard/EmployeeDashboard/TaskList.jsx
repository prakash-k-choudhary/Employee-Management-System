import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ employeeId, tasks = [], updateTaskStatus }) => {
  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Your Tasks</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your assigned work
          </p>
        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-gray-300">
          {tasks.length} Tasks
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center text-gray-400">
          No tasks assigned yet.
        </div>
      ) : (
        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-4 max-sm:flex-col max-sm:overflow-x-hidden">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              employeeId={employeeId}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;