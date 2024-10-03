"use client";
import { useState } from "react";
import React from "react";
import { FaCog, FaGraduationCap } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { HiMiniPlayCircle } from "react-icons/hi2";
import { LuBookMinus } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { logout } from "@/app/redux/feature/contributor/api";
import { FiLogOut } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebarpop: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector( ( state: any ) => state.contributor.currentUser );

  // console.log("sidebar user", user)

  const handleLogout = async () => {
    await logout( dispatch );
    // router.push("/auth/user/login");
  };

  // const toggleMenu = (menu: string) => {
  //   setOpenMenu(openMenu === menu ? null : menu);
  // };

  const handleJoinForFree = () => {
    router.push( "/auth/user/signup" );
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#0A090F] z-50 text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b border-[#17161B] py-2 ">
          {/* <div className="ml-4 flex gap-2 items-center ">
            <img src="/asset/profile.svg" alt=""
              className="h-8 w-8"
            />
            <h1>Md Sajid</h1>
          </div> */}


{user ? (
            <>
              <div className="flex gap-3 text-[#999999] items-center">
                <img src={user.profileImage} alt={user.name || "No author found"} className="h-14 w-14 rounded-full object-cover"  />
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-bold text-[#FFFFFF] whitespace-nowrap">
                    {user.name}
                  </h1>
                  <button  className="flex font-semibold gap-1 items-center bg-[#DF841C] rounded py-0.5 px-2 text-[#FFFFFF]" onClick={handleLogout}  >
                    <FiLogOut className="font-semibold w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
          <button className="text-xs bg-[#DF841C] py-2 px-3 rounded ml-5"
          onClick={handleJoinForFree}
          >
            Join for Free
          </button>
            </>
          )}

          {/* <button className="text-xs bg-[#DF841C] py-2 px-3 rounded ml-5"
          onClick={handleJoinForFree}
          >
            Join for Free
          </button> */}

          <button
            className="text-xl mr-3 text-[#DF841C]"
            onClick={toggleSidebar}
          >
           <IoClose className=" h-6 w-6" />
          </button>
        </div>

        <div className="">
          {/* Menu Items */}
          <div className="py-4">
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

            <div
              className="hover:bg-[#DF841C] rounded-md group"
              onClick={() => router.push( "/podcast-episode" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <HiMiniPlayCircle className="h-4 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">
                  Episodes
                </span>
              </li>
            </div>

            <div
              className="hover:bg-[#DF841C] rounded-md group "
              onClick={() => router.push( "/article" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <LuBookMinus className="h-4 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">
                  Articles
                </span>
              </li>
            </div>

            <div
              className="hover:bg-[#DF841C] rounded-md group"
              onClick={() => router.push( "/guides" )}
            >
              <li className="flex items-center gap-2 px-4  py-1.5 text-[#999999]">
                <FaGraduationCap className="h-5 w-4 group-hover:text-white" />
                <span className="text-sm group-hover:text-white ">Guides</span>
              </li>
            </div>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebarpop;
