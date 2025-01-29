import { NavLink } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import Mobile from "./Mobile";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className=" px-8 py-5 bg-white items-center flex justify-between text-black ">
      <div className="text-white text-3xl flex gap-1 items-center">
        <span className="font-bold">
          <NavLink to="/" className="text-black text-4xl">
            Blood<span className="text-primary">Bond</span>
          </NavLink>
        </span>
        <img src="./Logo.png" alt="..." className="w-12 h-auto  rounded-md" />
      </div>
      <div className="flex gap-10 items-center flex-wrap ">
        {!isLoggedIn && (
          <>
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hidden  text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden lg:block gap-2">Home</div>
            </NavLink> */}
            {/* <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "hidden  text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden lg:block gap-2">About</div>
            </NavLink> */}
            {/* <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "hidden  text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden lg:block gap-2">Contact</div>
            </NavLink> */}
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden  p-2 rounded-xl lg:flex lg:items-center gap-2">
                <LogIn /> Sign In
              </div>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden text-gray-600 lg:flex lg:items-center gap-2">
                Sign Up
                <LogIn />
              </div>
            </NavLink>

            <Mobile></Mobile>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hidden  text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className=" hidden lg:block gap-2">Home</div>
            </NavLink>
            <NavLink
              to="/donor"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className="hidden lg:block gap-2">Donor</div>
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className="hidden lg:block gap-2">History</div>
            </NavLink>
            <NavLink
              to="/reward"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className="hidden lg:block gap-2">Reward</div>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className="hidden lg:block gap-2">Profile</div>
            </NavLink>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "hidden text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                  : "hidden text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
              }
            >
              <div className="hidden  gap-2 lg:flex lg:items-center">
                <LogOut></LogOut>Logout
              </div>
            </NavLink>
            <Mobile></Mobile>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
