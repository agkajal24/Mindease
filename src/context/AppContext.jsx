import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [moods, setMoods] = useState(() => {
    return JSON.parse(localStorage.getItem("moods")) || [];
  });

  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // ✅ DEFINE RESET HERE
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
