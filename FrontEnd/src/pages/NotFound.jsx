import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaKey } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center p-6">
      <h1 className="text-8xl font-extrabold text-red-500 mb-4 animate-bounce">
        404
      </h1>

      <p className="text-2xl font-semibold mb-2">
        Oops… this property is{" "}
        <span className="text-yellow-400">off the market!</span>
      </p>
      <p className="text-lg text-gray-300 mb-6">
        Looks like you tried to visit a page thats either <br />
        already sold, rented out, or never existed 🏚️
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-transform hover:scale-105"
        >
          <FaHome />
          Back to Listings
        </Link>
      </div>

      <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm">
        <FaMapMarkerAlt />
        <span>Maybe try searching in another neighborhood?</span>
      </div>
    </div>
  );
}
