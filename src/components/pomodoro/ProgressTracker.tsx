import { StarIcon } from "lucide-react";

const ProgressTracker: React.FC = () => {
  const today = new Date().toDateString();
  const sessions = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  // const sessions = JSON.parse('{"Tue Apr 15 2025": 25, "Tue Oct 10 2023": 5}'); // Mock Data 
  const count = sessions[today] || 0;

  return (
    <div className="card mt-4">
      <h2 className="card-header">Today's Progress</h2>
      <hr className="text-gray-200" />
      
      {count > 0 ? (
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 mt-4">
          {Array.from({ length: count }, (_, i) => (
            <StarIcon key={i} fill="#ffe600" strokeWidth={0} className="w-10 h-10 mx-auto" />
          ))}
        </div>)  : (
        <p className="text-default pt-4">No progress yet. Let's Do it!</p>
        )}
    </div>
  );
};

export default ProgressTracker;
