import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      setError("");

      alert("Registered Successfully");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">

      <h1 className="app-title">HEALTH & WELLNESS</h1>
      <h2>REGISTER</h2>

      <div className="form">

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

      </div>

      <br />

      <button onClick={handleRegister}>Register</button>

     
      {error && <p className="error-text">{error}</p>}

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  );
}

export default Register;