import QuoteCard from "./../components/dashboard/QuoteCard";
import GoalsKPI from "../components/dashboard/GoalsKPI";
import PomodoroKPI from "../components/dashboard/PomodoroKPI";
import TasksKPI from "../components/dashboard/TasksKPI";

const home = () => {
  return (
    <div>
      <QuoteCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <GoalsKPI />
        <PomodoroKPI />
        <TasksKPI />
      </div>
    </div>
  );
};

export default home;
