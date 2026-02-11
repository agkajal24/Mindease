import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const moodsList = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

const MoodTracker = () => {
  // ✅ CONTEXT STATE
  const { moods, setMoods } = useContext(AppContext);

  // ✅ LOCAL UI STATE
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState("");

  const saveMood = () => {
    if (!selectedMood) {
      alert("Please select a mood");
      return;
    }

    const newEntry = {
      mood: selectedMood,
      intensity,
      note,
      date: new Date().toLocaleString(),
    };

    // ❗ entries ❌  → moods ✅
    setMoods([newEntry, ...moods]);

    setSelectedMood(null);
    setIntensity(3);
    setNote("");
  };

  return (
    <div className="w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        How are you feeling today?
      </h2>

      {/* Mood buttons */}
      <div className="flex justify-around text-3xl mb-2">
        {moodsList.map((m) => (
          <button
            key={m.label}
            onClick={() => setSelectedMood(m.label)}
            className={`p-2 rounded-full ${
              selectedMood === m.label
                ? "bg-purple-600"
                : "hover:bg-white/20"
            }`}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {/* Intensity */}
      <div className="mb-2">
        <label>
          Intensity: <strong>{intensity}</strong>
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Note */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write something..."
        className="w-full p-2 rounded bg-black/40 resize-none mb-2 outline-none"
      />

      <button
        onClick={saveMood}
        className="w-full bg-purple-600 py-2 rounded font-semibold"
      >
        Save Mood
      </button>

      {/* ✅ USE moods NOT entries */}
      {moods.length > 0 && (
        <div className="mt-4 space-y-2 max-h-30 overflow-y-auto">
          {moods.map((e, i) => (
            <div key={i} className="bg-black/40 p-2 rounded text-sm">
              <strong>{e.mood}</strong> | Intensity {e.intensity}
              <div className="opacity-70">{e.date}</div>
              {e.note && <div>📝 {e.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
