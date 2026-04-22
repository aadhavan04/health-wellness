import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [user, setUser] = useState({
    name: currentUser?.name || "User",
    goal: "",
    preference: ""
  });

  const [workouts, setWorkouts] = useState([]);

 
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  
  const fetchWorkouts = async () => {
    if (!currentUser) return;

    const res = await axios.get(
      `http://localhost:5000/api/workout/${currentUser.email}`
    );
    setWorkouts(res.data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) setShowHistory(true);
    if (endX - startX > 50) setShowHistory(false);
  };

  const handleMouseDown = (e) => {
    startX = e.clientX;
  };

  const handleMouseUp = (e) => {
    let endX = e.clientX;

    if (startX - endX > 50) setShowHistory(true);
    if (endX - startX > 50) setShowHistory(false);
  };

  return (
    <>
      
  {!showHistory && (
     <div className="profile-section">
   <div
     className="profile-icon"
     onClick={() => setShowProfile(!showProfile)}
          >
            Your Profile
          </div>

          {showProfile && (
            <div className="profile-info">
              <p>{user.name}</p>
              <p>{currentUser?.email}</p>

              
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.clear(); // 🔥 clear all
                  navigate("/login");
                }}
              > Logout</button>
            </div>
          )}
        </div>
      )}

      
      <div
        className="container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>

        <div className="home-content">
          <h1 className="dashboard-title">HEALTH & WELLNESS</h1>

          <p className="swipe-hint">
            Swipe / Drag left to view history
          </p>

          
          <div className="preferences-box">
            <h2>Preferences</h2>

            <input
              placeholder="Goal"
              onChange={(e) =>
                setUser({ ...user, goal: e.target.value })}/>

            <input
              placeholder="Preference"
              onChange={(e) =>
                setUser({ ...user, preference: e.target.value })}/>

            <p>Goal: {user.goal}</p>
            <p>Preference: {user.preference}</p>
          </div>
        </div>

        
        <div className="bottom-buttons">
          <button onClick={() => navigate("/workout")}>
            Workout
          </button>

          <button onClick={() => navigate("/nutrition")}>
            Nutrition
          </button>

          <button onClick={() => setShowHistory(true)}>
            History
          </button>
        </div>

        
        <div className={`history-panel ${showHistory ? "show" : ""}`}>
          <button onClick={() => setShowHistory(false)}>
            Close
          </button>

          <h2>Workout History</h2>

          {workouts.map((w, i) => (
            <div key={i} className="card">
              <p>
                {w.type} - {w.duration} - {w.calories}
              </p>
            </div>
          ))}

          <h3>Total Workouts: {workouts.length}</h3>
        </div>
      </div>
    </>
  );
}

export default Home; 