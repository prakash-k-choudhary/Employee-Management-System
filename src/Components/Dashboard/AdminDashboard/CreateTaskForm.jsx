import React, { useState } from "react";

const CreateTaskForm = ({ employees = [], onCreateTask }) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    taskDate: "",
    category: "",
    priority: "Medium",
    employeeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.taskTitle.trim() ||
      !formData.taskDescription.trim() ||
      !formData.taskDate ||
      !formData.category.trim() ||
      !formData.employeeId
    ) {
      alert("Please fill all fields");
      return;
    }

    onCreateTask(formData);

    setFormData({
      taskTitle: "",
      taskDescription: "",
      taskDate: "",
      category: "",
      priority: "Medium",
      employeeId: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl"
    >
      <h2 className="mb-6 text-2xl font-black text-white">Create Task</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Task Title
          </label>

          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            placeholder="Create dashboard UI"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Description
          </label>

          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            placeholder="Write task description..."
            rows="4"
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
          ></textarea>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Date
          </label>

          <input
            type="date"
            name="taskDate"
            value={formData.taskDate}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Frontend / Bug Fix / Design"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-blue-400"
          >
            <option value="High" className="bg-[#050816]">
              High
            </option>
            <option value="Medium" className="bg-[#050816]">
              Medium
            </option>
            <option value="Low" className="bg-[#050816]">
              Low
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Assign To
          </label>

          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-blue-400"
          >
            <option value="" className="bg-[#050816]">
              Select employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
                className="bg-[#050816]"
              >
                {employee.firstName} - {employee.department}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
        >
          Assign Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;