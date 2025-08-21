import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Components/Auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(true);
        navigate("/");
      } else {
        setSuccessMessage(false);
        console.error("Login failed:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
      setSuccessMessage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-gray-800">
        Sign In
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="email"
          required
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleFormData}
          disabled={loading}
        />
        <div className="relative">
          <input
            className="border border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            onClick={handleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {successMessage !== null && (
          <p
            className={`text-center mt-4 font-medium ${
              successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage ? "Login successful!" : "Wrong Email or Password!"}
          </p>
        )}
        <Auth />
      </form>
      <div className="mt-6 text-center text-gray-700">
        <p className="inline mr-2">No account?</p>
        <Link
          to="/signup"
          className="inline font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
