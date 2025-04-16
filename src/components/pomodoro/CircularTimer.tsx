import { RotateCcwIcon } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import IconButton from "../ui/IconButton";

interface Props {
  timeLeft: number;
  totalTime: number;
  onReset: () => void;
  isTimerRunning: boolean;
}

const CircularTimer: React.FC<Props> = ({ timeLeft, totalTime, onReset, isTimerRunning }) => {
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-48 h-48">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            textColor: "#1f2937",
            pathColor: "#00C951",
            trailColor: "#979797",
          })}
        />
      </div>
      <IconButton onClick={onReset} icon={<RotateCcwIcon className="w-6 h-6 pl-1" />} ariaLabel="Reset" text="Reset" disabled={!isTimerRunning} />
    </div>
  );
};

export default CircularTimer;
