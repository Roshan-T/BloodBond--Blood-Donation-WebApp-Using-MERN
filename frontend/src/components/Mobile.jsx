import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, LogIn, UserPlus, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Mobile = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <div className="lg:hidden">
        {open === true ? (
          <div className="text-black">
            <X className="h-8 w-8" onClick={() => setOpen((state) => !state)} />
          </div>
        ) : (
          <div>
            <Menu
              className="h-8 w-8"
              onClick={() => setOpen((state) => !state)}
            ></Menu>
          </div>
        )}
      </div>
      {open && !isLoggedIn && (
        <div className="lg:hidden absolute flex flex-col top-16 left-0  right-0 bg-white shadow-lg p-2 space-y-4">
          <div className="flex justify-evenly  ">
            <div className=" text-black p-1 flex items-center justify-center flex-1 transition duration-300  px-1 text-xl gap-1 hover hover:text-red-500  hover:cursor-pointer">
              <LogIn className="w-4 h-4"></LogIn>
              <Link to="/login"> Sign In</Link>
            </div>

            <div className=" text-red-600 flex-1 flex items-center justify-center max-w-full p-2 transition duration-300 bg-red-100 md:flex rounded-md px-1 text-xl gap-1 hover hover:bg-red-200  hover:cursor-pointer">
              <UserPlus className="w-4 h-4"></UserPlus>
              <Link to="/register"> Sign Up</Link>
            </div>
          </div>
          {/* <div className="  text-black px-3 text-xs hover hover:cursor-pointer transition duration-300 hover:text-red-500 ">
            About
          </div>
          <div className="  transition duration-300 text-black px-3  text-xs hover hover:cursor-pointer hover:text-red-500 ">
            Contact
          </div> */}
          <div className=" mr-3 text-white p-3 transition duration-300 bg-primary flex rounded-2xl text-xl  items-center gap-1 hover hover:bg-red-500  hover:cursor-pointer hover:text-white">
            <Heart></Heart> Donate Now
          </div>
        </div>
      )}
      {open && isLoggedIn && (
        <div className="lg:hidden absolute flex flex-col top-16 right-0 bg-gray-50 shadow-lg p-2 space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "  text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            <div className=" gap-2">Home</div>
          </NavLink>
          <NavLink
            to="/donor"
            className={({ isActive }) =>
              isActive
                ? " text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            <div className=" gap-2">Donor</div>
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? " text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            <div className=" gap-2">History</div>
          </NavLink>
          <NavLink
            to="/reward"
            className={({ isActive }) =>
              isActive
                ? " text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            <div className=" gap-2">Reward</div>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? " text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            <div className=" gap-2">Profile</div>
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive
                ? " text-primary p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 cursor-pointer"
                : " text-black p-1 transition duration-300 md:flex rounded-md px-1 text-2xl items-center gap-1 hover:cursor-pointer hover:text-red-500"
            }
          >
            Logout <LogOut></LogOut>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Mobile;
