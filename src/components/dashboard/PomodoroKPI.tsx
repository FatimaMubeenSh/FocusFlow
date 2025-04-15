const PomodoroKPI = () => {
  const pomodoroData = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  const today = new Date().toDateString();
  const todayPomodoros = pomodoroData[today] || 0;

  const focusTime = todayPomodoros * 25;
  const hours = Math.floor(focusTime / 60);
  const minutes = focusTime % 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Pomodoro</h2>
      <div className="text-center">
        <p className="text-gray-500 text-sm">Today's Pomodoros</p>
        <p className="text-3xl font-bold text-red-500 mb-3">{todayPomodoros}</p>
        <p className="text-gray-500 text-sm">Total Focus Time</p>
        <p className="text-xl font-bold text-emerald-600">
          {hours > 0 ? `${hours}h ` : ""}
          {minutes}m
        </p>
      </div>
    </div>
  );
};

export default PomodoroKPI;
