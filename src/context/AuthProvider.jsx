import React, { createContext, useEffect, useState } from "react";
import { adminsData, employeesData } from "../data/emsData.js";

export const AuthContext = createContext();

const TASKS_STORAGE_KEY = "emsTaskData";
const LOGGED_IN_USER_KEY = "loggedInUser";

const getSavedTaskData = () => {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!savedTasks) return null;

  try {
    return JSON.parse(savedTasks);
  } catch {
    return null;
  }
};

const saveTaskData = (employees) => {
  const taskData = employees.reduce((acc, employee) => {
    acc[employee.id] = employee.tasks || [];
    return acc;
  }, {});

  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskData));
};

const getInitialEmployees = () => {
  const savedTaskData = getSavedTaskData();

  if (!savedTaskData) return employeesData;

  return employeesData.map((employee) => ({
    ...employee,
    tasks: savedTaskData[employee.id] || employee.tasks || [],
  }));
};

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState(getInitialEmployees);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(LOGGED_IN_USER_KEY);

    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.role === "admin") {
        const adminExists = adminsData.some(
          (admin) => admin.id === parsedUser.id
        );

        if (adminExists) {
          setLoggedInUser(parsedUser);
        } else {
          localStorage.removeItem(LOGGED_IN_USER_KEY);
        }

        return;
      }

      if (parsedUser.role === "employee") {
        const employeeExists = employeesData.some(
          (employee) => employee.id === parsedUser.id
        );

        if (employeeExists) {
          setLoggedInUser(parsedUser);
        } else {
          localStorage.removeItem(LOGGED_IN_USER_KEY);
        }
      }
    } catch {
      localStorage.removeItem(LOGGED_IN_USER_KEY);
    }
  }, []);

  const loginUser = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const admin = adminsData.find(
      (admin) =>
        admin.email.toLowerCase() === normalizedEmail &&
        admin.password === password
    );

    if (admin) {
      const safeAdmin = {
        id: admin.id,
        firstName: admin.firstName,
        email: admin.email,
        role: admin.role,
        department: admin.department,
      };

      setLoggedInUser(safeAdmin);
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(safeAdmin));
      return true;
    }

    const employee = employees.find(
      (employee) =>
        employee.email.toLowerCase() === normalizedEmail &&
        employee.password === password
    );

    if (employee) {
      const safeEmployee = {
        id: employee.id,
        firstName: employee.firstName,
        email: employee.email,
        role: employee.role,
        department: employee.department,
      };

      setLoggedInUser(safeEmployee);
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(safeEmployee));
      return true;
    }

    return false;
  };

  const logoutUser = () => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    setLoggedInUser(null);
  };

  const assignTaskToEmployee = (employeeId, taskData) => {
    const newTask = {
      id: Date.now(),
      active: false,
      newTask: true,
      completed: false,
      failed: false,
      taskTitle: taskData.taskTitle,
      taskDescription: taskData.taskDescription,
      taskDate: taskData.taskDate,
      category: taskData.category,
      priority: taskData.priority || "Medium",
    };

    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.map((employee) =>
        employee.id === Number(employeeId)
          ? {
              ...employee,
              tasks: [newTask, ...(employee.tasks || [])],
            }
          : employee
      );

      saveTaskData(updatedEmployees);

      return updatedEmployees;
    });

    return newTask;
  };

  const updateTaskStatus = (employeeId, taskId, status) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.map((employee) => {
        if (employee.id !== Number(employeeId)) return employee;

        const updatedTasks = employee.tasks.map((task) => {
          if (task.id !== Number(taskId)) return task;

          if (status === "active") {
            return {
              ...task,
              active: true,
              newTask: false,
              completed: false,
              failed: false,
            };
          }

          if (status === "completed") {
            return {
              ...task,
              active: false,
              newTask: false,
              completed: true,
              failed: false,
            };
          }

          if (status === "failed") {
            return {
              ...task,
              active: false,
              newTask: false,
              completed: false,
              failed: true,
            };
          }

          return task;
        });

        return {
          ...employee,
          tasks: updatedTasks,
        };
      });

      saveTaskData(updatedEmployees);

      return updatedEmployees;
    });
  };

  const resetTaskData = () => {
    localStorage.removeItem(TASKS_STORAGE_KEY);
    setEmployees(employeesData);
  };

  return (
    <AuthContext.Provider
      value={{
        employees,
        loggedInUser,
        loginUser,
        logoutUser,
        assignTaskToEmployee,
        updateTaskStatus,
        resetTaskData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;