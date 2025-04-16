
const TasksKPI = () => {
  const tasks = JSON.parse(localStorage.getItem("focusflow_tasks") || "[]");

  const keyTasks = tasks.filter((task: any) => task.type === "key").length;
  const secondaryTasks = tasks.filter((task: any) => task.type === "secondary").length;

  return (
    <div className="card">
      <h2 className="card-header">Tasks</h2>
      <div className="text-center">
        <p className="text-gray-500 text-sm">Total Tasks</p>
        <p className="card-metric text-gray-700 mb-3">{tasks.length}</p>
      </div>
      <div className="flex justify-around items-center mt-3">
        <div className="text-center">
          <p className="text-sm text-gray-500">Key Tasks</p>
          <p className="card-metric text-purple-600">{keyTasks}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Secondary Tasks</p>
          <p className="card-metric text-yellow-500">{secondaryTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default TasksKPI;
