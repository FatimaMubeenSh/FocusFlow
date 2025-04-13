import { useState, useEffect, useRef } from "react";
import CircularTimer from "./CircularTimer";
import Controls from "./Controls";
import ProgressTracker from "./ProgressTracker";
import StreakStats from "./StreakStats";

const PomodoroTimer: React.FC = () => {
  const SESSION_DURATION_KEY = "focusflow_session_duration";
  const BREAK_DURATION_KEY = "focusflow_break_duration";
  const DEFAULT_SESSION_DURATION = 25; // in minutes
  const DEFAULT_BREAK_DURATION = 5; // in minutes
  const [sessionDuration, setSessionDuration] = useState(
    parseInt(localStorage.getItem(SESSION_DURATION_KEY) || "") || DEFAULT_SESSION_DURATION
  );
  const [breakDuration, setBreakDuration] = useState(
    parseInt(localStorage.getItem(BREAK_DURATION_KEY) || "") || DEFAULT_BREAK_DURATION
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(sessionDuration * 60);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    hasCompletedRef.current = false;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);

          // Only call handleComplete once per session
          if (!hasCompletedRef.current) {
            handleComplete();
            hasCompletedRef.current = true;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setTimeLeft(isSession ? sessionDuration * 60 : breakDuration * 60);
  }, [sessionDuration, breakDuration, isSession]);

  useEffect(() => {
    localStorage.setItem(SESSION_DURATION_KEY, sessionDuration.toString());
    localStorage.setItem(BREAK_DURATION_KEY, breakDuration.toString());
  }, [sessionDuration, breakDuration]);

  const handleStart = (type: "session" | "break") => {
    if (isRunning) return;
    setIsSession(type === "session");
    setIsRunning(true);
  };

  const handleComplete = () => {
    handleReset();
    if (isSession) {
      console.log("Session completed!");
      const today = new Date().toDateString();
      const stored = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
      console.log(stored);
      stored[today] = (stored[today] || 0) + 1;
      console.log("stored count is:", stored);
      localStorage.setItem("focusflow_sessions", JSON.stringify(stored));
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isSession ? sessionDuration * 60 : breakDuration * 60);
  };

  const canAdjustTime = !isRunning;

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-4/5 lg:w-3/5 mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 flex-col items-center">
            <CircularTimer timeLeft={timeLeft} totalTime={isSession ? sessionDuration * 60 : breakDuration * 60} onReset={handleReset} />
          </div>
          <div className="h-60 w-px bg-gray-300"></div>
          <div className="flex flex-1 flex-col gap-4 items-center">
            <Controls interval="session" intervalDuration={sessionDuration} onIntervalChange={setSessionDuration} canAdjustTime={canAdjustTime} onStart={handleStart} isRunning={isRunning} />

            <Controls interval="break" intervalDuration={breakDuration} onIntervalChange={setBreakDuration} canAdjustTime={canAdjustTime} onStart={handleStart} isRunning={isRunning} />
          </div>
        </div>
      </div>
      <ProgressTracker />
      <StreakStats />
    </div>
  );
};

export default PomodoroTimer;
