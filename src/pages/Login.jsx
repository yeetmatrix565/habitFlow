import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert(
          "Invalid email/password. Try Google login if you signed up with Google."
        );
      } else {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center p-10">

        <h1 className="text-5xl font-bold mb-4">
          Welcome Back 👋
        </h1>

        <p className="text-lg text-center max-w-md mb-8">
          Track habits, stay consistent,
          and become your best self.
        </p>

        {/* Mock App Preview */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 w-80 shadow-xl">
          <div className="bg-white text-black rounded-xl p-4 mb-4">
            <h3 className="font-bold mb-2">
              Today's Progress
            </h3>
            <p>✅ Workout</p>
            <p>✅ Read 10 Pages</p>
            <p>⏳ Drink Water</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white text-black rounded-xl p-3 text-center font-semibold">
              🔥 12 Day Streak
            </div>

            <div className="bg-white text-black rounded-xl p-3 text-center font-semibold">
              📅 85% Completion
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-96 bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm">
            New user?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-semibold"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;