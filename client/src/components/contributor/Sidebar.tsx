"use client";
import {useEffect, useState} from "react";
import {FaGraduationCap} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {LuBookMinus, LuUser} from "react-icons/lu";
import {IoMdHome, IoMdNotificationsOutline} from "react-icons/io";
import {HiMiniPlayCircle} from "react-icons/hi2";
import {useAppSelector, useAppDispatch} from "@/app/redux/hooks";
import NotificationPopup from "./NotificationPopUp";
import {getCurrentUser, logout} from "@/app/redux/feature/contributor/api";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [noOfNotifications, setNoOfNotifications] = useState<number>( 0 );
  const [isPopupOpen, setIsPopupOpen] = useState( false );
  const user = useAppSelector( ( state: any ) => state.contributor.currentUser );

  const togglePopup = () => {
    setIsPopupOpen( !isPopupOpen );
  };

  const handleSignIn = () => {
    router.push( "/auth/user/login" );
  };

  const handleJoinForFree = () => {
    router.push( "/auth/user/signup" );
  };

  const handleLogout = async () => {
    await logout(dispatch);
    Cookies.remove("UserToken")
    router.push("/auth/user/login");
  };

  // console.log( user );
  useEffect( () => {
    if ( Cookies.get( "UserToken" ) && !user) {
      getCurrentUser(dispatch);
    }

  }, [] );
  // console.log( "user:-", user ); 

  return (
    <aside className="fixed h-screen lg:block sm:hidden hidden bg-[#0A090F] text-white w-52 z-30">
      <div className="flex flex-col items-start justify-between h-full px-4">
        {/* Menu Items */}
        <div className="w-full mt-2 cursor-pointer relative">
          <div className="flex items-center justify-between">
            <div className="px-4 mt-2 " onClick={() => router.push( '/' )}>
              <img
                src="/asset/Block-logo.svg"
                alt=""
                className="w-16 h-10 object-cover"
              />
            </div>

            <div className="mt-5">
              <div onClick={togglePopup} className="relative cursor-pointer">
                <IoMdNotificationsOutline className="h-7 w-7 cursor-pointer lg:block hidden" />
                <span className="absolute -top-1 -right-[3px] text-center lg:block hidden bg-[#F6911D] rounded-full h-4 w-4  text-xs">
                  {noOfNotifications}
                </span>
              </div>

              <NotificationPopup isOpen={isPopupOpen} togglePopup={togglePopup} ids={user?.notifications} setNoOfNotifications={setNoOfNotifications} />
            </div>

          </div>
          <div className="py-6">
            {/* Dashboard */}
            <li
              onClick={() => router.push( "/dashboard" )}
              className="flex items-center justify-between w-full text-left  px-4 py-2 rounded-none"
            >
              <div className="flex group text-[#999999] gap-1  items-center">
                <IoMdHome className="h-4 w-4 " />
                <span className="group-hover:text-white text-sm">
                  Dashboard
                </span>
              </div>
            </li>
          </div>

          {/* Blog Dropdown */}
          <ul className="space-y-2">
            <h1 className=" pb-4 px-4 uppercase text-sm text-[#999999] font-semibold">
              Media
            </h1>

            <div className="hover:bg-[#DF841C] rounded-md group"
              onClick={() => router.push( "/podcast-episode" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <HiMiniPlayCircle className="h-4 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">Episodes</span>
              </li>
            </div>

            <div className="hover:bg-[#DF841C] rounded-md group "
              onClick={() => router.push( "/article" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <LuBookMinus className="h-4 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">Articles</span>
              </li>
            </div>

            <div className="hover:bg-[#DF841C] rounded-md group"
              onClick={() => router.push( "/guides" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <FaGraduationCap className="h-5 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">Guides</span>
              </li>
            </div>

          </ul>
        </div>

        <div className="flex flex-col py-8 w-full ">
          {user ? (
            <>
              <div className="flex gap-3 text-[#999999] items-center">
              <img
              src="/asset/Vector1.svg"
              alt=""
              className="cursor-pointer h-14 w-14"
              onClick={() => router.push("/view-profile")}
            />
            <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold text-[#FFFFFF] whitespace-nowrap">{user.name}</h1>
                <button className="flex font-semibold gap-1 items-center bg-[#DF841C] rounded py-1 px-2 text-[#FFFFFF]"
                onClick={handleLogout}
                >
                <FiLogOut className="font-semibold w-4 h-4" />
                  Logout
                </button>
            </div>

              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 text-[#999999] items-center cursor-pointer"
                onClick={handleSignIn}
              >
                <LuUser className="h-5 w-5" />
                <p className="text-lg">Sign in</p>
              </div>
            
              <button
                className="bg-[#DF841C] py-2.5 px-4 rounded-md cursor-pointer font-semibold mt-2"
                onClick={handleJoinForFree}
              >
                Join for Free
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
