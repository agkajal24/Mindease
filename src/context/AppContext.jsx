import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // ✅ SAFE moods
  const [moods, setMoods] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("moods"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });

  // ✅ SAFE habits
  const [habits, setHabits] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("habits"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const resetAllData = () => {
    setMoods([]);
    setHabits([]);
    localStorage.removeItem("moods");
    localStorage.removeItem("habits");
  };

  return (
    <AppContext.Provider
      value={{ moods, setMoods, habits, setHabits, resetAllData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;