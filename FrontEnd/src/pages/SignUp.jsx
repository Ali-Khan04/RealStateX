import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      username,
      email,
      password,
    };
    try {
      await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userDetails),
      });
    } catch (err) {
      console.err(err);
    }
    setUserName("");
    setEmail("");
    setPassword("");
    setSuccessMessage(true);
  };
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-gray-800">
        SignUp
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          required
          placeholder="UserName"
          value={username}
          onChange={handleUserName}
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <div className="relative">
          <input
            className="border border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={handlePassword}
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
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        {successMessage !== null && (
          <p
            className={`text-center mt-4 font-medium ${
              successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage
              ? "Account Created Successfully,Now Sign In!"
              : "Error Creating Your Account"}
          </p>
        )}
      </form>
      <div className="mt-6 text-center text-gray-700">
        <p className="inline mr-2">Have an account?</p>
        <Link
          to="/signin"
          className="inline font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
