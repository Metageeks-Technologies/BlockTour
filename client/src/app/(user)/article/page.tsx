"use client";
import {getAllCategories} from "@/app/redux/feature/category/api";
import {getAllPosts} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import instance from "@/utils/axios";
import {formatDateTime} from "@/utils/DateFormat";
import {useRouter, useSearchParams} from "next/navigation";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import {FaFacebookSquare, FaLinkedin} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {IoLogoYoutube} from "react-icons/io";
import {IoSearchOutline} from "react-icons/io5";

export interface Post {
  _id: string;
  title: string;
  description: string;
  permaLink: string;
  postSliderImageUrl: string[];
  previewImageUrl: string;
  status: string;
  createdAt: Date;
  visibility: string;
  updatedAt: string;
  category: string[];
  postType: string;
}

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ArticlePage />
    </Suspense>
  );
};

const ArticlePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState( true );
  const [activeCategory, setActiveCategory] = useState( "All" );
  const [email, setEmail] = useState( "" );
  const [emailError, setEmailError] = useState( "" );
  const [isTermsAndPrivacy, setIsTermsAndPrivacy] = useState( false );
  const posts = useAppSelector( ( state ) => state.post.posts );
  const categories = useAppSelector( ( state ) => state.category.categories );
  const termsCheckboxRef = useRef<HTMLInputElement>( null );

  const category = searchParams.get( 'category' );
  const categoryName = category?.replace( /-/g, ' ' );  
  useEffect( () => {
    setActiveCategory( categoryName || 'All' );
    if ( categories.length === 0 ) {
      getAllCategories( dispatch );
    }
    const fetchPosts = async () => {
      setIsLoading( true );
      await getAllPosts( dispatch );
      setIsLoading( false );
    };
    fetchPosts();

    if ( categoryName === 'All' ) {
      router.replace( '/article' );
    }
  }, [dispatch, searchParams, router] );

  const filteredPosts = activeCategory === "All" ? posts : posts.filter( post => post.category && post.status.toLowerCase() === "published" && post.category.some( cat => cat.toLowerCase().includes( activeCategory.toLowerCase() ) ) );

  const handleCategoryClick = ( category: string ) => {
    setActiveCategory( category );
    router.push( `/article?category=${category.toLowerCase()}` );
  };

  const getRandomPosts = useMemo( () => {
    const filterAndShuffle = ( posts: any, count: number, category?: string ) => {
      let filteredPosts = posts;
      if ( category && category !== "All" ) {
        filteredPosts = posts.filter( ( post: any ) =>
          post.category &&
          post.status.toLowerCase() === "published" &&
          post.category.some( ( cat: any ) => cat.toLowerCase().includes( category.toLowerCase() ) )
        );
      }
      const shuffled = [...filteredPosts].sort( () => 0.5 - Math.random() );
      return shuffled.slice( 0, count );
    };

    return filterAndShuffle( posts, 4, activeCategory );
  }, [posts, activeCategory] );

  console.log( "categories", categories );

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {/* Trending section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {[...Array( 4 )].map( ( _, index ) => (
          <div key={index} className="bg-gray-700 rounded-xl h-80"></div>
        ) )}
      </div>

      {/* Newsletter skeleton */}
      <div className="bg-gray-700 h-48 rounded-lg mt-5"></div>

      {/* Browse all articles skeleton */}
      <div className="mt-6">
        <div className="h-8 bg-gray-700 w-1/3 rounded"></div>
        <div className="flex gap-5 py-4 mt-4">
          {[...Array( 4 )].map( ( _, index ) => (
            <div key={index} className="h-6 bg-gray-700 w-20 rounded"></div>
          ) )}
        </div>
      </div>

      {/* Article list skeleton */}
      {[...Array( 3 )].map( ( _, index ) => (
        <div key={index} className="bg-gray-700 h-40 rounded-lg mt-4"></div>
      ) )}
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
        <h1 className="text-lg font-semibold text-[#999999]">Trending</h1> {isLoading ? <LoadingSkeleton /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mt-4 ">
           
            {getRandomPosts.length === 0 ? (
              // make it same as the layout of the post
              <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4">
                <div className="text-center text-gray-400 w-full">
                  <h1 className="text-2xl font-semibold">No posts found</h1>
                  <p className="text-sm text-gray-400">
                  No posts found for "{activeCategory}". Please try again later.
                </p>
              </div>
          </div>
            ) : (
              getRandomPosts.map( ( post: any ) => (
                <div
                key={post._id}
                className="cursor-pointer rounded-xl border border-[#17161B] overflow-hidden bg-[#0A090F] pb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                }}
                onClick={() => router.push( `/article/${post.permaLink}` )}
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
                    {post.createdAt
                      ? formatDateTime( post.createdAt )
                      : "No date available"}
                  </span>
                </div>

                <div className="px-4">
                  <h1 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2 leading-[1.4]">
                    {post.title}
                  </h1>

                  <div
                    className="text-sm text-[#B0AFAF] mt-2 mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{__html: post.description}}
                  />
                </div>
              </div>
            ) ))} 
          </div>
        )}

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
            <p className={`hover:text-white cursor-pointer ${activeCategory === "All" ? "text-white font-semibold" : ""}`}
              onClick={() => handleCategoryClick( "All" )}
            >
              All
            </p>
            {categories.map( ( category: any ) => (
              <p
                key={category._id}
                className={`hover:text-white cursor-pointer ${activeCategory === category.name ? "text-white font-semibold" : ""
                  }`} 
                onClick={() => { router.push( `/article?category=${category.name.toLowerCase().split( " " ).join( "-" )}` );  }}
              >
                {category.name.charAt( 0 ).toUpperCase() + category.name.slice( 1 )}
              </p>
            ) )}
          </div>
        </div>

        <div className="mx-auto mt-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4">
              <div className="text-center text-gray-400 w-full">
                <h1 className="text-2xl font-semibold">No posts found</h1>
                <p className="text-sm text-gray-400">
                  No posts found for "{activeCategory}". Browse other categories.
                </p>
              </div>
            </div>
          ) : (
            <>
              {filteredPosts.map((post: any) => (
                <div
                  key={post._id}
                  className="bg-[#0A090F] cursor-pointer p-5 rounded-lg shadow-lg flex space-x-5 mb-4 border border-[#17161B]"
                  onClick={() => {
                router.push( `/${post.permaLink}` );
              }}
            >
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
                  dangerouslySetInnerHTML={{__html: post.description}}
                />
                <div className="flex items-center space-x-4 text-sm">
                  {post?.category && post.category.length > 0 && (
                    <span className="bg-[#DF841C] text-[#000000] font-semibold px-2 py-0.5 rounded">
                      {post.category[0] ?? "No Category"}{" "}
                    </span>
                  )}
                  <span className="text-[#767676]">
                    {post?.createdAt
                      ? formatDateTime( post.createdAt )
                      : "No date available"}
                  </span>
                </div>
              </div>
            </div>
          ) )}
        </>
          )}
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

export default Page;
