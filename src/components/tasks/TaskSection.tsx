import TaskCard from "./TaskCard";
import { Task } from "../../types/Task";
import IconButton from "../ui/IconButton";

interface TaskSectionProps {
  type?: string;
  tasks?: Task[];
  onDelete: (taskId: string) => void;
  onClear: (type: "key" | "secondary") => void;
  onEdit: (task: Task) => void;
  className?: string;
}

const TaskSection: React.FC<TaskSectionProps> = ({ type = "secondary", tasks = [], onDelete, onClear, onEdit, className = "" }) => {
  const filteredTasks = tasks.filter((t) => t.type === type);
  const taskCount = filteredTasks.length;
  const isKeyTask = type === "key";
  const isEmpty = filteredTasks.length === 0;

  const containerClasses = `
    rounded-xl py-2 px-4 shadow ${isKeyTask ? "bg-gradient-to-br from-purple-600 to-purple-400 text-white" : "bg-white text-gray-800"} ${className}
  `;

  const countClasses = `
    w-6 h-6 ml-2 flex items-center justify-center rounded-full text-sm ${isKeyTask ? "bg-white text-purple-600" : "bg-purple-200 text-gray-800"}
  `;

  const gridClasses = `
    mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
  `;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2 className="text-xl font-semibold">{type === "key" ? "Key Tasks" : "Secondary Tasks"}</h2>
            <span className={countClasses}>{taskCount}</span>
        </div>
        <IconButton onClick={() => onClear(type as "key" | "secondary")} ariaLabel={`Clear ${type} Tasks`} text="Clear" className="btn-danger btn-sm" disabled={isEmpty} />
      </div>

      <hr className="mt-1" />

      <div className={`${isEmpty ? "" : gridClasses}`}>
        {!isEmpty ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))
        ) : (
          <p className={`text-center py-4 ${isKeyTask ? "text-white":"text-gray-500"} mx-auto`}>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskSection;