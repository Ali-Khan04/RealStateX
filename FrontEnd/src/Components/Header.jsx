import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
  };

  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-8xl mx-auto">
        <Link to="/">
          <h1 className="flex flex-wrap font-bold text-xl">
            <span className="text-slate-700">Real</span>
            <span className="text-slate-700">Estate</span>
            <span className="text-slate-500">X</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <form className="bg-slate-100 p-1 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>

          <ul className="flex gap-4 items-center">
            <Link to="/">
              <li className="text-slate-700 hover:underline cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="text-slate-700 hover:underline cursor-pointer">
                About
              </li>
            </Link>

            {state.user ? (
              <li className="flex items-center gap-3">
                <div className="relative">
                  {!imageError && state.user.avatar ? (
                    <>
                      <Link to="/profile">
                        <img
                          src={state.user.avatar}
                          alt="user avatar"
                          className={`w-8 h-8 rounded-full object-cover border-2 border-slate-400 shadow-sm transition-opacity duration-200 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onError={handleImageError}
                          onLoad={handleImageLoad}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                      </Link>
                      {!imageLoaded && (
                        <div className="absolute inset-0 w-8 h-8 rounded-full bg-slate-400 animate-pulse"></div>
                      )}
                    </>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                  )}
                </div>

                <span className="text-slate-700 font-medium max-w-32 truncate">
                  {state.user.username}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline font-medium transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            ) : (
              <Link to="/signin">
                <li className="text-slate-700 hover:underline cursor-pointer">
                  SignIn
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
