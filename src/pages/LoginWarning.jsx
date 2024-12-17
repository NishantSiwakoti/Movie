import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebaseConfig";

const LoginWarning = () => {
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      navigate("/"); // Redirect to the home page after login
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">
        Please log in to watch movies or TV series.
      </p>
      <button
        onClick={handleAuth}
        className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transform transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default LoginWarning;
