import { useContext } from "react";
import { AuthContext } from "./AuthContex.jsx";

export function useAuth() {
  return useContext(AuthContext);
}
