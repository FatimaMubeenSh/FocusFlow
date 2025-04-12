import { Goal } from "../../types/Goal";
import { useState } from "react";
import { formatDistanceToNowStrict, format } from "date-fns";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";

interface Props {
  goal: Goal;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updatedGoal: Goal) => void;
  onProgressChange: (id: string, progress: number) => void;
}

const GoalAccordion: React.FC<Props> = ({ goal, isExpanded, onToggle, onDelete, onUpdate, onProgressChange }) => {
  const [description, setDescription] = useState(goal.description);
  const [progress, setProgress] = useState(goal.progress);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDate, setEditDate] = useState(goal.dueDate);

  const handleSave = () => {
    onUpdate({ ...goal, title: editTitle, dueDate: editDate, description, progress });
    setIsEditing(false);
  };

  const handleProgress = (value: string) => {
    const numericValue = parseInt(value, 10);
    setProgress(numericValue);
    onProgressChange(goal.id, numericValue);
  };

  const handleDatePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.showPicker && input.showPicker();
  };

  return (
    <div className={`shadow-md rounded mb-4 w-full md:w-3/5 lg:w-2/3 mx-auto ${isExpanded ? "bg-blue-200 p-8" : "bg-white border border-gray-100 p-4"} transition-all`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={onToggle}>
        <div className="font-semibold text-lg">{goal.title}</div>
        <div className="text-sm flex gap-4 text-gray-500">
          <span>Due By: {format(new Date(goal.dueDate), "dd MMM, yyyy")}</span>
          <span>{new Date(goal.dueDate) > new Date() ? `${formatDistanceToNowStrict(new Date(goal.dueDate), { addSuffix: false })} Left` : `${formatDistanceToNowStrict(new Date(goal.dueDate), { addSuffix: false })} Over`}</span>
          <span>{goal.progress}% Done</span>
        </div>
        <div className={`transform transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}>
          <ChevronDown className={`cursor-pointer ${isExpanded ? "text-black" : "text-blue-600"}`} />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 mb-3 p-2 rounded bg-blue-50" rows={3} />

          <label className="text-sm font-semibold">Progress</label>
          <div className="flex items-center gap-3">
            <input type="range" min="0" max="100" value={progress} onChange={(e) => handleProgress(e.target.value)} className="w-full" />
            <span>{progress}%</span>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            {isEditing ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="px-2 py-1 border border-gray-600 rounded" />
                <input type="date" value={editDate} min={new Date().toISOString().split("T")[0]} onClick={(e) => handleDatePicker(e)} onChange={(e) => setEditDate(e.target.value)} className="px-2 py-1 border border-gray-600 rounded" />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <Pencil className="text-blue-600 cursor-pointer" onClick={() => setIsEditing(true)} />
                <Trash2 className="text-red-600 cursor-pointer" onClick={onDelete} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalAccordion;