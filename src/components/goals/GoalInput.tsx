import { useState } from "react";

interface Props {
  onAdd: (goal: { title: string; dueDate: string }) => void;
}

const GoalInput: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    onAdd({ title, dueDate });
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mt-4 mb-6 w-full md:w-3/4 lg:w-1/2 mx-auto">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <input placeholder="Add Goal Title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 border  border-gray-300 px-3 py-2 rounded" />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
          onClick={(e) => {
            const input = e.target as HTMLInputElement;
            input.showPicker && input.showPicker();
          }}
          min={new Date().toISOString().split("T")[0]} // Disable back date selection
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default GoalInput;
