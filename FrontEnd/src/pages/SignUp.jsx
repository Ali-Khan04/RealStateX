import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      userName,
      email,
      password,
    };
    try {
      await fetch("http://localhost:3000/signup", {
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
          value={userName}
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
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-6 text-center text-gray-700">
        <p className="inline mr-2">Have an account?</p>
        <Link
          to="/sign-in"
          className="inline font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
