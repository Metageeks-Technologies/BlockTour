"use client";
import {useEffect, useState} from "react";
import {FaGraduationCap} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {LuBookMinus, LuUser} from "react-icons/lu";
import {IoMdHome, IoMdNotificationsOutline} from "react-icons/io";
import {HiMiniPlayCircle} from "react-icons/hi2";
import {useAppSelector, useAppDispatch} from "@/app/redux/hooks";
import NotificationPopup from "./NotificationPopUp";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import Cookies from "js-cookie";

const Sidebar = () => {
  // const [openMenu, setOpenMenu] = useState(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [noOfNotifications, setNoOfNotifications] = useState<number>( 0 );
  const [isOpen, setIsOpen] = useState( false );
  const [isPopupOpen, setIsPopupOpen] = useState( false );
  const user = useAppSelector( ( state: any ) => state.contributor.currentUser ) || {};

  const togglePopup = () => {
    setIsPopupOpen( !isPopupOpen );
  };

  const handleSignIn = () => {
    router.push( "/auth/user/login" );
  };

  const handleJoinForFree = () => {
    router.push( "/auth/user/signup" );
  };

  console.log( user );
  useEffect( () => {
    if ( Cookies.get( "UserToken" ) && !user ) {
      getCurrentUser(dispatch);
    }
  }, [] );


  return (
    <aside className="fixed h-screen lg:block sm:hidden hidden bg-[#0A090F] text-white w-52 z-30">
      <div className="flex flex-col items-start justify-between h-full px-4">
        {/* Menu Items */}
        <div className="w-full mt-4 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="px-4 mt-2 " onClick={() => router.push( '/' )}>
              <img
                src="/asset/Block-logo.svg"
                alt=""
                className="w-16 h-10 object-cover"
              />
            </div>
            <div>
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

            <div className="hover:bg-[#DF841C] rounded-md group">
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <FaGraduationCap className="h-5 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">Guides</span>
              </li>
            </div>

          </ul>
        </div>

        <div className="flex flex-col py-8 gap-3 px-4">
          {user ? (
            <div className="flex gap-2 text-[#999999] items-center cursor-pointer" onClick={() => router.push( "/view-profile" )}>
              <LuUser className="h-5 w-5" />
              <p className="text-lg whitespace-nowrap">{user.name}</p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 text-[#999999] items-center cursor-pointer">
                <LuUser className="h-5 w-5" />
                <p className="text-lg">Sign in</p>
              </div>
              <button className="bg-[#DF841C] py-2.5 px-4 rounded-md cursor-pointer font-semibold" onClick={handleSignIn}>
               Login
              </button>
              <button className="bg-[#DF841C] py-2.5 px-4 rounded-md cursor-pointer font-semibold" onClick={handleJoinForFree}>

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
