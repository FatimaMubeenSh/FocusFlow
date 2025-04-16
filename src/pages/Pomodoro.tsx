import PomodoroTimer from "../components/pomodoro/PomodoroTimer";
import StreakStats from "../components/pomodoro/StreakStats";
import ProgressTracker from './../components/pomodoro/ProgressTracker';

const Pomodoro = () => {
  return (
    <div className="p-4">
      <PomodoroTimer />
      <ProgressTracker />
      <StreakStats />
    </div>
  );
}

export default Pomodoro;
