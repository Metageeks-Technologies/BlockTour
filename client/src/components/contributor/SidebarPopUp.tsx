"use client"
import { useState } from "react";
import React from "react";
import { FaCog } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {useRouter} from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebarpop: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A090F] z-50 text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b border-gray-700 py-2 ">
          <div className="ml-4 flex gap-2 items-center ">
            <img src="/asset/profile.svg" alt=""
            className="h-8 w-8"
             />
             <h1>Md Sajid</h1>
          </div>
          <button className="text-xl mr-3 text-[#DF841C] h-6 w-6" onClick={toggleSidebar}>
            &times;
          </button>
        </div>

        <div className="flex flex-col items-start justify-between h-full">
          {/* Menu Items */}
          <div className="w-full cursor-pointer">
            <ul className="py-1">
              {/* Dashboard */}
              <li
                onClick={() => router.push("/dashboard")}
                className="flex border-b border-gray-700 items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none"
              >
                <div className="flex items-center">
                  <img src="/asset/home.svg" alt="" className="mr-1 px-1 " />
                  <span className="text-[#999999] font-semibold">Dashboard</span>
                </div>
              </li>

              {/* Blog Dropdown */}
              <li className="border-b border-gray-700">
                <button
                  className="flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none"
                  onClick={() => toggleMenu("blog")}
                >
                  <div className="flex items-center">
                    <img
                      src="/asset/Group 12856.svg"
                      alt=""
                      className="mr-1 px-1"
                    />
                    <span className="text-[#999999] font-semibold">Blog</span>
                  </div>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform ${
                      openMenu === "blog" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMenu === "blog" && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                    <li
                      onClick={() => router.push("/dashboard")}
                      className="w-full hover:bg-[#1D1D21] pl-11 rounded cursor-pointer py-2"
                    >
                      My Blog
                    </li>
                    <li
                      onClick={() => router.push("/add-post")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Add New Blog
                    </li>
                  </ul>
                )}
              </li>

              {/* Manage Dropdown */}
              <li className="border-b border-gray-700">
                <button
                  className="flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none"
                  onClick={() => toggleMenu("manage")}
                >
                  <div className="flex items-center mr-1">
                    <img src="/asset/Group2.svg" alt="" className="mr-2" />
                    <span className="text-[#999999]">Manage</span>
                  </div>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform ${
                      openMenu === "manage" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMenu === "manage" && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                    <li
                      onClick={() => router.push("/publish")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Published
                    </li>

                    <li
                      onClick={() => router.push("/draft")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Draft
                    </li>
                    <li
                      onClick={() => router.push("/delete")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Deleted
                    </li>
                  </ul>
                )}
              </li>

              {/* Categories Dropdown */}
              <li className="border-b border-gray-700">
                <button
                  className="flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none"
                  onClick={() => toggleMenu("categories")}
                >
                  <div className="flex items-center">
                    <BsGrid className="mr-2 h-5 w-5 text-[#999999]" />
                    <span className="text-[#999999]">Categories</span>
                  </div>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform ${
                      openMenu === "categories" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMenu === "categories" && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                    <li
                      onClick={() => router.push("/category-list")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Categories List
                    </li>
                    <li
                      onClick={() => router.push("/add-category")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Add New Category
                    </li>
                  </ul>
                )}
              </li>

              {/* Settings */}
              <li className="border-b border-gray-700">
                <button
                  onClick={() => toggleMenu("settings")}
                  className="flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none"
                >
                  <div className="flex items-center">
                    <FaCog className="mr-2 text-[#999999] h-5 w-5" />
                    <span className="text-[#999999]">Settings</span>
                  </div>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform ${
                      openMenu === "settings" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMenu === "settings" && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                    <li
                      onClick={() => router.push("/user-profile")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      Update Profile
                    </li>
                    <li
                      onClick={() => router.push("/view-profile")}
                      className="cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2"
                    >
                      View Profile
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
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
