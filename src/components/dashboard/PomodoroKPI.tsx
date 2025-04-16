import { getBestStreak } from "../../utils/getBestStreak";

const PomodoroKPI = () => {
  const pomodoroData = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  const today = new Date().toDateString();
  const todayPomodoros = pomodoroData[today] || 0;
  const { maxStreak, bestDate } = getBestStreak();

  return (
    <div className="card">
      <h2 className="card-header">Pomodoro</h2>
      <div className="text-center">
        <p className="text-secondary">Today's Pomodoros</p>
        <p className="card-metric text-gray-700 mb-3">{todayPomodoros}</p>
        <p className="text-secondary">Best Streak</p>
        <p className="card-metric text-amber-400">{maxStreak}</p>
        {maxStreak > 0 && <span className="text-sm"> on {bestDate}</span>}
      </div>
    </div>
  );
};

export default PomodoroKPI;
