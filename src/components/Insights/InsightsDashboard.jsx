import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const InsightsDashboard = () => {
  const { moods, habits } = useContext(AppContext);

  // Most common mood
  const moodCount = {};
  moods.forEach((m) => {
    moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
  });

  const mostCommonMood =
    Object.keys(moodCount).length > 0
      ? Object.keys(moodCount).reduce((a, b) =>
          moodCount[a] > moodCount[b] ? a : b
        )
      : "N/A";

  // Longest streak
  const longestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => h.streak))
      : 0;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Insights Summary 🧠
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <div className="text-4xl mb-2">😊</div>
          <p className="opacity-70">Most Common Mood</p>
          <p className="text-xl font-semibold">{mostCommonMood}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <div className="text-4xl mb-2">🔥</div>
          <p className="opacity-70">Longest Habit Streak</p>
          <p className="text-xl font-semibold">{longestStreak} days</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="opacity-70">Total Mood Entries</p>
          <p className="text-xl font-semibold">{moods.length}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsDashboard;
