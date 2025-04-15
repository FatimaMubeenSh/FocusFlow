import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

const CustomCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setShowCalendar(!showCalendar)}>
        <CalendarDays className="w-6 h-6 text-purple-600" />
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-2 right-0 bg-white shadow-md rounded-lg p-4">
          <Calendar selectRange={false} showDoubleView={true} next2Label={null} prev2Label={null} />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
