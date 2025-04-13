import TimerInput from "./TimerInput";

interface Props {
  sessionDuration: number;
  breakDuration: number;
  onSessionChange: (val: number) => void;
  onBreakChange: (val: number) => void;
  onStart: (type: "session" | "break") => void;
  isRunning: boolean;
  canAdjustTime: boolean;
}

const Controls: React.FC<Props> = ({ sessionDuration, breakDuration, onSessionChange, onBreakChange, onStart, isRunning, canAdjustTime }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center">
      <TimerInput interval="session" intervalDuration={sessionDuration} onIntervalChange={onSessionChange} canAdjustTime={canAdjustTime} onStart={onStart} isRunning={isRunning} />

      <TimerInput interval="break" intervalDuration={breakDuration} onIntervalChange={onBreakChange} canAdjustTime={canAdjustTime} onStart={onStart} isRunning={isRunning} />
    </div>
  );
};

export default Controls;
