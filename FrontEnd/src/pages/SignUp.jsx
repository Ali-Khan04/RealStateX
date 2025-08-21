import React from "react";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Components/Auth";
const initialState = {
  username: "",
  email: "",
  password: "",
  showPassword: false,
  successMessage: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "showPassword":
      return { ...state, showPassword: !state.showPassword };
    case "successMessage":
      return { ...state, successMessage: true };
    case "errorMessage":
      return { ...state, successMessage: false };
    case "reset":
      return initialState;
    default:
      return state;
  }
};
export default function SignUp() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInput = (e) => {
    dispatch({ type: e.target.id, payload: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = state;
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        dispatch({ type: "successMessage" });
        setTimeout(() => {
          navigate("/signin");
          dispatch({ type: "reset" });
        }, 2000);
      } else {
        dispatch({ type: "errorMessage" });
      }
    } catch (err) {
      console.error(err);
    }
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
          value={state.username}
          onChange={handleInput}
          id="username"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="email"
          required
          placeholder="Email"
          value={state.email}
          onChange={handleInput}
          id="email"
        />
        <div className="relative">
          <input
            className="border border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
            type={state.showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={state.password}
            onChange={handleInput}
            id="password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => dispatch({ type: "showPassword" })}
          >
            {state.showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        {state.successMessage !== null && (
          <p
            className={`text-center mt-4 font-medium ${
              state.successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.successMessage
              ? "Account Created Successfully"
              : "Error Creating Your Account"}
          </p>
        )}
        <Auth />
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
