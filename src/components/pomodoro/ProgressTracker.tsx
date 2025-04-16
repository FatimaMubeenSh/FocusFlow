import { StarIcon } from "lucide-react";
import { getBestStreak } from "../../utils/getBestStreak";
import { useEffect, useState } from "react";

interface ProgressTrackerProps {
  count: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ count }) => {
  const [date, setDate] = useState("");
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
      const { maxStreak, bestDate } = getBestStreak();
      setMaxStreak(maxStreak);
      setDate(bestDate);
  }, [count]);
  
  return (
    <div>
      <div className="card mt-4">
        <h2 className="card-header">Today's Progress</h2>
        <hr className="text-gray-200" />

        {count > 0 ? (
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 mt-4">
            {Array.from({ length: count }, (_, i) => (
              <StarIcon key={i} fill="#ffe600" strokeWidth={0} className="w-10 h-10 mx-auto" />
            ))}
          </div>
        ) : (
          <p className="text-default pt-4">No progress yet. Let's Do it!</p>
        )}
      </div>
      {maxStreak > 0 ? (
        <p className="text-default font-bold mt-3">
          Your Longest streak is <strong className="text-amber-400">{maxStreak}</strong> achieved on <em>{date}</em>.
        </p>
      ) : (
        <p className="text-default font-bold mt-2">No streaks recorded yet. Start focusing to build your streak!</p>
      )}
    </div>
  );
};

export default ProgressTracker;
