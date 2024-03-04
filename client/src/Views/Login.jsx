import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavComponent from "../Components/NavComponent";

import axios from "axios";

// Functional component for the login page
const Login = () => {
    // State variables for managing user login information and errors
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    // Event handler for updating the state when input fields change
    const handlerChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userLogin);

        // Send a POST request to the server for user login
        axios
        .post("http://localhost:8000/api/loginUser", userLogin, {
            withCredentials: true
        })
        .then((res) => {
            console.log("loginUser-res:", res.data);

            // Store user ID in local storage and navigate to the dashboard
            window.localStorage.setItem('userId', res.data._id);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log("loginErr:", err);

            // Handle login errors and update the state
            setError(err.response.data);
        });
    };

    // JSX structure for the login page
    return (
        <div>
            {/* Render navigation component for non-logged-in users */}
            <NavComponent home={true} />
            <div className="container w-50 mx-auto">
                <h1 className="text-center text-primary-emphasis">Login</h1>
                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address:</Form.Label>
                        {/* Email input field */}
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handlerChange}
                            value={userLogin.email}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        {/* Password input field */}
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handlerChange}
                            value={userLogin.password}
                        />
                    </Form.Group>
                    {/* Submit button */}
                    <Button className="mb-3" variant="primary" type="submit">
                        Login
                    </Button>
                    {/* Display login error message, if any */}
                    {error.message && <p className="text-danger">{error.message}</p>}
                </form>
                {/* Link to the registration page */}
                <Link to="/register">
                    Don't have an Account. Register here
                </Link>
            </div>
        </div>
    );
};

export default Login;
