import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
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
          <form className="bg-slate-100 p-1 rounded-lg flex items-center ">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>

          <ul className="flex gap-4">
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
            <Link to="/signin">
              <li className="text-slate-700 hover:underline cursor-pointer">
                SignIn
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
