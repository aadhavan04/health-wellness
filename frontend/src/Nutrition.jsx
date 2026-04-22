import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Nutrition() {
  const navigate = useNavigate();

  const [goalType, setGoalType] = useState("");
  const [weight, setWeight] = useState("");
  const [goalCalories, setGoalCalories] = useState(0);

  const [intake, setIntake] = useState("");

  const [history, setHistory] = useState({
    "weight loss": [],
    "muscle gain": [],
    "maintenance": []
  });

  // calculate calories
  const calculateCalories = (type, wt) => {
    const w = Number(wt);
    if (!w) return;

    if (type === "muscle gain") setGoalCalories(w * 32);
    else if (type === "weight loss") setGoalCalories(w * 25);
    else setGoalCalories(w * 28);
  };

  const handleGoalChange = (type) => {
    setGoalType(type);
    calculateCalories(type, weight);
  };

  const handleWeight = (val) => {
    setWeight(val);
    calculateCalories(goalType, val);
  };

  const handleAdd = () => {
    if (!intake || !goalType) return;

    const val = Number(intake);

    setHistory({
      ...history,
      [goalType]: [...history[goalType], val]
    });

    setIntake("");
  };

  const currentHistory = history[goalType] || [];

  const total = currentHistory.reduce((sum, v) => sum + v, 0);

  const progress = goalCalories
    ? Math.min((total / goalCalories) * 100, 100)
    : 0;

  return (
    <div className="container">

     <button className="back-btn" onClick={() => navigate("/home")}>
  ⬅ Home
</button>

      <h1>Nutrition Planner</h1>

     <div className="goal-buttons">
  <button onClick={() => handleGoalChange("weight loss")}>
    Weight Loss
  </button>

  <button onClick={() => handleGoalChange("muscle gain")}>
    Muscle Gain
  </button>

  <button onClick={() => handleGoalChange("maintenance")}>
    Maintenance
  </button>
</div>

      <h3>Enter Weight (kg)</h3>

      <input
        placeholder="Weight"
        value={weight}
        onChange={(e) => handleWeight(e.target.value)}/>

      <p>Goal: {goalType}</p>
      <p>Calories Target: {goalCalories}</p>

      <h2>Your Intake</h2>

      <input
        placeholder="Calories"
        value={intake}
        onChange={(e) => setIntake(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <h2>Progress</h2>

      <p>Total Intake: {total}</p>

      <div style={{ width: "100%", background: "#ddd", height: "20px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "orange",
            height: "100%"
          }}
        ></div>
      </div>

      <p>{progress.toFixed(0)}%</p>
    </div>
  );
}

export default Nutrition;