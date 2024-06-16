import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [alert, setAlert] = useState(null);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  let navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://book-my-show-backend-virid.vercel.app/api/users/login",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      showAlert("Logged in Successfully", "success");
      navigate("/home");
    } else {
      showAlert(json.error, "danger");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjB0aWNrZXRzfGVufDB8fDB8fHww")' }}>
      <h2 className="text-center text-3xl font-semibold  mb-7" style={{color:"red"}}>BookMyShow</h2>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 w-full max-w-md border border-white border-opacity-20">
        <form onSubmit={handleSignIn}>
          <h2 className="text-3xl font-semibold text-white mb-6">Signin</h2>
          <div className="relative mb-6">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-white peer"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-full peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:-translate-y-full"
            >
              Enter your email
            </label>
          </div>
          <div className="relative mb-6">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-white peer"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-full peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:-translate-y-full"
            >
              Enter your password
            </label>
          </div>
         
          <button type="submit" className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-opacity-80 transition">Signin</button>
          <div className="text-center mt-6 text-white">
            <p>Don't have an account? <Link to="/signup" className="hover:underline">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
