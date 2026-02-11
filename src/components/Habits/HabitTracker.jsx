import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const HabitTracker = () => {
  // ✅ Hook INSIDE component (VERY IMPORTANT)
  const { habits, setHabits } = useContext(AppContext);
  const [habitName, setHabitName] = useState("");

  const addHabit = () => {
    if (!habitName.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      streak: 0,
      lastUpdated: null,
    };

    setHabits([newHabit, ...habits]);
    setHabitName("");
  };

  const toggleHabit = (id) => {
    const today = new Date().toDateString();

    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        if (h.lastUpdated === today) return h;

        return {
          ...h,
          streak: h.streak + 1,
          lastUpdated: today,
        };
      })
    );
  };

  return (
    <div className="w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Daily Habit Tracker
      </h2>

      <div className="flex gap-2 mb-2">
        <input
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="flex-1 p-2 rounded bg-black/40 outline-none"
          placeholder="Enter habit"
        />
        <button
          onClick={addHabit}
          className="bg-purple-600 px-4 rounded"
        >
          Add
        </button>
      </div>

      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
        {habits.map((h) => (
          <div
            key={h.id}
            className="flex justify-between bg-black/40 p-3 rounded"
          >
            <div>
              <div className="font-semibold">{h.name}</div>
              <div className="text-sm opacity-70">
                🔥 Streak: {h.streak}
              </div>
            </div>

            <button
              onClick={() => toggleHabit(h.id)}
              className={`px-3 py-1 rounded ${
                h.lastUpdated === new Date().toDateString()
                  ? "bg-green-600"
                  : "bg-gray-600"
              }`}
            >
              {h.lastUpdated === new Date().toDateString()
                ? "Done"
                : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
