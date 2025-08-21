import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
function Auth() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        }),
      });
      dispatch({
        type: "LOGIN",
        payload: {
          name: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
        },
      });
      navigate("/");
    } catch (err) {
      console.log("Error in Google Authentication", err);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="flex items-center justify-center gap-2 w-full bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer shadow-sm hover:shadow-md"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.5-1.6-35-4.8-51.7H272v97.8h147.4c-6.4 34.6-25.5 63.9-54.6 83.6v69.3h88.4c51.6-47.6 81.3-117.8 81.3-199z"
          fill="#4285F4"
        />
        <path
          d="M272 544.3c73.9 0 135.8-24.6 181.1-66.9l-88.4-69.3c-24.5 16.4-56.2 26-92.7 26-71.3 0-131.7-48.1-153.3-112.7H29.2v70.7C74.4 480.2 167.6 544.3 272 544.3z"
          fill="#34A853"
        />
        <path
          d="M118.7 328.7c-9.2-27.6-9.2-57.5 0-85.1V172.9H29.2c-29.5 58.8-29.5 127.2 0 186l89.5-70.2z"
          fill="#FBBC05"
        />
        <path
          d="M272 107.7c39.9 0 75.8 13.7 104 40.7l78-78C408 24.4 345.9 0 272 0 167.6 0 74.4 64.1 29.2 162.9l89.5 70.7c21.6-64.6 82-112.7 153.3-112.7z"
          fill="#EA4335"
        />
      </svg>
      Sign In with Google
    </button>
  );
}

export default Auth;
