import React, { useEffect, useState } from "react";
import GoalForm from "./GoalInput";
import GoalAccordion from "./GoalAccordion";
import { Goal } from "../../types/Goal";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "focusflow_goals";

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isGoalDatainitialized, setIsGoalDataInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setGoals(JSON.parse(stored));
    setIsGoalDataInitialized(true);
  }, []);

  useEffect(() => {
    if (!isGoalDatainitialized) return; // Prevents saving before data is initialized
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals));
  }, [goals, isGoalDatainitialized]);

  const handleAdd = ({ title, dueDate }: { title: string; dueDate: string }) => {
    const newGoal: Goal = {
      id: uuidv4(),
      title,
      dueDate,
      description: "",
      progress: 0,
    };
    setGoals([newGoal, ...goals]);
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleUpdate = (updatedGoal: Goal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
  };

  const handleProgressChange = (id: string, progress: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, progress } : g)));
  };

  return (
    <div>
      <GoalForm onAdd={handleAdd} />
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Current Goals</h2>
      {goals.map((goal) => (
        <GoalAccordion key={goal.id} goal={goal} isExpanded={expandedId === goal.id} onToggle={() => setExpandedId(expandedId === goal.id ? null : goal.id)} onDelete={() => handleDelete(goal.id)} onUpdate={handleUpdate} onProgressChange={handleProgressChange} />
      ))}
    </div>
  );
};

export default GoalsList;
