"use client";
import { getAdminAuthor } from "@/app/redux/feature/admin/api";
import { getAuthor, getCurrentUser } from "@/app/redux/feature/contributor/api";
import { useAppSelector } from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import instance from "@/utils/axios";
import { formatDateTime } from "@/utils/DateFormat";
import Cookies from "js-cookie";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface PodcastEpisode {
  _id: string;
  title?: string;
  // createdAt?:number;
  permaLink: string;
  embededCode: string;
  publishedDate: string;
  status: string;
  tags: string[];
  category: string[];
  postType: string;
  visibility: string;
  authorName: string;
  authorId: string;
  creatorId: string;
  createdAt: string;
}

const page = ({ params }: { params: { id: string } }) => {
  const [podcast, setPodcast] = useState<PodcastEpisode | null>( null );
  const [email, setEmail] = useState<string>( "" );
  const [emailError, setEmailError] = useState<string>( "" );
  const termsCheckboxRef = useRef<HTMLInputElement>( null );
  const author = useAppSelector( ( state: any ) => state.contributor?.author || state.superAdmin?.author ); 
  const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (podcast) {
      if (podcast.creatorId) {
        // dispatch( getAuthor( podcast.creatorId ) );
        getAuthor(dispatch, podcast.creatorId);
      } else if (podcast.authorId) {
        // dispatch( getAdminAuthor( podcast.authorId ) );
        getAdminAuthor(dispatch, podcast.authorId);
      }
    }
  }, [dispatch, podcast]);

  const { id } = params;
  console.log("podcars", podcast);

  const fetchPodcast = async () => {
    try {
      const response = await instance.get(`/podcast/podcasts/${id}`);
      console.log("Fetched post data:", response.data);

      setPodcast(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPodcast();
    }
    if ( Cookies.get( "UserToken" ) && !user ) {
      getCurrentUser( dispatch );
    }
  }, [id, dispatch] );
  
  const validateEmail = ( email: string ) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test( email );
  };

  const handleEmailChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const newEmail = e.target.value;
    setEmail( newEmail );
    if ( newEmail && !validateEmail( newEmail ) ) {
      setEmailError( "Please enter a valid email address" );
    } else {
      if ( termsCheckboxRef.current?.checked ) {
        setEmailError( "" );
      } else {
        setEmailError( "Please agree to the Terms and Conditions and Privacy Policy" );
      }
    }
  };
  const CreateSubscriber = async () => {
  try {
      const response = await instance.post( '/subscriber/subscribers', {email} );
      alert( `${response.data.message || "Subscribed Successfully"}` );
      setEmail( "" ); 
    } catch ( error: any ) {
      console.error( error );
      alert( `${error.response.data.message || "There is some error in creating subscriber"}` );
      setEmailError( "" );
    }
  };

  return (
    <div className="lg:ml-52">
      {/* <Navbar/> */}
      <div className="flex overflow-hidden flex-col items-center pb-6 bg-black  md:px-12 ">
        <div className="flex ">
          <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full md:pr-8 self-start">
            <div className="flex flex-col w-[85%] m-auto">
              <div className="py-12">
                <div className="w-full h-auto">
                  <HtmlContent htmlContent={podcast?.embededCode || ""} />
                </div>

                <p className="text-lg text-[#DF841C] text-center mt-4">
                  Podcast
                </p>

                <h1 className="mt-2 w-[80%] m-auto text-center lg:text-3xl md:text-2xl text-2xl font-medium text-[#BBBBBB] ">
                  {podcast?.title}
                </h1> 

                <p className="text-center mt-2 text-[#999999]">
                  {podcast?.permaLink}
                </p>

                <div className="flex  justify-center gap-3 mt-3 text-[#999999]">
                  {podcast?.category.map((cat, index) => (
                    <button
                      key={index}
                      className=" py-1.5 px-6 bg-[#0A090F] border border-[#17161B] rounded"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-[#999999] text-center">
                  {formatDateTime(podcast?.createdAt ?? "No date available")}
                </div>
              </div>

              {/* <div className=" flex justify-between items-center py-8">
                <div className="flex gap-2.5 items-center text-sm font-bold leading-none ">
                  <img
                    loading="lazy"
                    srcSet={author?.profileImage}
                    className=" rounded-full object-cover h-12 w-12 "
                  />
                  <div className="flex flex-col gap-y-2 grow shrink-0 my-auto basis-0 w-fit">
                    <div className="flex gap-2.5 self-start">
                      <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
                        {podcast?.category.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-7 w-7 bg-[#1C1C1D] hover:bg-[#232324] flex justify-center items-center  rounded-full">
                  <IoBookmarkOutline className="h-4 w-4 cursor-pointer text-neutral-400" />
                </div>
              </div> */}
            </div>
          </div>

          {/* left */}
          <div className="flex flex-col ml-5 lg:w-[30%] md:w-[35%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-10 py-4">
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
              {user &&
                <div className="  flex items-center justify-between py-6">
                  <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg" onClick={() => {
                    router.push("/auth/user/signup");
                  }}>
                    Join for free
                  </button>
                  <p className="text-lg hover:underline" onClick={() => {
                    router.push("/auth/user/login");
                  }}>Sighn In</p>
                </div>
              }

              {/* <div className="mt-5">
                <p className="text-[#999999] mb-2">In this article</p>
                <div className="flex gap-3">
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">
                    What to Expect
                  </button>
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">
                    Polkadot
                  </button>
                </div>
              </div> */}

              {/* Sponership */}

              <div className="h-60 w-full border p-10 border-[#17161B] mt-6 bg-[#0A090F] rounded flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="/asset/Block-logo.svg"
                    alt=""
                    className="h-14 w-20"
                  />
                  <h1 className="text-center text-lg font-semibold text-[#CCCCCC] p-4">
                    Published in <span className="text-[#F7931A]">The Monday Podcast</span> 
                  </h1>
                  <p className="text-sm text-center text-[#999999]">
                    Monday show hosted by Ryan and David. The major episode of
                    the week, Consistently the biggest names.
                  </p>
                </div>
              </div>

              {/* listen on */}

              {/* <div className="flex flex-col gap-3 mt-6">
               <button className="flex gap-2 items-center text-[#999999] w-full py-2 rounded justify-center border border-[#17161B] bg-[#0A090F]">
               <img src="/asset/sofify.svg" alt="" />
                Listen on <span className="font-semibold">Spotify</span>
                </button>
                <button className="flex gap-2 items-center text-[#999999] w-full py-2 rounded justify-center border border-[#17161B] bg-[#0A090F]">
               <img src="/asset/Apple.svg" alt="" />
                Listen on <span className="font-semibold">Apple Podcasts</span>
                </button>
                <button className="flex gap-2 items-center text-[#999999] w-full py-2 rounded justify-center border border-[#17161B] bg-[#0A090F]">
               <img src="/asset/suscribe.svg" alt="" />
               Subscribe via  <span className="font-semibold">RSS</span>
                </button>
                <button className="flex gap-2 items-center text-[#999999] w-full py-2 rounded justify-center border border-[#17161B] bg-[#0A090F]">
               <img src="/asset/more.svg" alt="" />
               View More
                </button>
              </div> */}

              <div className=" h-[32rem] sticky top-0 rounded-lg mt-8  flex justify-center items-center bg-[#0A090F]">
                <div className="flex flex-col gap-8 px-12 ">
                  <div className=" flex items-center justify-center">
                    <img
                      src="/asset/Block-logo.svg"
                      alt=""
                      className="w-38 h-14 object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-semibold  text-center">
                    Level up on crypto, daily
                  </h1>

                  <div className="flex flex-col gap-4">
                    <p className="text-[#ADADAD] text-center">
                      oin the world’s most popular crypto community with daily
                      alpha, news, & analysis, all free.
                    </p>
                    <input
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={handleEmailChange}
                      className={`bg-[#1F1C2C] border ${emailError ? 'border-red-500' : 'border-[#474457]'
                        } text-white py-3.5 px-5 rounded-lg w-full focus:outline-none`}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm my-1 whitespace-nowrap absolute">{emailError}</p>
                    )}

                    <button  className="py-4 px-12 bg-red-600 hover:bg-red-500 rounded-3xl"
                    disabled={ !email || !!emailError}
                    onClick={CreateSubscriber}
                    >
                      Join for free
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-5 lg:ml-52 bg-[#0A090F] rounded-lg">
        <div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
          <div className="w-[90%] m-auto  flex justify-between py-10 text-[#FFFCFC99]">
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-semibold ">Get connected</h1>

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
              <h1 className="text-3xl pb-2 font-semibold text-[#FFFFFF]">
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

        <Footer/>
      </div> */}

      <Footer />
    </div>
  );
};

export default page;
