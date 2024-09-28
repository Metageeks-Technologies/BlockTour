"use client";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {BsLightningChargeFill} from "react-icons/bs";
import {FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import {getAllPosts} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {IoLogoYoutube} from "react-icons/io";
import {IoSearchOutline} from "react-icons/io5";
import {PiMicrophone} from "react-icons/pi";
import {FaXTwitter} from "react-icons/fa6";
import Footer from "@/components/Footer";
import instance from "@/utils/axios";
import HtmlContent from "@/components/HtmlContent";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/app/redux/feature/category/api";

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

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PodcastPage />
    </Suspense>
  );
};

const PodcastPage = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<NewsItem[]>( [] );
  const [isLoading, setIsLoading] = useState( true );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState( "All" );
  const [email, setEmail] = useState<string>( "" );
  const [emailError, setEmailError] = useState<string>( "" );
  const [isTermsAndPrivacy, setIsTermsAndPrivacy] = useState<boolean>( false );
  const termsCheckboxRef = useRef<HTMLInputElement>( null );

  const categories = useAppSelector( ( state ) => state.category.categories );
  const category = searchParams.get( "category" );

  console.log( "cat", categories );
  const fetchPostCast = async () => {
    try {
      setIsLoading( true );
      const response = await instance.get( "/podcast/all-podcasts" );
      console.log( "podcast", response );
      setData( response.data.podcasts );
      setIsLoading( false );

    } catch ( error ) {
      console.log( error );
    }
  };

  useEffect( () => {
    const categoryFromUrl = category?.replace( /-/g, ' ' );
    setActiveCategory( categoryFromUrl || "All" );
    if ( categories.length === 0 ) {
      getAllCategories( dispatch );
    }
    fetchPostCast();

    if ( categoryFromUrl?.toLowerCase() === 'all' ) {
      router.replace( '/podcast-episode' );
    }
  }, [dispatch, searchParams, router, categories.length, category] );

  const filteredPosts = activeCategory.toLowerCase() === "all"
    ? data
    : data.filter( ( post ) =>
      post.category &&
      post.category.some( ( cat: string ) =>
        cat.toLowerCase().includes( activeCategory.toLowerCase() )
      )
    );

  const handleCategoryClick = ( category: string ) => {
    setActiveCategory( category );
    if ( category.toLowerCase() === 'all' ) {
      router.replace( '/podcast-episode' );
    } else {
      router.replace( `/podcast-episode?category=${category.toLowerCase().replace( / /g, "-" )}` );
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {/* Trending section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-700 rounded-xl h-80"></div>
        ))}
      </div>

      {/* Newsletter skeleton */}
      <div className="bg-gray-700 h-48 rounded-lg mt-5"></div>

      {/* Browse all articles skeleton */}
      <div className="mt-6">
        <div className="h-8 bg-gray-700 w-1/3 rounded"></div>
        <div className="flex gap-5 py-4 mt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-6 bg-gray-700 w-20 rounded"></div>
          ))}
        </div>
      </div>

      {/* Article list skeleton */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-gray-700 h-40 rounded-lg mt-4"></div>
      ))}
    </div>
  );

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
    if ( !isTermsAndPrivacy ) {
      alert( "Please agree to the Terms and Conditions and Privacy Policy" );
      termsCheckboxRef.current?.focus();
      return;
    }

    try {
      const response = await instance.post( '/subscriber/subscribers', {email} );
      alert( `${response.data.message || "Subscribed Successfully"}` );
      setEmail( "" );
      setIsTermsAndPrivacy( false );
    } catch ( error: any ) {
      console.error( error );
      alert( `${error.response.data.message || "There is some error in creating subscriber"}` );
      setEmailError( "" );
    }
  };

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
        <h1 className="text-lg font-semibold text-[#999999]">Latest</h1>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mt-2 ">
              {filteredPosts.length > 0 ? (
                filteredPosts.slice( 0, 4 ).map( ( post, index ) => (
              <div
                key={post._id}
                className="cursor-pointer rounded-xl border group border-[#17161B] overflow-hidden bg-[#0A090F] pb-4"
                onClick={() => {
                  router.push( `/podcast-episode/${post.permaLink}` );
                }}
              >
                <div className="relative"> 
                  <HtmlContent htmlContent={post?.embededCode || ""} /> 
                </div>

                <div className="px-4 py-2 mt-2">
                  <p className="text-xs text-[#767676] font-semibold">
                    Podcast
                  </p>
                </div>
                <div className="px-4">
                  <h1 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2 group-hover:text-[#DF841C]">
                    {post.title}
                  </h1>
                  <p className="text-sm mt-0.5 text-[#999999] line-clamp-2 capitalize">
                    {post.permaLink.split("-").join(" ")}
                  </p>
                  <p className="mt-2 text-[#767676]"> 2 days ago</p>
                </div>
              </div>
                ) ))
                :
                // same skeleton with no data found for this category
                <div className="bg-gray-700 h-40 rounded-lg mt-4 flex justify-center items-center col-span-4">
                  <p className="text-center text-gray-500 text-lg justify-center items-center flex">No podcasts found for this category</p>
                </div>
          }
          </div>
        )}


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
                <div className="relative w-full sm:w-96">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={`bg-[#1F1C2C] border ${emailError ? 'border-red-500' : 'border-[#474457]'
                      } text-white py-3.5 px-5 rounded-lg w-full focus:outline-none`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm my-1 whitespace-nowrap absolute">{emailError}</p>
                  )}
                </div>
                <button
                  className="bg-orange-500 whitespace-nowrap text-white px-10 py-3.5 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg hover:bg-orange-600 transition"
                  disabled={isLoading || !email || !!emailError}
                  onClick={CreateSubscriber}
                >
                  Join for Free
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-center mt-8">
                <input type="checkbox" id="agree" className="mr-2 focus:outline-1" ref={termsCheckboxRef} onChange={() => {
                  setIsTermsAndPrivacy( !isTermsAndPrivacy );
                  handleEmailChange( {target: {value: email}} as React.ChangeEvent<HTMLInputElement> );
                }} />
                <label htmlFor="agree" className="text-gray-400 text-sm">
                  By joining, I agree to the Blockbar{" "}
                  <a href="/terms-and-conditions" className="underline text-gray-300">
                    Terms and Conditions
                  </a>{" "}
                  <a href="/privacy-policy" className="underline text-gray-300">
                    Privacy Policy
                  </a>{" "}
                  statements.
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Browse all episodes</h1>

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
        </div>

        <div className="sticky top-0 bg-black">
          <div className="flex items-center gap-5 py-4 border-b border-[#17161B] text-[#999999]">
            <p
              className={`hover:text-white cursor-pointer ${activeCategory.toLowerCase() === "all" ? "text-white font-semibold" : ""
                }`}
              onClick={() => handleCategoryClick( "All" )}
            >
              All
            </p>
            {categories.map( ( category: any ) => (
              <p
                key={category._id}
                className={`hover:text-white cursor-pointer ${activeCategory.toLowerCase() === category.name.toLowerCase()
                    ? "text-white font-semibold"
                    : ""
                  } bg-[#0A090F] py-1.5 px-4 border border-[#17161B] rounded`}
                onClick={() => handleCategoryClick( category.name )}
              >
                {category.name.charAt( 0 ).toUpperCase() + category.name.slice( 1 )}
              </p>
            ) )}
          </div>
        </div>

        <div className=" mx-auto mt-5">
          {
            filteredPosts.length > 0 ? (
            filteredPosts.map( ( newsItem, index ) => (
            <div
              key={newsItem._id}
              className="bg-[#0A090F] group cursor-pointer border border-[#17161B] p-5 rounded-lg shadow-lg flex space-x-5 mb-5"
              onClick={() => {
                router.push( `/podcast-episode/${newsItem.permaLink}` );
              }}
            >
              <HtmlContent htmlContent={newsItem?.embededCode || ""} />

              <div className="flex-1">
                <p className="text-sm text-[#858585]">
                  Published in{" "}
                  {new Date( newsItem?.publishedDate ).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-bold mb-2 mt-2 text-[#CCCCCC] group-hover:text-[#DF841C]">
                  {newsItem.title}
                </h3>
                <p className="text-sm text-[#B0AFAF] mb-3 capitalize">
                  {newsItem.permaLink.split( "-" ).join( " " )}
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
                  {newsItem?.category.map( ( cat:any ) => (
                    <button
                      key={cat._id}
                      className=" py-0.5 px-4 bg-[#1F1C2C] border border-[#17161B] text-[#CCCCCC] text-xs rounded"
                    >
                      {cat}
                    </button>
                  ) )}
                </div>
              </div>
            </div>
          ) ))
            :
            // same skeleton with no data found for this category
            <div className="bg-gray-700 h-40 rounded-lg mt-4 flex justify-center items-center col-span-4">
              <p className="text-center text-gray-500 text-lg justify-center items-center flex">No podcasts found for this category</p>
            </div>
          }
        </div>
      </div>

      {/* <div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
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

          < className="">
            <h1 className="text-3xl text-[#FFFFFF] pb-3">
              Receive your daily crypto update
            </h1>

            <div className="flex items-center gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`bg-[#1F1C2C] border ${emailError ? 'border-red-500' : 'border-[#474457]'
                    } text-white py-3.5 px-5 rounded-lg w-full focus:outline-none`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm my-1 whitespace-nowrap absolute">{emailError}</p>
                )}
              </div>
              <button
                className="bg-orange-500 whitespace-nowrap text-white px-10 py-3.5 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg hover:bg-orange-600 transition"
                disabled={isLoading || !email || !!emailError}
                onClick={CreateSubscriber}
              >
                Join for Free
              </button>
            </div>

            {/* Terms and Privacy */}
      {/* <div className="flex items-center mt-8">
        <input type="checkbox" id="agree" className="mr-2 focus:outline-1" ref={termsCheckboxRef} onChange={() => {
          setIsTermsAndPrivacy( !isTermsAndPrivacy );
          handleEmailChange( {target: {value: email}} as React.ChangeEvent<HTMLInputElement> );
        }} />
        <label htmlFor="agree" className="text-gray-400 text-sm">
          By joining, I agree to the Blockbar{" "}
          <a href="/terms-and-conditions" className="underline text-gray-300">
            Terms and Conditions
          </a>{" "}
          <a href="/privacy-policy" className="underline text-gray-300">
            Privacy Policy
          </a>{" "}
          statements.
        </label>
      </div>  */}

<div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
        <div className="w-[90%] m-auto  flex justify-between py-10 text-[#FFFCFC99]">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-[#FFFFFF]">
              Get connected
            </h1>

            <div className="flex gap-3">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/blocktourmedia" target="_blank" rel="noopener noreferrer">
                <div className="w-10 cursor-pointer h-10 border border-[#666666] rounded-full flex justify-center items-center">
                  <FaLinkedin className="w-5 h-5" />
                </div>
              </a>

              {/* Twitter */}
              <a href="https://x.com/blocktourmedia" target="_blank" rel="noopener noreferrer">
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaXTwitter className="w-5 h-5" />
                </div>
              </a>

              {/* Facebook */}
              <a href="https://www.instagram.com/blocktourmedia/" target="_blank" rel="noopener noreferrer">
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaFacebookSquare className="w-5 h-5" />
                </div>
              </a>

              {/* YouTube */}
              <a href="https://www.instagram.com/blocktourmedia/" target="_blank" rel="noopener noreferrer">
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaInstagram className="w-5 h-5" />
                </div>
              </a>
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
    </div >
  );
};

export default Page;
