import { Link } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home.svg';
import TimerIcon from '../../assets/icons/timer.svg';
import TasksIcon from '../../assets/icons/tasks.svg';
import GoalsIcon from '../../assets/icons/goal.svg';

const Sidebar = () => {
  return (
    <div className="shrink-0 w-18 md:w-18 lg:w-16 bg-gray-800 text-white p-4">
      <nav className="flex flex-col items-center gap-10 mt-16">
        <Link to="/">
          <img src={HomeIcon} alt="Home" className="w-20 md:w-10" />
        </Link>
        <Link to="/pomodoro">
          <img src={TimerIcon} alt="Pomodoro" className="w-20 md:w-10" />
        </Link>
        <Link to="/tasks">
          <img src={TasksIcon} alt="Tasks" className="w-20 md:w-10" />
        </Link>
        <Link to="/goals">
          <img src={GoalsIcon} alt="Goals" className="w-20 md:w-10" />
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
