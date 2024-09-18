// components/PostsTable.js
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";

const PostsTable = () => {
  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F]  rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D] ">
        <h1 className="text-white text-xl font-semibold">Deleted</h1>
        <button className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded">
          + Add New Post
        </button>
      </div>

      <div className="border-b border-[#17161B] mt-8 mb-4 flex gap-8 px-8 font-semibold ">
        <p className="text-[#7B7A7F] mb-1 cursor-pointer">Deleted</p>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center space-x-4 px-8 ">
          <select className=" bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded ">
            <option>Bulk actions</option>
          </select>
          <button className="bg-[#2E2E3E] text-white px-4 py-2 rounded">
            Apply
          </button>
          <div className="flex gap-2 items-center">
            <p>Sort by</p>
            <select className=" bg-[#0A090F]  border border-neutral-600  text-[#7B7A7F] px-4 py-2 rounded ">
              <option>Date created</option>
              <option>Date updated</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <select className="bg-[#0A090F]  border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded ">
            <option>All Categories</option>
            {/* Add more options as needed */}
          </select>
          <div className=" relative border border-neutral-600 rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#0A090F] text-[#7B7A7F] px-4 py-2 rounded border-none focus:outline-none"
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center px-4">
          <p>View</p>
          <select className=" bg-[#0A090F]  border border-neutral-600  text-[#7B7A7F] px-4 py-2 rounded ">
            <option>10</option>
            <option>20</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md ">
          <thead>
            <tr className="bg-[#0A090F] border-b border-[#28272D] text-white  text-left">
              <th className="py-3 px-8">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Categories</th>
              <th className="py-3 px-4">Tags</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">SEO</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeatable row */}
            {[...Array( 7 )].map( ( _, idx ) => (
              <tr
                key={idx}
                className="border-b border-[#28272D] hover:bg-[#28272D]"
              >
                <td className="py-3 px-8">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4">B00101</td>
                <td className="py-3 px-4">
                  Ut feugiat augue ac bibendum iaculis.
                </td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/8168/3295/b0a2b0fbcfbf38565bd3f908b89fc8e7?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lI3cK3voehA358~W7E6KFITFzSKfRcHxSnxbKKC65co2aGJcLJCcvxcVXSN10uREnUCw35vdYjKGYaJ~DlkhAFtNF9PELl1woZA3hGyr35mIDrud5pjCGw6VSa6LHSdn3EfguFpD2E~I271jXsbaihWNQwH0RfDoct5R2loGZLo2zrPLd-vUSOVx8QHuiD37WOrjo9UdGQvI2t-YMwvD2r1vdKoSy1bblOn1siEXPH-UofPREVNQP6vx6mQXkIMt6OMZQIV53k8TOwjUOPpHHSwGrnuFSzslzhP35RplGWmWAFaEv0BY8S60bNtKHYE6w48zF0D4nGtvNpws0js91Q__"
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                  />
                  <span>Rohit Kumar</span>
                </td>
                <td className="py-3 px-4">Business</td>
                <td className="py-3 px-4">
                  <span className="bg-[#28272D] px-2 py-1 rounded text-sm">
                    Promotion
                  </span>
                </td>
                <td className="py-3 px-4">Published</td>
                <td className="py-3 px-4">22 Jan 2024</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-[#DF841C] cursor-pointer">●</span>
                </td>
                <td className="py-3 px-4 text-center flex items-center justify-center">
                  <button className="text-white flex items-center justify-center  h-8 w-8 bg-[#28272D] rounded-full">
                    <BiDotsVerticalRounded className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ) )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-8 ">
        <div className="text-[#7B7A7F]">Showing 1 to 10 of 90 entries</div>
        <div className="flex space-x-2">
          <button>
            <img src="/asset/Group 12367.svg" alt="" />
          </button>
          <button className="bg-[#DF841C] text-white px-4 py-2 rounded">
            1
          </button>
          <button>
            <img src="/asset/Group 12367.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsTable;
