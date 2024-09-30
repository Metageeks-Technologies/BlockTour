"use client";
import instance from "@/utils/axios";
import {formatDateTime} from "@/utils/DateFormat";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
  posts: any[];
  date: string;
  contributor: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredPosts, setFilteredPosts] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
  const [currentPage, setCurrentPage] = useState<number>(1);

  const router = useRouter(); 

  // Fetch all users
  const fetchAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("auth/user/");
      console.log("response", response);
      setUsers(response?.data?.users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterPosts();
  }, [users, searchTerm, sortBy]);

  const filterPosts = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    }); 
    setFilteredPosts(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D] ">
        <h1 className="text-white text-xl font-semibold">Contributor</h1>
      </div>

      <div className="border-b border-[#17161B] mt-8 mb-4 flex items-center gap-8 px-8 font-semibold ">
        <p className="text-[#7B7A7F] mb-1 cursor-pointer">Contributor</p>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 px-8">
          <button className="bg-[#2E2E3E] text-white px-4 py-2 rounded">Apply</button>
          <div className="flex gap-2 items-center">
            <p>Sort by</p>
            <select
              className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)} // Update sortBy state
            >
              <option value="date">Date created</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="relative border border-neutral-600 rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-[#0A090F] text-[#7B7A7F] px-4 py-2 rounded border-none focus:outline-none"
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center px-4">
          <p>View</p>
          <select className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded" value={itemsPerPage} onChange={( e ) => setItemsPerPage( Number( e.target.value ) )} >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="pt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#DF841C" size={50} />
          </div>
        ) : (
          <table className="w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
            <thead>
              <tr className="bg-[#0A090F] border-b border-[#28272D] text-white">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Posts</th>
                <th className="py-3 px-4">Contributor</th>
                <th className="py-3 px-4">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over currentItems (not filteredPosts) */}
                {currentItems.map( ( user ) => (
                  <tr
                    key={user._id}
                    className="border-b text-center border-[#28272D] hover:bg-[#28272D] cursor-pointer"
                    onClick={() => router.push( `/admin/contributor/${user._id}` )}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.posts.length}</td>
                    <td className="py-3 px-4">{user.contributor ? "Yes" : "No"}</td>
                    <td className="py-3 px-4">
                      {formatDateTime(user.createdAt)}
                      {/* {new Date( user.createdAt ).toLocaleDateString()} */}
                    </td>
                  </tr>
                ) )}

            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-8">
        <div className="text-[#7B7A7F]">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPosts.length)} of {filteredPosts.length} entries
        </div>
        <div className="flex space-x-2">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            <img src="/asset/Group 12367.svg" alt="Previous"  />
          </button>
          {[...Array(Math.ceil(filteredPosts.length / itemsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
            >
              {number + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / itemsPerPage)}>
            <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
