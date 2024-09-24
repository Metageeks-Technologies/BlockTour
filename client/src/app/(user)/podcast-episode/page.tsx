"use client";
import React, { useEffect, useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getAllPosts } from "@/app/redux/feature/posts/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiMicrophone } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "@/components/Footer";
import instance from "@/utils/axios";
import HtmlContent from "@/components/HtmlContent";
import { useRouter } from "next/navigation";

type CardData = {
  id: number;
  imgSrc: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

export interface NewsItem {
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
  embededCode: string;
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
  const [data, setData] = useState<NewsItem[]>([]);
  const router = useRouter();

  const fetchPostCast = async () => {
    try {
      const response = await instance.get("/podcast/all-podcasts");
      console.log("podcast", response);
      setData(response.data.podcasts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostCast();
  }, []);

  return (
    <div className="lg:ml-52">
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-lg font-semibold">Podcast Episodes</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mt-2 ">
          {data.slice(0, 4).map((post, index) => (
            <div
              key={post._id}
              className="cursor-pointer rounded-xl border border-[#17161B] overflow-hidden bg-[#0A090F] pb-4"
            >
              <div className="relative">
                {/* <img
                  loading="lazy"
                  src={post.imgSrc}
                  alt={post.title}
                  className="w-full h-44 object-cover rounded-t-md"
                /> */}
                <HtmlContent htmlContent={post?.embededCode || ""} />
                {index === 0 || index === 3 ? (
                  <>
                    <div className="absolute -bottom-2.5 left-4 bg-[#DF841C] flex gap-1 px-2 py-0.5 rounded items-center">
                      <BsLightningChargeFill />
                      <p className="text-xs">Early Access</p>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="px-4 py-2 mt-2">
                <p className="text-xs text-[#767676] font-semibold">Podcast</p>
              </div>
              <div className="px-4">
                <h1 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2">
                  {post.title}
                </h1>
                <p className="text-sm mt-0.5 text-[#999999] line-clamp-2">
                  {post.permaLink}
                </p>
                <p className="mt-2 text-[#767676]"> 2 days ago</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0A090F] text-white p-14 rounded-lg mt-5 border border-[#17161B]">
          <div className="flex justify-between gap-14 items-center">
            {/* Left Section */}
            <div className=" w-full">
              <h2 className="text-2xl font-bold mb-2">
                Get notified of latest episodes and articles
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

        <div className=" mx-auto mt-5">
          {data.map((newsItem, index) => (
            <div
              key={index}
              className="bg-[#0A090F] cursor-pointer border border-[#17161B] p-5 rounded-lg shadow-lg flex space-x-5 mb-5"
              onClick={() => {
                router.push(`/podcast-episode/${newsItem._id}`);
              }}
            >
              <HtmlContent htmlContent={newsItem?.embededCode || ""} />

              <div className="flex-1">
                <p className="text-sm text-[#858585]">
                  Published in{" "}
                  {new Date(newsItem?.publishedDate).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-bold mb-2 mt-2 text-[#CCCCCC]">
                  {newsItem.title}
                </h3>
                <p className="text-sm text-[#B0AFAF] mb-3">
                  {newsItem.permaLink}
                </p>

                {/* <div className="flex items-center space-x-4 text-sm mt-3">
                  <div className=" bg-[#1F1C2C] flex gap-1 px-2 py-0.5 rounded items-center">
                    <BsLightningChargeFill />
                    <p className="text-xs">Early Access</p>
                  </div>
                  <div className=" bg-[#1F1C2C] flex gap-1 px-2 py-0.5 rounded items-center">
                    <PiMicrophone />
                    <p className="text-xs">Podcast</p>
                  </div>
                </div> */}

                <div className="flex gap-3 mt-3 text-[#999999]">
                  {newsItem?.category.map((cat, index) => (
                    <button
                      key={index}
                      className=" py-0.5 px-4 bg-[#1F1C2C] border border-[#17161B] text-[#CCCCCC] text-xs rounded"
                    >
                      {cat}
                    </button>
                  ))}
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
