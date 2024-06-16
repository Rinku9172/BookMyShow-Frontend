import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [alert, setAlert] = useState(null);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  let navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signUpUsername,
            email: signUpEmail,
            password: signUpPassword,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/home");
        showAlert("Account Created Successfully", "success");
      } else {
        let errorMessage = "Invalid Credentials";
        if (json.errors && json.errors.length > 0) {
          errorMessage = json.errors.map((error) => error.msg).join(", ");
        }
        showAlert(errorMessage, "danger");
      }
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "danger");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjB0aWNrZXRzfGVufDB8fDB8fHww")' }}>
      <h2 className="text-center text-3xl font-semibold  mb-7" style={{color:"red"}}>BookMyShow</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 w-full max-w-md border border-white border-opacity-20">
        <form onSubmit={handleSignUp}>
          <h2 className="text-3xl font-semibold text-white mb-6">Signup</h2>
          <div className="relative mb-6">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-white peer"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-full peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:-translate-y-full"
            >
              Enter your name
            </label>
          </div>
          <div className="relative mb-6">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
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
              autoComplete="new-password"
              required
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-white peer"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-focus:-translate-y-full peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:-translate-y-full"
            >
              Enter your password
            </label>
          </div>
          <button type="submit" className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-opacity-80 transition">Signup</button>
          <div className="text-center mt-6 text-white">
            <p>Already have an account? <Link to="/" className="hover:underline">Signin</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
