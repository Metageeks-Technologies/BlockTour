"use client";
import { useAppSelector } from "@/app/redux/hooks";
import React from "react";
import { FaEdit } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  posts: string[];
}

const ViewProfile: React.FC = () => {
  const user: User = useAppSelector(
    (state: any) => state.contributor.currentUser
  );
  console.log(user);

  return (
    <div className="lg:ml-64 h-screen bg-[#0A090F] text-white sm:m-4 sm:my-4 my-2  sm:rounded-2xl w-full border border-[#28272D]">
      <div className="border-b border-[#28272D] px-4 py-4">
        <h1 className="text-xl px-6">View Profile</h1>
      </div>

      <div className="sm:p-20 p-4 m-auto sm:gap-10 gap-6 flex sm:flex-row flex-col">
        {/* Profile Image */}
        <div className=" lg:w-44 sm:w-48 w-full flex justify-between  sm:mt-1 mt-3">
          <img
            src={user?.profileImage} // Fallback if no image
            alt="Profile"
            className="sm:w-36 sm:h-36 h-20 w-20 sm:mt-4  rounded-full object-cover"
          />
          <button className="border self-center border-[#DF841C] py-2 rounded px-4 sm:hidden block">
            Update Profile
          </button>
        </div>

        {/* User Info Section */}
        <div className="w-full">
          <div className="sm:block hidden">
            <div className="mb-2 flex justify-between items-center">
              <h1 className="font-bold">View Profile</h1>
              <button className="border border-[#DF841C] py-2 rounded px-4">
                Update Profile
              </button>
            </div>
          </div>

          <div className="border sm:p-10 w-full border-[#28272D] rounded-lg overflow-scroll md:overflow-hidden">
            {/* Name Row */}
            <div className="flex justify-between items-center border-[#28272D] px-4 py-3 border-b">
              <div className="w-1/2 text-[#CCCCCC]">Name</div>
              <div className="w-1/2 text-sm">{user?.name}</div>
            </div>

            {/* Email Row */}
            <div className="flex justify-between items-center border-[#28272D] px-4 py-3 border-b">
              <div className="w-1/2 text-[#CCCCCC]">E-mail</div>
              <div className="w-1/2 text-sm">{user?.email}</div>
            </div>

            <div className="flex justify-between items-center px-4 py-3 border-b border-[#28272D] ">
              <div className=" w-1/2 text-[#CCCCCC]">Phone Number</div>
              <div className=" w-1/2  text-sm">98107928XX</div>
            </div>

            {/* Email Row */}
            <div className="flex justify-between border-[#28272D] items-center px-4 py-3 border-b">
              <div className=" w-1/2 text-[#CCCCCC]">Country</div>
              <div className=" w-1/2 text-sm">India</div>
            </div>

            <div className="flex justify-between border-[#28272D] items-center px-4 py-3 border-b">
              <div className=" w-1/2 text-[#CCCCCC]">Address</div>
              <div className=" w-1/2 text-sm">
                55, 2nd Lane, Westend Marg, Saidullajab, Saket, New Delhi-110030
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
