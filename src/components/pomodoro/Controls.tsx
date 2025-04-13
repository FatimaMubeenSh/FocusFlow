import { Plus, Minus, PlayIcon } from "lucide-react";

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
        <button onClick={() => onStart(interval as "session" | "break")} disabled={isRunning}>
          <PlayIcon fill="#3385e4" strokeWidth={0} className="w-8 h-8" />
        </button>
        <button disabled={!canAdjustTime} onClick={() => onIntervalChange(intervalDuration + 1)} className="px-2 py-1 bg-green-100 rounded disabled:opacity-50">
          <Plus />
        </button>
        <span>{intervalDuration} min</span>
        <button disabled={!canAdjustTime || intervalDuration <= 1} onClick={() => onIntervalChange(intervalDuration - 1)} className="px-2 py-1 bg-red-100 rounded disabled:opacity-50">
          <Minus />
        </button>
      </div>
    </div>
  );
};

export default Controls;
