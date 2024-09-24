"use client";
import { getAllPosts } from "@/app/redux/feature/posts/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

type CardData = {
  id: number;
  imgSrc: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

export interface Post {
  _id: string;
  title: string;
  description: string;
  permaLink: string;
  postSliderImageUrl: string[];
  previewImageUrl: string;
  status: string;
  publishedDate: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  category: string[];
  postType: string;
}

const Data: CardData[] = [
  {
    id: 1,
    imgSrc:
      "https://th.bing.com/th/id/OIP.z3sB2e7za5LbZUVMsQKlwwHaEK?rs=1&pid=ImgDetMain",
    title: "The Bankless Guide to Sonic",
    category: "Articles",
    date: "May 29, 2024",
    description: "Sonic Explained: A Beginner's Guide to Sonic (prev. Fantom)",
  },
  {
    id: 2,
    imgSrc:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/fwmsu8gp4vnh504yfbnl.jpg",
    title: "Judge Tosses Consensys Suit Against SEC",
    category: "News",
    date: "May 17, 2024",
    description:
      "Consensys was seeking regulatory clarity around its MetaMask wallet offerings and ETH's security status.",
  },
  {
    id: 3,
    imgSrc:
      "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
    title: "'Vitalik: An Ethereum Story' Documentary Debuts Onchain ",
    category: "News",
    date: "july 29, 2024",
    description:
      "The new documentary provides an intimate portrait of the Ethereum founder.",
  },
  {
    id: 2,
    imgSrc:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/fwmsu8gp4vnh504yfbnl.jpg",
    title: "Judge Tosses Consensys Suit Against SEC",
    category: "News",
    date: "May 17, 2024",
    description:
      "Consensys was seeking regulatory clarity around its MetaMask wallet offerings and ETH's security status.",
  },
];

const page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const posts = useAppSelector((state) => state.post.posts);
  console.log("Posts:-", posts);
  useEffect(() => {
    getAllPosts(dispatch);
  }, []);

  return (
    <div className="lg:ml-52 m-4 w-full">
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-lg font-semibold">Article</h1>
        <div className="relative border border-[#28272D] rounded flex justify-between">
          <input
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={( e ) => setSearchQuery( e.target.value )}
            className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
          />
          <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="px-4">
        <h1 className="text-lg font-semibold text-[#999999]">Trending</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mt-4 ">
          {posts.slice(0, 4).map((post) => (
            <div
              key={post._id}
              className="cursor-pointer rounded-xl border border-[#17161B] overflow-hidden bg-[#0A090F] pb-4"
              // onClick={() => router.push( `/dashboard/${post.id}` )}
            >
              <img
                loading="lazy"
                src={post.previewImageUrl}
                alt={post.title}
                className="w-full h-44 object-cover rounded-t-md"
              />

              <div className="flex gap-2 items-center px-4 py-2 mt-2">
                {post?.category && post.category.length > 0 && (
                  <span className="bg-[#DF841C] line-clamp-1 py-0.5 px-3 text-sm text-[#230E00] font-semibold">
                    {post.category[0] ?? "No Category"}{" "}
                  </span>
                )}
                

                <span className="text-[#767676]">
                  {post?.publishedDate
                    ? new Date(post.publishedDate).toLocaleDateString()
                    : "No date available"}
                </span>
              </div>

              <div className="px-4">
                <h1 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2 leading-[1.4]">
                  {post.title}
                </h1>

                <div
                  className="text-sm text-[#B0AFAF] mt-2 mb-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0A090F] text-white p-14 rounded-lg mt-5 border border-[#17161B]">
          <div className="flex justify-between gap-12 items-center">
            {/* Left Section */}
            <div className="w-full ">
              <h2 className="text-2xl font-bold mb-2">
                Level up on Crypto in 3 Mins
              </h2>
              <p className="text-[#999999]">
                Join the world’s most popular crypto community with daily alpha,
                news, & analysis, all free.
              </p>
            </div>

            {/* Right Section */}
            <div className="w-full">
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-[#1F1C2C] border border-[#474457] text-white py-3.5 px-5 rounded-lg  w-full sm:w-96 focus:outline-none"
                />
                <button className="bg-orange-500 text-white px-10 py-3.5 rounded-lg hover:bg-orange-600 transition">
                  Join for Free
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-center mt-4">
                <input type="checkbox" id="agree" className="mr-2" />
                <label htmlFor="agree" className="text-gray-400 text-sm">
                  By joining, I agree to the Blockbar{" "}
                  <a href="#" className="underline text-gray-300">
                    Terms and Privacy
                  </a>{" "}
                  statements.
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Browse all articles</h1>

            <div className="flex gap-2 items-center">
              <p>View</p>
              <select
                className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
                // value={postsPerPage}
                // onChange={( e ) => setPostsPerPage( Number( e.target.value ) )}
              >
                <option>Most Recent</option>
                <option>Trending</option>
                <option>Most Popular</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          <div className="flex gap-5 py-4 border-b border-[#17161B] text-[#999999]">
            <p className="hover:text-white cursor-pointer">Crypto</p>
            <p className="hover:text-white cursor-pointer">Blockchain</p>
            <p className="hover:text-white cursor-pointer">NFT</p>
            <p className="hover:text-white cursor-pointer">Press Release</p>
          </div>
        </div>

        <div className="mx-auto mt-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#0A090F] cursor-pointer p-5 rounded-lg shadow-lg flex space-x-5 mb-4 border border-[#17161B]"
              onClick={() => {
                router.push(`/detail-page/${post._id}`);
              }}
            >
              {/* Display the preview image */}
              <img
                src={post.previewImageUrl}
                alt="Thumbnail"
                className="w-44 h-36 object-cover"
              />
              <div className="flex-1">
                <p className="text-[#858585] text-sm">
                  Written by{" "}
                  <span className="font-semibold">{post.authorName}</span>
                </p>
                <h3 className="text-xl font-bold mb-2 mt-2 text-[#CCCCCC]">
                  {post.title}
                </h3>
                <div
                  className="text-sm text-[#B0AFAF] mb-3 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
                <div className="flex items-center space-x-4 text-sm">
                  {post?.category && post.category.length > 0 && (
                    <span className="bg-[#DF841C] text-[#000000] font-semibold px-2 py-0.5 rounded">
                      {post.category[0] ?? "No Category"}{" "}
                    </span>
                  )}
                  <span className="text-[#767676]">
                    {post?.publishedDate
                      ? new Date(post.publishedDate).toLocaleDateString()
                      : "No date available"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
        <div className="w-[90%] m-auto  flex justify-between py-10 text-[#FFFCFC99]">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-[#FFFFFF]">
              Get connected
            </h1>

            <div className="flex gap-3">
              <div className="w-10 cursor-pointer h-10 border border-[#666666] rounded-full flex justify-center items-center">
                <FaLinkedin className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaXTwitter className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaFacebookSquare className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <IoLogoYoutube className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="text-3xl text-[#FFFFFF] pb-3">
              Receive your daily crypto update
            </h1>
            <div className="flex items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-[#1F1C2C] border border-[#474457] text-white py-3.5 px-5 rounded-lg  w-full sm:w-96 focus:outline-none"
              />
              <button className="bg-orange-500 text-white px-10 py-3.5 rounded-lg hover:bg-orange-600 transition">
                Join for Free
              </button>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-center mt-4">
              <input type="checkbox" id="agree" className="mr-2" />
              <label htmlFor="agree" className="text-gray-400 text-sm">
                By joining, I agree to the Blockbar{" "}
                <a href="#" className="underline text-gray-300">
                  Terms and Privacy
                </a>{" "}
                statements.
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
