import MoodTracker from "./components/Mood/MoodTracker";
import HabitTracker from "./components/Habits/HabitTracker";
import InsightsDashboard from "./components/Insights/InsightsDashboard";
import Reset from "./components/Reset/Reset";

function App() {
  return (
    <div className="min-h-screen p-4 space-y-10">
      <div className="flex gap-6 flex-wrap">
        <MoodTracker />
        <HabitTracker />
      </div>
      <div className="flex flex-col items-center">
        <InsightsDashboard />
        <Reset />
      </div>
    </div>
  );
}

export default App;
