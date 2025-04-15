import CustomCalendar from "../CustomCalendar";
import logo from "../../assets/logo.png";

const Header = () => {

  // Get current date info
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);

  // Calculate week number
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  const weekNumber = getWeekNumber(now);

  return (
    <header className="bg-white shadow p-4 sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="FocusFlow Logo" className="h-9" />
        <h1 className="text-2xl font-bold">
          <span>Focus</span>
          <span className="text-purple-500">Flow</span>
        </h1>
      </div>

      <div className="text-center text-gray-700">
        <div className="text-sm font-medium">{formattedDate}</div>
        <div className="text-xs text-purple-600">Week {weekNumber} of the year</div>
      </div>

      <CustomCalendar />
    </header>
  );
};

export default Header;
