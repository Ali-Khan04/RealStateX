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
  passwordError: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      const password = action.payload;
      let passwordError = "";
      if (password.length > 0 && password.length < 6) {
        passwordError = "Password must be at least 6 characters long";
      }

      return {
        ...state,
        password: password,
        passwordError: passwordError,
      };
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
  const isFormValid = () => {
    const { username, email, password } = state;
    return (
      username.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length >= 6 &&
      state.passwordError === ""
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      dispatch({ type: "errorMessage" });
      return;
    }
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
      dispatch({ type: "errorMessage" });
    }
  };
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-gray-800">
        SignUp
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className={`border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
            state.usernameError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          type="text"
          required
          placeholder="Username (3-30 characters)"
          value={state.username}
          onChange={handleInput}
          id="username"
          minLength="3"
          maxLength="30"
        />
        {state.usernameError && (
          <p className="text-red-600 text-sm -mt-3">{state.usernameError}</p>
        )}
        {state.username.length > 0 && (
          <div className="flex justify-between items-center -mt-3">
            <span
              className={`text-xs ${
                state.username.length >= 3 && state.username.length <= 30
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {state.username.length >= 3 && state.username.length <= 30
                ? "✓ Valid length"
                : "Invalid length"}
            </span>
            <span
              className={`text-xs ${
                state.username.length > 25 ? "text-orange-600" : "text-gray-500"
              }`}
            >
              {state.username.length}/30
            </span>
          </div>
        )}
        <input
          className={`border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
            state.emailError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          type="email"
          required
          placeholder="Email (example@domain.com)"
          value={state.email}
          onChange={handleInput}
          id="email"
        />
        {state.emailError && (
          <p className="text-red-600 text-sm -mt-3">{state.emailError}</p>
        )}
        {state.email.length > 0 && !state.emailError && (
          <p className="text-green-600 text-sm -mt-3">✓ Valid email format</p>
        )}
        <div className="relative">
          <input
            className={`border p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 transition w-full ${
              state.passwordError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            type={state.showPassword ? "text" : "password"}
            required
            placeholder="Password (minimum 6 characters)"
            value={state.password}
            onChange={handleInput}
            id="password"
            minLength="6"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => dispatch({ type: "showPassword" })}
          >
            {state.showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {state.passwordError && (
          <p className="text-red-600 text-sm -mt-3">{state.passwordError}</p>
        )}
        {state.password.length > 0 && (
          <div className="flex items-center gap-2 -mt-3">
            <div className="flex gap-1">
              <div
                className={`h-1 w-6 rounded ${
                  state.password.length >= 6 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div
                className={`h-1 w-6 rounded ${
                  state.password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-1 w-6 rounded ${
                  state.password.length >= 10 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">
              {state.password.length >= 10
                ? "Strong"
                : state.password.length >= 8
                ? "Good"
                : state.password.length >= 6
                ? "Fair"
                : "Weak"}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`font-semibold py-3 rounded-lg transition ${
            isFormValid()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
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
