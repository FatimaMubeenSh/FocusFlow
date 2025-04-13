import { useEffect, useState } from "react";

const StreakStats: React.FC = () => {
  const [maxStreak, setMaxStreak] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
    let max = 0;
    let bestDay = "";
    for (const d in stored) {
      if (stored[d] > max) {
        max = stored[d];
        bestDay = d;
      }
    }
    setMaxStreak(max);
    setDate(bestDay);
  }, []);

  return (
    <p className="text-sm text-gray-600 mt-2">
      Longest streak: <strong>{maxStreak}</strong> on <em>{date}</em>
    </p>
  );
};

export default StreakStats;
