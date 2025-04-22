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
}

const GoalAccordion: React.FC<Props> = ({ goal, isExpanded, onToggle, onDelete, onUpdate }) => {
  const [description, setDescription] = useState(goal.description);
  const [progress, setProgress] = useState(goal.progress);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDate, setEditDate] = useState(goal.dueDate);
  const dueDate = new Date(goal.dueDate);
  const isOverdue = dueDate <= new Date();

  const handleDescriptionChange = (value: string) => {
    onUpdate({ ...goal, description: value });
    setDescription(value);
  };

  const handleSave = () => {
    onUpdate({ ...goal, title: editTitle, dueDate: editDate, description, progress });
    setIsEditing(false);
  };

  const handleProgress = (value: string) => {
    const numericValue = parseInt(value, 10);
    setProgress(numericValue);
    onUpdate({ ...goal, progress: numericValue });
  };

  const handleDatePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.showPicker && input.showPicker();
  };

  return (
    <div className={`shadow-md rounded-xl mb-4 w-full md:w-5/6 lg:w-2/3 mx-auto ${isExpanded ? "bg-purple-300 p-8" : "card"} transition-all`}>
      <div className="grid grid-cols-2 justify-between items-center cursor-pointer" onClick={onToggle}>
        <div className="card-header" title={goal.title}>
          {goal.title.length > 35 ? goal.title.slice(0, 35) + "..." : goal.title}
        </div>
        <div className="text-secondary flex justify-around gap-4">
          <span>Due By: {format(new Date(goal.dueDate), "dd MMM, yyyy")}</span>
          {goal.progress < 100 ?
            <span className={isOverdue ? "text-red-500" : ""}>
              {`${formatDistanceToNowStrict(dueDate, { addSuffix: false })} ${isOverdue ? "Over" : "Left"}`}
            </span> :
            <span className="text-green-500">Completed</span>}
          <span>{goal.progress}% Done</span>
          <div className={`transform transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}>
            <ChevronDown className={`cursor-pointer ${isExpanded ? "text-black" : "text-purple-600"}`} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Description</label>
          <textarea value={description} onChange={(e) => handleDescriptionChange(e.target.value)} className="w-full mt-1 mb-3 p-2 rounded bg-blue-50" rows={3} />

          <label className="text-sm font-semibold">Progress</label>
          <div className="flex items-center gap-3">
            <input type="range" min="0" max="100" value={progress} onChange={(e) => handleProgress(e.target.value)} className="w-full" style={{ accentColor: "#9810FA" }} />
            <span>{progress}%</span>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            {isEditing ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="flex-1 px-2 py-1 border border-gray-600 rounded" />
                <input type="date" value={editDate} min={new Date().toISOString().split("T")[0]} onClick={(e) => handleDatePicker(e)} onChange={(e) => setEditDate(e.target.value)} className="px-2 py-1 border border-gray-600 rounded" />
                <button onClick={handleSave} className="btn">
                  Save
                </button>
              </>
            ) : (
              <>
                <Pencil className="text-gray-600 cursor-pointer" onClick={() => setIsEditing(true)} />
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
