// src/components/Signup.jsx
import { useState } from "react";
import Styles from "../css/auth.module.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {

    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            let response = await axios.post("http://localhost:3000/api/v1/shopping/auth/Signup",
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
            );

            setSuccess("Signup successful!");
            localStorage.setItem("Token", "TokenAvailable");
            setFormData({ email: "", password: "", confirmPassword: "" });


            Navigate("/itemPage");
        }
        catch (err) {
            if (err.response) {
                if(err.response){
                if(err.response.status === 401){
                    setError(err.response.data?.msg || "Signup failed");
                }
                else if(err.response.status === 500){
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
                <h2>Signup</h2>

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={Styles.authInput}
                />

                <button type="submit" className={Styles.authBtn}>
                    Sign Up
                </button>

                <p className={Styles.authLink}>I have Already Account. <Link to="/Login"><span>Login</span></Link></p>
            </form>
        </div>
    );
};

export default Signup;
