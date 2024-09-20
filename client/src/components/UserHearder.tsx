"use client";
import { getCurrentUser, logout } from "@/app/redux/feature/contributor/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Sidebarpop from "./contributor/SidebarPopUp";
// import NotificationPopup from "./contributor/NotificationPopUp";

const UserHearder = () => {
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const user = useAppSelector( ( state: any ) => state.contributor.currentUser ) || {};
  const dispatch = useAppDispatch();
  console.log("user:-", user);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout(dispatch);
    router.push("/login");
  };

  useEffect(() => {
    if (!Cookies.get("Token")) {
      router.push("/login");
    }
    getCurrentUser(dispatch);
  }, []);

  const handleUserIconClick = () => {
    setIsUserOpen(!isUserOpen);
  };

  return (
    <div className="sticky z-30 top-0">
      <header className="bg-[#0A090F] text-white  flex items-center justify-between px-6 py-2">
        <div className="flex items-center">
          <img
            src="/asset/Block-logo.svg"
            alt="Block Tour Logo"
              className="mx-auto h-14 w-auto cursor-pointer"
              onClick={()=>router.push("/")}
          />
        </div>

        {/* <ul className="flex space-x-4">
          <li
            className="cursor-pointer text-[#bdbcc0] font-bold hover:text-[#DF841C]"
            onClick={() => router.push( "/dashboard" )}
          >
            Dashboard
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li
            className="cursor-pointer text-[#bdbcc0] font-bold hover:text-[#DF841C]"
            onClick={() => router.push( "/" )}
          >
            Homepage
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li className="cursor-pointer font-bold text-[#c8c8c9] hover:text-[#DF841C]"
            onClick={() => router.push( "/add-post" )}
          >
            Contribute
          </li>
        </ul> */}

        {/* for desktop */}
        <div className="flex items-center space-x-5">
          <div>
            <div onClick={togglePopup} className="relative cursor-pointer">
              <IoMdNotificationsOutline className="h-7 w-7 cursor-pointer lg:block hidden" />
              <span className="absolute -top-1 -right-[3px] text-center lg:block hidden bg-[#F6911D] rounded-full h-4 w-4  text-xs">
                6
              </span>
            </div>

            <NotificationPopup isOpen={isPopupOpen} togglePopup={togglePopup} ids={user?.notifications} />
          </div>
          <div className="relative lg:block hidden">
            <img
              src="/asset/Vector1.svg"
              alt=""
              className="cursor-pointer"
              onClick={handleUserIconClick}
            />
            {isUserOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded shadow-xl z-50">
                {user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <BiLogOutCircle className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                    <button
                      className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => router.push("/user-profile")}
                    >
                      <FaUserCircle className="w-5 h-5 mr-3" />
                      User Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push("/admin/login")}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <BiLogInCircle className="w-5 h-5 mr-3" />
                    Log In
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* for mobile*/}
        <div className="lg:hidden flex gap-3 items-center">
          <div>
            <div onClick={togglePopup} className="relative cursor-pointer">
              <IoMdNotificationsOutline className="h-7 w-7 cursor-pointer lg:hidden" />
              <span className="absolute -top-1 -right-1 text-center bg-[#F6911D] rounded-full h-4 w-4  text-xs">
                6
              </span>
            </div>

            <NotificationPopup isOpen={isPopupOpen} togglePopup={togglePopup} ids={user?.notifications} />
          </div>
          {/* <button
          className="bg-gray-800  px-4 py-2 rounded hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Open 
          
        </button> */}
          <img src="/asset/sink.svg" alt="" onClick={toggleSidebar} />
        </div>
      </header>
      <Sidebarpop isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default UserHearder;
