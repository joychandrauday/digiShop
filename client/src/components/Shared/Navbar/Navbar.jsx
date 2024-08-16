import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { app } from "../../../firebase/firebase.config";
import { AuthContext } from "../../../providers/AuthProvider";
import { getAuth } from "firebase/auth";
import logoDigishop from "../../../assets/images/digishopPNG.png";
const auth = getAuth(app);
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navLinks = (
    <>
      {/* <li>
        <NavLink to={"/"}>Home</NavLink>
      </li> */}
      <li>
        <NavLink to={"/"}>Products</NavLink>
      </li>
      <li>
        <NavLink to={"/add"}>Add Product</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar  bg-base-100 container mx-auto py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[99999999] p-2 shadow bg-base-100 rounded-box w-44"
            >
              {navLinks}
            </ul>
          </div>
          <div>
            <img
              src={logoDigishop}
              alt="Digicash logo"
              className="logo w-3/6"
            />
          </div>
        </div>
        {/* <div className="navbar-center hidden lg:flex">
          
        </div> */}
        <div className="navbar-center">
          <ul className="menu gap-2 menu-horizontal px-1 font-semibold">{navLinks}</ul>
        </div>
        <div className="navbar-end">
        {user ? (
            <div className="dropdown dropdown-end flex items-center">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={999}
                className="menu menu-sm dropdown-content lg:mt-32 z-[999] p-2 shadow bg-base-100 rounded-box w-44"
              >
                <li>
                  <h1 className="text-basic block  font-extrabold">
                    welcome{" "}
                    <div className="text-second">{user?.displayName}</div>
                  </h1>
                </li>
                <li>
                  <a onClick={() => logOut(auth)}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="lg:relative absolute lg:right-0 right-16">
              <Link
                to={"/signup"}
                className="lg:btn p-3 lg:p-0 lg:bg-[#00008b] lg:text-white lg:rounded-full lg:px-7 hover:bg-blue-950"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="lg:btn p-3 lg:p-0 lg:bg-transparent lg:border-[#00008b] lg:text-[#00008b] lg:rounded-full lg:px-7 hover:bg-blue-950 hover:text-white"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
