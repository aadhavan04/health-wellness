import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Workout from "./Workout";
import Home from "./Home";
import Nutrition from "./Nutrition";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/nutrition" element={<Nutrition />} />
    </Routes>
  );
}

export default App;