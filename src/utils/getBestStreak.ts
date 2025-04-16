export const getBestStreak = () => {
  const stored = JSON.parse(localStorage.getItem("focusflow_sessions") || "{}");
  let maxStreak = 0;
  let bestDate = "";

  for (const d in stored) {
    if (stored[d] > maxStreak) {
      maxStreak = stored[d];
      bestDate = d;
    }
  }

  return { maxStreak, bestDate };
};
