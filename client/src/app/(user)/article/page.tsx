"use client";
import {getAllCategories} from "@/app/redux/feature/category/api";
import {getAllPosts} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import instance from "@/utils/axios";
import {useRouter, useSearchParams} from "next/navigation";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import {FaEye, FaFacebookSquare, FaLinkedin, FaRegClock} from "react-icons/fa";
import {FaInstagram, FaXTwitter} from "react-icons/fa6";
import {IoSearchOutline} from "react-icons/io5";
import ReactPaginate from "react-paginate";

export interface Post {
  _id: string;
  title: string;
  description: string;
  permaLink: string;
  postSliderImageUrl: string[];
  previewImageUrl: string;
  status: string;
  createdAt: Date;
  publishedDate: Date;
  visibility: string;
  updatedAt: string;
  category: string[];
  postType: string;
  authorName?: string;
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
  const [currentPage, setCurrentPage] = useState( 0 ); 
  const postsPerPage = 10;  

  const category = searchParams.get( "category" );
  const categoryName = category?.replace( /-/g, " " );

  useEffect( () => {
    setActiveCategory( categoryName || "All" );
    if ( categories.length === 0 ) {
      getAllCategories( dispatch );
    }
    const fetchPosts = async () => {
      setIsLoading( true );
      await getAllPosts( dispatch );
      setIsLoading( false );
    };
    fetchPosts();

    if ( categoryName?.toLowerCase() === "all" ) {
      router.replace( "/article" );
    }
  }, [dispatch, searchParams, router, categories.length, categoryName] );

  const filteredPosts = activeCategory.toLowerCase() === "all" ? posts : posts.filter( ( post: any ) => post.category && post.status.toLowerCase() === "published" && post.category.some( ( cat: any ) => cat.toLowerCase().includes( activeCategory.toLowerCase() ) ) );
  console.log( "filteredPosts", filteredPosts );
  const handleCategoryClick = ( category: string ) => {
    setActiveCategory( category );
    if ( category.toLowerCase() === 'all' ) {
      router.replace( '/article' );
    } else {
      router.replace(
        `/article?category=${category.toLowerCase().replace( / /g, "-" )}`
      );
    }
  };
  console.log( "poata:-", posts );
  // Sort posts by views and then filter by category;
  const trendingPosts = useMemo( () => {
    return posts
      .slice() // Create a shallow copy to avoid mutating the original array
      .sort( ( a: any, b: any ) => ( b.views || 0 ) - ( a.views || 0 ) ).filter( ( post: any ) =>
        activeCategory.toLowerCase() === "all" ||
        ( post.category && post.status.toLowerCase() === "published" &&
          post.category.some( ( cat: string ) => cat.toLowerCase().includes( activeCategory.toLowerCase() ) ) )
      ).slice( 0, 4 );
  }, [posts, activeCategory] );

