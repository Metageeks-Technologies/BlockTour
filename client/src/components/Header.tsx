"use client";
import { getCurrentAdmin, logout } from "@/app/redux/feature/admin/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import AdminNotificationPopUp from "./AdminNotificationPopUp";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState( false );
  const [noOfNotifications, setNoOfNotifications] = useState<number>( 0 )


  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const currentAdmin = useAppSelector((state: any) => state?.superAdmin?.admin);

  const handleLogout = async () => {
    await logout(dispatch);
    router.push("/auth/admin/login");
  };

  const handleUserIconClick = () => {
    setIsUserOpen(!isUserOpen);
  };

  // if token in cookies is undefined then send the router to login page
  useEffect(() => {
    if (!Cookies.get("Token")) {
      router.push("/auth/admin/login");
    }
    getCurrentAdmin(dispatch);
  }, []);
  // console.log("current admin:-", currentAdmin);

  return (
    <header className="bg-[#0A090F] text-white sticky w-full z-50 top-0 flex items-center justify-between px-6 py-2">
      <div className="flex items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/asset/Block-logo.svg"
            alt="Block Tour Logo"
            className="mx-auto h-14 w-auto"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">

        <div>
          <div  onClick={togglePopup} className="relative cursor-pointer">
            <IoMdNotificationsOutline
              className="h-7 w-7 cursor-pointer"
            />
            <span className="absolute -top-1 -right-1 text-center bg-[#F6911D] rounded-full h-4 w-4  text-xs">
              {noOfNotifications}
            </span>
          </div>
          <AdminNotificationPopUp isOpen={isPopupOpen} togglePopup={togglePopup} ids={currentAdmin?.notifications} setNoOfNotifications={setNoOfNotifications} />

        </div>

        <div className="relative">
          <FaUserCircle
            className="w-7 h-7 text-gray-300 cursor-pointer"
            onClick={handleUserIconClick}
          />
          {isUserOpen && (
            <div className="absolute right-0 mt-2 w-fit whitespace-nowrap bg-black border border-gray-700 rounded shadow-xl z-50">
              {currentAdmin ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <BiLogOutCircle className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2  text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => router.push("/admin/update-profile")}
                  >
                    <FaUserCircle className="w-5 h-5 mr-3" />
                    User Profile
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push("/auth/admin/login")}
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
    </header>
  );
}
