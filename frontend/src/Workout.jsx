import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Workout() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    userId: currentUser.email,
    type: "",
    duration: "",
    calories: ""
  });

  const [workouts, setWorkouts] = useState([]);

  const [goal, setGoal] = useState(500);

 
  const fetchWorkouts = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/workout/${currentUser.email}`
    );
    setWorkouts(res.data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  
  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/workout/add", data);
    alert("Workout Added");
    fetchWorkouts();
  };


  const totalCalories = workouts.reduce(
    (sum, w) => sum + Number(w.calories),
    0
  );

  const progress = Math.min((totalCalories / goal) * 100, 100);

  return (
    <div className="container">

      < button className="back-btn" onClick={() => navigate("/home")}>
  ⬅ Home
</button>

      <h2>Your Workout</h2>

      <input
        placeholder="Type"
        onChange={(e) => setData({ ...data, type: e.target.value })}
      />

      <input
        placeholder="Duration"
        onChange={(e) => setData({ ...data, duration: e.target.value })}
      />

      <input
        placeholder="Calories"
        onChange={(e) => setData({ ...data, calories: e.target.value })}
      />

      <br />

      <button onClick={handleAdd}>Add Workout</button>

      <h2>Workout List</h2>

      {workouts.map((w, i) => (
        <div key={i} className="card">
          <p>Type: {w.type}</p>
          <p>Duration: {w.duration}</p>
          <p>Calories: {w.calories}</p>
        </div>
      ))}

      <h2>Progress</h2>

      <input
        placeholder="Set Goal Calories"
        onChange={(e) => setGoal(e.target.value)}
      />

      <p>Total Calories: {totalCalories}</p>
      <p>Goal: {goal}</p>

      <div style={{ width: "100%", background: "#ddd", height: "20px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "green",
            height: "100%"
          }}
        ></div>
      </div>

      <p>{progress.toFixed(0)}%</p>
    </div>
  );
}

export default Workout;