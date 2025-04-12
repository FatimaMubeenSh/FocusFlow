import TaskCard from "./TaskCard";
import { Task } from "../../types/Task";

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

  const containerClasses = `
    rounded-xl py-2 px-4 shadow ${isKeyTask ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white" : "bg-white text-gray-800"} ${className}
  `;

  const countClasses = `
    px-2 py-0.5 rounded-full ml-2 ${isKeyTask ? "bg-white text-blue-600" : "bg-gray-200 text-gray-800"}
  `;

  const gridClasses = `
    mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]
  `;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2 className="text-xl font-semibold">{type === "key" ? "Key Tasks" : "Secondary Tasks"}</h2>
          <span className={countClasses}>{taskCount}</span>
        </div>
        <button className="bg-red-500 px-3 py-1 rounded text-sm text-white" onClick={() => onClear(type as "key" | "secondary")}>
          Clear
        </button>
      </div>

      <hr className="mt-2" />

      <div className={gridClasses}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;