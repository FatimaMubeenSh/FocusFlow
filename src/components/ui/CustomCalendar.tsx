import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import IconButton from './IconButton';

const CustomCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative cursor-pointer" tabIndex={0}>
      <IconButton onClick={() => setShowCalendar(!showCalendar)} ariaLabel="Calendar" className="btn-icon" icon={<CalendarDays className="w-6 h-6" />} />

      {showCalendar && (
        <div className="absolute mt-2 right-0 bg-white shadow-md rounded-xl p-4 border border-purple-500" onMouseLeave={() => setShowCalendar(false)}>
          <Calendar selectRange={false} showDoubleView={true} next2Label={null} prev2Label={null} className="text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
