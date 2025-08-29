import { createContext, useReducer } from "react";

export const AuthContext = createContext();

function getStoredUser() {
  try {
    const item = localStorage.getItem("user");
    if (!item || item === "undefined") {
      localStorage.removeItem("user");
      return null;
    }
    return JSON.parse(item);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

const initialState = { user: getStoredUser() };

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null };
    case "UPDATE_USER":
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { ...state, user: updatedUser };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
