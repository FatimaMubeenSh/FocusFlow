import { StarIcon } from "lucide-react";

const ProgressTracker: React.FC = () => {
  const today = new Date().toDateString();
  const sessions = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  const count = sessions[today] || 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4 border border-gray-200">
      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <StarIcon key={i} fill="#fff12c" strokeWidth={0} className="w-10 h-10" />
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
