
import { useState } from "react";
import Styles from "../css/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Email and Password are required");
      return;
    }

    try {
      let response = await axios.post("http://localhost:3000/api/v1/shopping/auth/Login",
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )

      setSuccess("Login successful!");
      localStorage.setItem("Token", "TokenAvailable");
      setFormData({ email: "", password: "" });

      Navigate("/itemPage");

    }
    catch (err) {
      if (err.response) {
        if (err.response) {
          if (err.response.status === 401) {
            setError(err.response.data?.msg || "Login failed");
          }
          else if (err.response.status === 500) {
            console.log(`Error: ${err.response.data.error}`)
          }
        }
      }
      else {
        console.log(`Error: ${err.response.data.error}`)
      }
    }
  };

  return (
    <div className={Styles.authContainer}>
      <form onSubmit={handleSubmit} className={Styles.authForm}>
        <h2>Login</h2>

        {error && <p className={Styles.authError}>{error}</p>}
        {success && <p className={Styles.authSuccess}>{success}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={Styles.authInput}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={Styles.authInput}
        />

        <button type="submit" className={Styles.authBtn}>
          Login
        </button>

        <p className={Styles.authLink}>I don't have a Account. <Link to="/Signup"><span>Signup</span></Link></p>
      </form>
    </div>
  );
};

export default Login;