  console.log( "trendingPosts", trendingPosts );

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
      setEmailError(
        termsCheckboxRef.current?.checked
          ? ""
          : "Please agree to the Terms and Conditions and Privacy Policy"
      );
    }
  };

  const CreateSubscriber = async () => {
    if ( !isTermsAndPrivacy ) {
      alert( "Please agree to the Terms and Conditions and Privacy Policy" );
      termsCheckboxRef.current?.focus();
      return;
    }

    try {
      const response = await instance.post( "/subscriber/subscribers", {
        email,
      } );
      alert( `${response.data.message || "Subscribed Successfully"}` );
      setEmail( "" );
      setIsTermsAndPrivacy( false );
    } catch ( error: any ) {
      console.error( error );
      alert(
        `${error.response?.data?.message ||
        "There is some error in creating subscriber"
        }`
      );
      setEmailError( "" );
    }
  };

  const truncateText = ( text: string, wordLimit: number ) => {
    const words = text.split( ' ' );
    return words.length > wordLimit ? words.slice( 0, wordLimit ).join( ' ' ) + '...' : text;
  };

  // Calculate the index of the last post on the current page
  const lastPostIndex = ( currentPage + 1 ) * postsPerPage;
  // Calculate the index of the first post on the current page
  const firstPostIndex = lastPostIndex - postsPerPage;
  // Get the current posts
  const currentPosts = filteredPosts.slice( firstPostIndex, lastPostIndex );

  // Handle page change
  const handlePageChange = ( selectedPage: {selected: number;} ) => {
    setCurrentPage( selectedPage.selected );
  };

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

  // set the date month and year
  const formatDateTime = ( dateString: string | Date ) => {
    const date = new Date( dateString );
    return date.toLocaleDateString( 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    } );
  };

  return (
    <div className="lg:ml-52 mx-auto max-w-[98rem] px-4">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold">Article</h1>
        <div className="relative border border-[#28272D] rounded flex justify-between">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
          />
          <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="px-4">
        <h1 className="text-lg font-semibold text-[#999999]">Trending</h1>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {trendingPosts.length === 0 ? (
              <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4">
                <div className="text-center text-gray-400 w-full">
                  <h1 className="text-2xl font-semibold">No posts found</h1>
                  <p className="text-sm text-gray-400">
                    No posts found for "{activeCategory}". Please try again later.
                  </p>
                </div>
              </div>
            ) : (
              trendingPosts.map( ( post: any ) => (
                <div
                  key={post._id}
                  className="cursor-pointer group rounded-xl border border-[#17161B] overflow-hidden bg-[#0A090F] pb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  onClick={() => router.push( `/article/${post.permaLink}` )}
                >
                  <img
                    loading="lazy"
                    src="/asset/banner.jpg"
                    className="w-full h-44 object-cover rounded-t-md"
                  />
                  <div className="flex gap-2 items-center px-4 py-2 mt-2">
                    {post?.category && post.category.length > 0 && (
                      <span className="bg-[#DF841C] line-clamp-1 py-0.5 px-3 text-sm text-[#230E00] font-semibold">
                        {post.category[0] ?? "No Category"}
                      </span>
                    )}
                    <span className="text-[#767676]">
                      {post.publishedDate ? formatDateTime( post.publishedDate ) : "No date available"}
                    </span>
                  </div>
                  <div className="px-4">
                    <h1 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2 leading-[1.4] group-hover:text-[#DF841C]">
                      {truncateText( post.title, 30 )}
                    </h1>
                    <div
                      className="text-sm text-[#B0AFAF] mt-2 mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{__html: post.description}}
                    />
                  </div>
                </div>
              ) )
            )}
          </div>
        )} 

        <div className="bg-[#0A090F] text-white p-14 rounded-lg mt-5 border border-[#17161B]">
          <div className="flex lg:flex-row flex-col sm:justify-between justify-center gap-12 items-center">
            {/* Left Section */}
            <div className="w-full ">
              <h2 className="sm:text-2xl text-3xl font-bold mb-2 sm:text-start text-center">
                Level up on Crypto in 3 Mins
              </h2>
              <p className="text-[#999999]">
                Join the world’s most popular crypto community with daily alpha,
                news, & analysis, all free.
              </p>
            </div>

            {/* Right Section */}
            <div className="w-full">
              <div className="flex sm:flex-row flex-col items-center gap-4">
                <div className="relative w-full sm:w-96">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={`bg-[#1F1C2C] border ${emailError ? "border-red-500" : "border-[#474457]"
                      } text-white py-3.5 px-5 rounded-lg w-full focus:outline-none`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm my-1 whitespace-nowrap absolute">
                      {emailError}
                    </p>
                  )}
                </div>
                <button
                  className="bg-orange-500 whitespace-nowrap text-white sm:px-10 sm:w-[40%] w-full py-3.5  disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg hover:bg-orange-600 transition"
                  disabled={isLoading || !email || !!emailError}
                  onClick={CreateSubscriber}
                >
                  Join for Free
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-center mt-8">
                <input
                  type="checkbox"
                  id="agree"
                  className="mr-2 focus:outline-1"
                  ref={termsCheckboxRef}
                  onChange={() => {
                    setIsTermsAndPrivacy( !isTermsAndPrivacy );
                    handleEmailChange( {
                      target: {value: email},
                    } as React.ChangeEvent<HTMLInputElement> );
                  }}
                />
                <label htmlFor="agree" className="text-gray-400 sm:text-sm text-xs">
                  By joining, I agree to the Blockbar{" "}
                  <a
                    href="/terms-and-conditions"
                    className="underline text-gray-300"
                  >
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
          <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
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
        </div>

        {/* Category Navigation */}
        <div className="sticky top-0 px-8 bg-black lg:block hidden">
          <div className="flex gap-5 py-4 border-b border-[#17161B] text-[#999999] items-center overflow-x-auto scrollbar-hide px-4 w-full">
            <p
              className={`hover:text-white cursor-pointer flex-shrink-0 ${activeCategory.toLowerCase() === "all" ? "text-white font-semibold" : ""}bg-[#0A090F] py-1.5 px-4 border border-[#17161B] rounded transition duration-200 ease-in-out transform hover:scale-105`}
              onClick={() => handleCategoryClick( "All" )}
            >
              All
            </p>
            {categories.map( ( category: any ) => (
              <p
                key={category._id}
                className={`hover:text-white cursor-pointer flex-shrink-0 ${activeCategory.toLowerCase() === category.name.toLowerCase() ? "text-white font-semibold" : ""} bg-[#0A090F] py-1.5 px-4 border border-[#17161B] rounded transition duration-200 ease-in-out transform hover:scale-105`}
                onClick={() => {
                  router.push( `/article?category=${category.name.toLowerCase().split( " " ).join( "-" )}` );
                }}
              >
                {category.name.charAt( 0 ).toUpperCase() + category.name.slice( 1 )}
              </p>
            ) )}
          </div>
        </div>

        <div className="mx-auto mt-4">
          {currentPosts.length === 0 ? (
            <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4">
              <div className="text-center text-gray-400 w-full">
                <h1 className="text-2xl font-semibold">No posts found</h1>
                <p className="text-sm text-gray-400">
                  No posts found for "{activeCategory}". Browse other
                  categories.
                </p>
              </div>
            </div>
          ) : (
            <>
                {currentPosts.map( ( post: any ) => (
                <div
                  key={post._id}
                  className="bg-[#0A090F] group w-full cursor-pointer sm:p-5 p-2  rounded-lg shadow-lg flex sm:space-x-5 space-x-3 mb-4 border border-[#17161B]"
                  onClick={() => {
                    router.push( `/article/${post.permaLink}` );
                  }}
                >
                  <img
                    src={post.previewImageUrl || "/asset/banner.jpg"}
                    alt="Thumbnail"
                    className="sm:w-44 sm:h-32 w-32 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[#858585] sm:text-sm text-xs">
                      Written by{" "}
                      <span className="font-semibold">{post.authorName}</span>
                    </p>
                    <h3 className="sm:text-xl text-sm  sm:font-bold font-semibold sm:mb-2 sm:mt-2 mt-0.5 mb-0.5 text-[#CCCCCC] group-hover:text-[#DF841C] sm:line-clamp-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <div
                      className="sm:text-sm text-xs text-[#B0AFAF] sm:mb-3 mb-2 sm:line-clamp-2 line-clamp-1"
                      dangerouslySetInnerHTML={{__html: truncateText( post.description, 30 )}}
                       />
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      {post?.category && post.category.length > 0 && (
                        <span className="bg-[#DF841C] text-[#000000] font-semibold px-2 py-0.5 rounded">
                          {post.category[0].split( ' ' )[0]}
                        </span>
                      )}
                      <span className="text-[#767676]">
                        {post?.publishedDate
                          ? formatDateTime( post.publishedDate )
                          : "No date"}
                      </span>
                      <span className="text-[#767676] flex items-center">
                        <FaEye className="mr-1" />
                        {post?.views || 0}
                      </span>
                      <span className="text-[#767676] flex items-center">
                        <FaRegClock className="mr-1" />
                        {post?.readingTime} min
                      </span>
                    </div>
                  </div>
                </div>
              ) )}
            </>
          )}
        </div>
        {/* Pagination Component */}
        <div className="flex justify-end mt-4">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil( filteredPosts.length / postsPerPage )} // Total pages
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex space-x-2"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link bg-[#DF841C] text-white px-4 py-2 rounded hover:bg-[#BF6F1A] transition duration-200"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link bg-[#DF841C] text-white px-4 py-2 rounded hover:bg-[#BF6F1A] transition duration-200"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link bg-[#DF841C] text-white px-4 py-2 rounded hover:bg-[#BF6F1A] transition duration-200"}
            activeClassName={"active bg-[#0A090F] text-[#fffff] font-bold text-3xl "} 
          />
        </div>
      </div>
      <div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
        <div className="w-[90%] m-auto sm:flex-row flex-col gap-5 flex justify-between py-10 text-[#FFFCFC99]">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-[#FFFFFF]">
              Get connected
            </h1>

            <div className="flex gap-3 lg:mt-0 mt-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/blocktourmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 cursor-pointer h-10 border border-[#666666] rounded-full flex justify-center items-center">
                  <FaLinkedin className="w-5 h-5" />
                </div>
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/blocktourmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaXTwitter className="w-5 h-5" />
                </div>
              </a>

              {/* Facebook */}
              {/* <a
                href="https://www.instagram.com/blocktourmedia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaFacebookSquare className="w-5 h-5" />
                </div>
              </a> */}

              {/* YouTube */}
              <a
                href="https://www.instagram.com/blocktourmedia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                  <FaInstagram className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>

          <div className="">
            <h1 className="sm:text-3xl text-xl text-[#FFFFFF] pb-3">
              Receive your daily crypto update
            </h1>
            <div className="flex lg:flex-row flex-col items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-[#1F1C2C] border border-[#474457] text-white py-3.5 px-5 rounded-lg  w-full sm:w-96 focus:outline-none"
              />
              <button className="bg-orange-500 text-white sm:px-10 sm:w-[40%] w-full py-3.5 rounded-lg hover:bg-orange-600 transition">
                Join for Free
              </button>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-center mt-4">
              <input type="checkbox" id="agree" className="mr-2" />
              <label htmlFor="agree" className="text-gray-400 sm:text-sm text-xs">
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
