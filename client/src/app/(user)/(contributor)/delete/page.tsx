"use client";
import { useAppSelector } from "@/app/redux/hooks";
import instance from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

type PostData = {
  _id: string;
  previewImageUrl: string;
  title: string;
  category: string[];
  publishedDate: string;
  description: string;
  status: string;
};

const Page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const user =
    useAppSelector((state: any) => state.contributor.currentUser) || {};

  useEffect(() => {
    fetchAllPosts();
  }, [user]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, posts]);

  const fetchAllPosts = async () => {
    try {
      const response = await instance.post("/post/contributor/postForCreator", {
        ids: user?.posts,
      });
      console.log("All posts:", response.data.posts);

      // Filter only published posts
      const deletedftPosts = response.data.posts.filter(
        (post: PostData) => post.status.toLowerCase() === "deleted"
      );
      setPosts(deletedftPosts);
      setFilteredPosts(response.data.posts);
    } catch (error: any) {
      console.error(
        "Error fetching all posts:",
        error.response?.data || error.message
      );
    }
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Get current posts for pagination
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md  w-full border border-[#28272D]">
      {filteredPosts.length ? (
        <div>
          <div>
            <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D] ">
              <div className="flex gap-2 items-center">
                <img
                  src="/asset/Group 12856.svg"
                  alt=""
                  className="h-10 w-10"
                />
                <h1 className="text-white text-xl font-semibold">
                  Deleted Blog
                </h1>
              </div>
              <button className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded">
                + Add New Post
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex justify-between items-center mb-4 px-8">
              <div className="relative border border-neutral-600 rounded flex justify-between">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0A090F] text-[#7B7A7F] w-80 px-4 py-2 rounded border-none focus:outline-none"
                />
                <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
                  <IoSearchOutline className="h-6 w-6" />
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <p>View</p>
                <select
                  className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
                  value={postsPerPage}
                  onChange={(e) => setPostsPerPage(Number(e.target.value))}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 px-8 py-4 border">
              {currentPosts.map((post) => (
                <div
                  key={post._id}
                  className="cursor-pointer rounded-xl border border-neutral-700 overflow-hidden bg-[#000000]"
                  onClick={() => router.push(`/dashboard/${post._id}`)}
                >
                  <img
                    loading="lazy"
                    src={post?.previewImageUrl}
                    className="h-44 w-full object-cover"
                    alt={post.title}
                  />
                  <div className="flex gap-2 items-center p-4">
                    <button className="bg-[#DF841C] py-0.5 px-3 text-sm  text-[#230E00] font-semibold">
                      {post.category.join(", ")}
                    </button>
                    <p className="text-sm text-neutral-400">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="px-4">
                    <h1 className="text-lg font-semibold text-white line-clamp-2 ">
                      {post.title}
                    </h1>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2 items-center mb-4">
                        <p className="text-[#767676]">Status:</p>
                        <span className="text-red-500">Deleted</span>
                      </div>
                      <BsThreeDots className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 px-8">
            <div className="text-[#7B7A7F]">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredPosts.length)} of{" "}
              {filteredPosts.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <img
                  src="/asset/Group 12367.svg"
                  alt="Previous"
                  className="transform rotate-180"
                />
              </button>
              {[
                ...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys(),
              ].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === number + 1
                      ? "bg-[#DF841C] text-white"
                      : "text-[#7B7A7F]"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredPosts.length / postsPerPage)
                }
              >
                <img src="/asset/Group 12367.svg" alt="Next" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[38rem] justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="/asset/blog.svg" alt="" />
            <h1 className="text-[#999999] font-semibold text-2xl">
              No Deleted posts created by you
            </h1>
            <button
              onClick={() => router.push("/add-post")}
              className="bg-[#DF841C] py-1 px-4 rounded-lg text-white"
            >
              Create a post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
