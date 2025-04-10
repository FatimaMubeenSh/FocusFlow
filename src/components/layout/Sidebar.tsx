import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-25 bg-gray-800 text-white p-4">
      <nav className="flex flex-col gap-4 mt-12">
        <Link to="/">Home</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/goals">Goals</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
