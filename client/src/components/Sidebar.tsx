"use client";
import {useState} from "react";
import {FaCog} from "react-icons/fa";
import {BsGrid} from "react-icons/bs";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {usePathname, useRouter} from "next/navigation";
import {LiaTagSolid} from "react-icons/lia";
import {useAppSelector} from "@/app/redux/hooks";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState( null );
  const [isSidebarOpen, setIsSidebarOpen] = useState( true );
  const currentAdmin = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const router = useRouter();
  const currentRoute = usePathname();

  // console.log( "currentAdmin", currentAdmin );
  const toggleMenu = ( menu: any ) => {
    setOpenMenu( openMenu === menu ? null : menu );
  };

  const isActive = ( route: string ) => currentRoute === route;

  return (
    <aside
      className={`fixed h-screen bg-[#0A090F] cursor-pointer text-white transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-60`}
    >
      <div className="flex flex-col items-start justify-between h-full">
        {/* Menu Items */}
        <div className="w-full mt-4">
          <ul className="py-1">
            {/* Dashboard */}
            <li
              onClick={() => router.push( "/admin/dashboard" )}
              className={`flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none border-b border-gray-700 ${isActive( "/admin/dashboard" ) ? "text-white font-bold" : "text-[#999999] font-semibold"}`}  >
              <div className="flex items-center">
                <img src="/asset/dashboardIcon.svg" alt="" className="mr-2 px-1" />
                <span>Dashboard</span>
              </div>
              {/* <MdOutlineKeyboardArrowDown  className={`transition-transform ${openMenu === "dashboard" ? "rotate-180" : "-rotate-90"    }`}  /> */}
            </li>

            {/* Blog Dropdown */}
            <li className="border-b border-gray-700">
              <button
                className={`flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none ${openMenu === "blog" ? "text-white font-bold" : "text-[#999999] font-semibold"
                  }`}
                onClick={() => toggleMenu( "blog" )}
              >
                <div className="flex items-center">
                  <img src="/asset/Group 12856.svg" alt="" className="mr-2 px-1" />
                  <span>Blog</span>
                </div>
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform ${openMenu === "blog" ? "rotate-180" : "-rotate-90"
                    }`}
                />
              </button>
              {openMenu === "blog" && (
                <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                  <li
                    onClick={() => router.push( "/admin/all-postList" )}
                    className={`w-full hover:bg-[#1D1D21] pl-11 rounded cursor-pointer py-2 ${isActive( "/admin/all-postList" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    All Posts
                  </li>
                  <li onClick={() => router.push( "/admin/add-post" )} className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/add-post" ) ? "text-white font-bold" : "text-[#999999] font-semibold"}`} >
                    Add New Article
                  </li>
                  <li onClick={() => router.push( "/admin/add-podcast" )} className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/add-podcast" ) ? "text-white font-bold" : "text-[#999999] font-semibold"}`} >
                    Add New Podcast
                  </li>
                </ul>
              )}
            </li>

            {/* Manage Dropdown */}
            {currentAdmin?.role.toLowerCase() === "superadmin" && (
              <li className="border-b border-gray-700">
                <button
                  className={`flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none ${openMenu === "manage" ? "text-white font-bold" : "text-[#999999] font-semibold"
                    }`}
                  onClick={() => toggleMenu( "manage" )}
                >
                  <div className="flex items-center mr-1">
                    <img src="/asset/Group2.svg" alt="" className="mr-2" />
                    <span>User</span>
                  </div>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform ${openMenu === "manage" ? "rotate-180" : "-rotate-90"
                      }`}
                  />
                </button>
                {openMenu === "manage" && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                    <li
                      onClick={() => router.push( "/admin/contributor" )}
                      className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/contributor " ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                        }`}
                    >
                      Contributor
                    </li>
                    <li
                      onClick={() => router.push( "/admin/subscribers" )}
                      className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/subscribers" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                        }`}
                    >
                      Subscribers
                    </li>
                    {/* staff */}
                    <li
                      onClick={() => router.push( "/admin/staff" )}
                      className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/staff" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                        }`}
                    >
                      Staff
                    </li>
                    {/* <li
                    onClick={() => router.push( "/admin/contributor" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/contributor" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    Contributor
                  </li> */}
                  </ul>
                )}
              </li>
            )}

            {/* Categories Dropdown */}
            <li className="border-b border-gray-700">
              <button
                className={`flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none ${openMenu === "categories" ? "text-white font-bold" : "text-[#999999] font-semibold"
                  }`}
                onClick={() => toggleMenu( "categories" )}
              >
                <div className="flex items-center">
                  <BsGrid className="mr-2 h-5 w-5 text-[#999999]" />
                  <span>Categories</span>
                </div>
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform ${openMenu === "categories" ? "rotate-180" : "-rotate-90"
                    }`}
                />
              </button>
              {openMenu === "categories" && (
                <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                  <li
                    onClick={() => router.push( "/admin/category-list" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/category-list" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    Categories List
                  </li>
                  <li
                    onClick={() => router.push( "/admin/add-category" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/add-category" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    Add New Category
                  </li>
                </ul>
              )}
            </li>

            {/* Tags */}
            <li
              onClick={() => router.push( "/admin/tag" )}
              className={`border-b border-gray-700 cursor-pointer ${isActive( "/admin/tag" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                }`}
            >
              <div className="flex items-center justify-between px-4 py-2 rounded-none hover:bg-[#1D1D21]">
                <div className="flex items-center">
                  <LiaTagSolid className="mr-2 h-6 w-6 text-[#999999]" />
                  <span>Tags</span>
                </div>
                <MdOutlineKeyboardArrowDown className={`transition-transform ${openMenu === "tag" ? "rotate-180" : "-rotate-90"
                  }`} />
              </div>
            </li>

            {/* Settings */}
            <li className="border-b border-gray-700">
              <button
                onClick={() => toggleMenu( "settings" )}
                className={`flex items-center justify-between w-full text-left px-4 hover:bg-[#1D1D21] py-2 rounded-none ${openMenu === "settings" ? "text-white font-bold" : "text-[#999999] font-semibold"
                  }`}
              >
                <div className="flex items-center">
                  <FaCog className="mr-2 text-[#999999] h-5 w-5" />
                  <span>Settings</span>
                </div>
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform ${openMenu === "settings" ? "rotate-180" : "-rotate-90"
                    }`}
                />
              </button>
              {openMenu === "settings" && (
                <ul className="pl-10 mt-2 space-y-1 text-gray-400">
                  <li
                    onClick={() => router.push( "/admin/news" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/news" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    News
                  </li>
                  <li
                    onClick={() => router.push( "/admin/update-profile" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/update-profile" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    Update Profile
                  </li>
                  <li
                    onClick={() => router.push( "/admin/view-profile" )}
                    className={`cursor-pointer w-full hover:bg-[#1D1D21] pl-11 rounded py-2 ${isActive( "/admin/view-profile" ) ? "text-white font-bold" : "text-[#999999] font-semibold"
                      }`}
                  >
                    View Profile
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="flex-1"></div>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 text-white bg-[#1D1D21] p-2 rounded"
        onClick={() => setIsSidebarOpen( true )}
      >
        &#9776;
      </button>
    </aside>
  );
};

export default Sidebar;