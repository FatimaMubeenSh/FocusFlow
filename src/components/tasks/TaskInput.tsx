import React, { useState } from "react";
import { Task, TaskType } from "../../types/Task";
import { v4 as uuidv4 } from "uuid";

interface TaskInputProps {
  onAdd: (task: Task) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("key");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      type,
      timestamp: new Date().toISOString(),
    };

    onAdd(newTask);
    setTitle("");
    setType("key");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-white">
      <div>
        <input type="text" placeholder="Enter task title..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-indigo-300" />

        <select value={type} onChange={(e) => setType(e.target.value as TaskType)} className="md:ml-4 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-indigo-300 mt-2 md:mt-0">
          <option value="key">Key Task</option>
          <option value="secondary">Secondary Task</option>
        </select>
      </div>

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ml-4 md:m-0">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
