const PomodoroKPI = () => {
  const pomodoroData = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  const today = new Date().toDateString();
  const todayPomodoros = pomodoroData[today] || 0;

  const focusTime = todayPomodoros * 25;
  const hours = Math.floor(focusTime / 60);
  const minutes = focusTime % 60;

  return (
    <div className="card">
      <h2 className="card-header">Pomodoro</h2>
      <div className="text-center">
        <p className="text-secondary">Today's Pomodoros</p>
        <p className="card-metric text-red-500 mb-3">{todayPomodoros}</p>
        <p className="text-secondary">Total Focus Time</p>
        <p className="text-xl font-bold text-emerald-600">
          {hours > 0 ? `${hours}h ` : ""}
          {minutes}m
        </p>
      </div>
    </div>
  );
};

export default PomodoroKPI;
