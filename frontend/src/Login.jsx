import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      
      setError("");

     
      localStorage.setItem("user", JSON.stringify(res.data.user));

      
      navigate("/home");

    } catch (err) {
      setError("Email or Password Incorrect");
    }
  };

  return (
    <div className="container">

      
      <h1 className="app-title">HEALTH & WELLNESS</h1>

     
      <h2>LOGIN</h2>

     
      <div className="form">

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

      
      <button onClick={handleLogin}>Login</button>

     
      {error && <p className="error-text">{error}</p>}

      
      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>

    </div>
  );
}
export default Login;