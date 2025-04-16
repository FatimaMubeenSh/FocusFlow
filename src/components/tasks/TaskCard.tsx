import { Task } from "../../types/Task";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedType, setEditedType] = useState(task.type);

  const handleSave = () => {
    onEdit({ ...task, title: editedTitle, type: editedType });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <div className={`bg-white text-gray-800 rounded-md shadow px-4 mb-2 py-3 ${editedType === "key" ? "" : "border border-gray-200"}`}>
          <div className="flex flex-col gap-2">
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
            <select value={editedType} onChange={(e) => setEditedType(e.target.value as "key" | "secondary")} className="border border-gray-300 rounded px-2 py-1">
              <option value="key">Key</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <button onClick={handleSave} className="btn btn-sm">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className={`bg-white text-gray-800 rounded-md shadow px-4 mb-2 py-3 ${task.type === "key" ? "" : "border border-gray-200"}`}>
          <h3 className="font-semibold text-lg" title={task.title}>
            {task.title.length > 30 ? task.title.slice(0, 30) + "..." : task.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{task.timestamp}</p>
          <div className="flex gap-2 mt-2 justify-end">
            <Pencil size={18} className="text-purple-500 cursor-pointer" onClick={() => setIsEditing(true)} />
            <Trash2 size={18} className="text-red-500 cursor-pointer" onClick={() => onDelete(task.id)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
