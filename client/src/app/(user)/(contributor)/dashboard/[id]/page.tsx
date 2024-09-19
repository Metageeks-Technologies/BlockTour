"use client";
import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  permaLink: string;
  description: string;
  postSettingImageUrl: string;
  postSliderImageUrl: string[];
  previewImageUrl: string;
  publishedDate: string;
  status: string;
  tags: string[];
  category: string[];
  postType: string;
  visibility: string;
  authorName: string;
  creatorId: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);

  const { id } = params;

  // Get data by id function
  const fetchPost = async () => {
    try {
      const response = await instance(`/post/contributor/post/${id}`);
      if (response.data.success) {
        setPost(response.data.post);
        console.log("Fetched post data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return (
      <div className="lg:ml-64 bg-[#0A090F] px-8 py-8 text-white m-4 rounded-2xl w-full border border-[#28272D]">
        <div className="flex gap-2 items-center">
          <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
          <h1 className="text-[#999999] font-semibold text-2xl">
            Blog Details
          </h1>
        </div>
        {/* no blog found */}
        <div className="flex flex-col mt-5 px-28">
          <h1 className="mt-5 lg:text-4xl md:text-2xl text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full line-clamp-2">
            No Blog Found for this id
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 bg-[#0A090F] sm:m-4 sm:my-4 my-2 text-white  sm:rounded-2xl w-full border border-[#28272D]">

      <div className="flex items-center mb-4 sm:px-8 px-4 py-4 border-b border-[#28272D] ">
        <div className="flex gap-2 items-center">
          <img src="/asset/Group 12856.svg" alt="" className="h-8 w-8" />
          <h1 className="text-white text-xl font-semibold">Blog Details</h1>
        </div>
      </div>
      <div className="flex flex-col mt-5 lg:px-28 sm:px-8 px-4">
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="sm:mt-2 lg:text-3xl md:text-2xl text-2xl font-medium text-white  max-md:max-w-full line-clamp-2">
            {post.title}
          </h1>

          <div className=" flex mt-1 flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3">
              <img
                loading="lazy"
                src="https://th.bing.com/th/id/R.c6ce4ef394413869bb06283db819c628?rik=dsxV%2b0CdNNsOmA&riu=http%3a%2f%2fsfsco.net%2fwp-content%2fuploads%2f2016%2f04%2f6140989632_1c8066563d_b.jpg&ehk=uLWHPAmp35gMcoEmYFZKjh1wg8vpPdCZcGGtPh72e7w%3d&risl=&pid=ImgRaw&r=0"
                alt={post.authorName}
                className="w-14 h-14 object-cover rounded-full"
              />
              <div className="text-sm text-neutral-400 py-4">
                <div className="flex gap-2 items-center">
                <button className="bg-[#DF841C] py-0.5 px-3 my-0.5 text-[#230E00] font-semibold text-sm">
                  {post.category.join(", ")}
                </button>
                <p className="text-sm text-neutral-400">
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </p>
                </div>
                <p className="font-medium text-neutral-400">
                  <span className="text-neutral-400">By:</span>{" "}
                  {post.authorName || "Unknown Author"}
                </p>
              </div>
            </div>
          </div>

          {/* Preview image */}
          <img
            loading="lazy"
            src={post.previewImageUrl}
            alt={post.title}
            className="w-full object-cover rounded mt-4"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <div
            className="text-neutral-400 mt-3"
            dangerouslySetInnerHTML={{ __html: post.description || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
