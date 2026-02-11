import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Reset = () => {
  const { resetAllData } = useContext(AppContext);

  return (
    <button
      onClick={resetAllData}
      className="bg-red-600 px-4 py-2 rounded mt-10"
    >
      Reset All Data
    </button>
  );
};

export default Reset;
