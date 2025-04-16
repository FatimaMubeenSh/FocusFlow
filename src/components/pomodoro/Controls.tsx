import { Plus, Minus, PlayIcon } from "lucide-react";
import IconButton from "../ui/IconButton";

interface Props {
  interval: string;
  intervalDuration: number;
  onIntervalChange: (val: number) => void;
  canAdjustTime: boolean;
  onStart: (type: "session" | "break") => void;
  isRunning: boolean;
}

const Controls: React.FC<Props> = ({ intervalDuration, onIntervalChange, canAdjustTime, onStart, isRunning, interval }) => {
  return (
    <div>
      <h2 className={`text-lg font-semibold capitalize text-center mx-auto mb-2 ${interval == "break" ? "mt-4" : ""}`}>{interval} Duration</h2>
      <div className="flex items-center gap-4">
        <IconButton onClick={() => onStart(interval as "session" | "break")} icon={<PlayIcon className="w-6 h-6" />} ariaLabel="Start" disabled={isRunning} className="" />
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl p-1">
          <IconButton onClick={() => onIntervalChange(intervalDuration + 1)} icon={<Plus />} ariaLabel="Increment" disabled={!canAdjustTime} className="btn-success" />

          <span>{intervalDuration} min</span>
          <IconButton onClick={() => onIntervalChange(intervalDuration - 1)} icon={<Minus />} ariaLabel="Increment" disabled={!canAdjustTime || intervalDuration <= 1} className="btn-danger" />
        </div>
      </div>
    </div>
  );
};

export default Controls;
