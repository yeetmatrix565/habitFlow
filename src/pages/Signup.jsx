import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
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
      <div className="w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white flex flex-col justify-center items-center p-10">

        <h1 className="text-5xl font-bold mb-4">
          HabitFlow 🚀
        </h1>

        <p className="text-lg text-center max-w-md mb-8">
          Build habits that actually stick,
          stay productive, and track your journey.
        </p>

        {/* Mock App Preview */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 w-80 shadow-xl">
          <div className="bg-white text-black rounded-xl p-4 mb-4">
            <h3 className="font-bold mb-2">
              Today's Goals
            </h3>
            <p>✅ Coding Practice</p>
            <p>✅ Reading</p>
            <p>⏳ Meditation</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white text-black rounded-xl p-3 text-center font-semibold">
              🔥 7 Day Streak
            </div>

            <div className="bg-white text-black rounded-xl p-3 text-center font-semibold">
              📅 Monthly Goals
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-96 bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            Signup
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="bg-red-500 text-white p-3 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;