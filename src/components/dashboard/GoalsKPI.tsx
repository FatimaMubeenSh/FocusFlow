const GoalsKPI = () => {
  const goals = JSON.parse(localStorage.getItem("focusflow_goals") || "[]");

  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal: any) => goal.progress === 100).length;
  const inProgressGoals = totalGoals - completedGoals;
  const overdueGoals = goals.filter((goal: any) => {
    const dueDate = new Date(goal.dueDate);
    return dueDate < new Date() && goal.progress < 100;
  }).length;

  const progressPercent = totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Goals</h2>

      <div className="flex justify-around items-center mt-3">
        <div className="text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-700">{totalGoals}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-green-500">Completed</p>
          <p className="text-2xl font-bold text-green-500">{completedGoals}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-blue-500">In Progress</p>
          <p className="text-2xl font-bold text-blue-500">{inProgressGoals}</p>
        </div>
      </div>

      {overdueGoals > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-500 font-medium">Overdue Goals: {overdueGoals}</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Overall Progress</p>
        <p className="text-xl font-semibold text-indigo-600">{progressPercent}%</p>
      </div>
    </div>
  );
};

export default GoalsKPI;
