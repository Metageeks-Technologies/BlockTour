"use client";
import { getAdminAuthor } from "@/app/redux/feature/admin/api";
import { getAuthor } from "@/app/redux/feature/contributor/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IoSearchOutline} from "react-icons/io5";
import {FaBookmark, FaEye, FaFacebookSquare, FaHeart, FaLinkedin, FaShare, FaTwitter, } from "react-icons/fa";
import {IoLogoYoutube} from "react-icons/io";
import {FaXTwitter} from "react-icons/fa6";
import instance from "@/utils/axios";
import {getAllPodcasts} from "@/app/redux/feature/podcast/api";
import {toast} from "react-toastify";
import {addPodcastLike, removePodcastLike} from "@/app/redux/feature/like/api";

const CardDetails = () => {
  const {slug} = useParams<{slug: string;}>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [podcast, setPodcast] = useState<any>( null );
  const [data, setData] = useState<any>( null );
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [email, setEmail] = useState<string>( "" );
  const [emailError, setEmailError] = useState<string>( "" );
  const [isTermsAndPrivacy, setIsTermsAndPrivacy] = useState<boolean>( false );
  const termsCheckboxRef = useRef<HTMLInputElement>( null );
  const author = useAppSelector( ( state: any ) => state.contributor?.author || state.superAdmin?.author );
  const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );
  const allPodcasts = useAppSelector( ( state: any ) => state.podcast?.allPodcasts );

  const getPodcastBySlug = async () => {
    try {
      const response = await instance.get( `/podcast/podcast/${slug}` );
      if ( response.data.podcast.length > 0 ) {
        setData( response.data.podcast );
      } else {
        setPodcast( response.data.podcast );
      }
    } catch ( error: any ) {
      console.error( error );
    }
  };

  useEffect( () => {
    if ( slug ) {
      setIsLoading( true );
      getPodcastBySlug();
      getAllPodcasts( dispatch );
      setIsLoading( false );
    }
  }, [dispatch, slug] );


  useEffect( () => {
    if ( podcast ) {
      if ( podcast.creatorId ) {
        getAuthor( dispatch, podcast.creatorId );
      } else if ( podcast.authorId ) {
        getAdminAuthor( dispatch, podcast.authorId );
      }
    }
  }, [dispatch, podcast] );
  const getRelatedPodcasts = useMemo( () => {
    if ( !allPodcasts || !podcast ) return [];

    const filterAndShuffle = ( podcasts: any[], count: number, currentPodcast: any ) => {
      const filteredPodcasts = podcasts.filter( ( p: any ) =>
        p._id !== currentPodcast._id &&
        p.status.toLowerCase() === "published" &&
        p.category.some( ( cat: string ) =>
          currentPodcast.category.includes( cat )
        )
      );

      const shuffled = [...filteredPodcasts].sort( () => 0.5 - Math.random() );
      return shuffled.slice( 0, count );
    };

    return filterAndShuffle( allPodcasts, 3, podcast );
  }, [allPodcasts, podcast] );

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
      setEmailError( "" );
    }
  };

  const CreateSubscriber = async () => {
    if ( emailError ) {
      return;
    }
    try {
      const response = await instance.post( '/subscriber/subscribers', {email} );
      alert( `${response.data.message || "Subscribed Successfully"}` );
      setEmail( "" );
      setEmailError( "" );
    } catch ( error: any ) {
      console.error( error );
      alert( `${error.response.data.message || "There is some error in creating subscriber"}` );
      setEmailError( "" );
    }
  };
  const handleBookmark = async ( id: string ) => {
    try {
      const response = await instance.post( '/bookmark/add', {podcastId: id, userId: user._id} );
      console.log( response.data );
      getPodcastBySlug();
      alert( `${response.data.message || "Podcast bookmark added successfully"}` );
    } catch ( error: any ) {
      console.error( error );
    }
  };

  const handleBookmarkRemove = async ( id: string ) => {
    try {
      const response = await instance.post( '/bookmark/remove', {podcastId: id, userId: user._id} );
      console.log( response.data );
      getPodcastBySlug();
      alert( `${response.data.message || "Podcast bookmark removed successfully"}` );
    } catch ( error: any ) {
      console.error( error );
    }
  };
  
  const handleShare = async () => {
    const shareUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/podcast-episode/${slug}`;
    const shareTitle = podcast?.title || 'Check out this podcast';
    const shareText = `🎙️ Just listened to "${shareTitle}" on Blockbar!\n\n🔥 Key topics:\n${podcast?.category.slice( 0, 3 ).map( ( cat: any ) => `• ${cat}` ).join( '\n' )}\n\n🎧 Listen now:`;

    if ( navigator.share ) {
      try {
        await navigator.share( {
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        } );
        toast.success( 'Shared successfully!' );
      } catch ( error ) {
        console.error( 'Error sharing:', error );
        fallbackCopyToClipboard( `${shareText}\n${shareUrl}` );
      }
    } else {
      fallbackCopyToClipboard( `${shareText}\n${shareUrl}` );
    }
  };

  const fallbackCopyToClipboard = ( text: string ) => {
    navigator.clipboard.writeText( text ).then( () => {
      toast.success( 'Share text copied to clipboard!' );
    } ).catch( ( err ) => {
      console.error( 'Failed to copy:', err );
      toast.error( 'Failed to copy share text. Please try again.' );
    } );
  };

    return (
    <div>
      <div className="lg:ml-40 flex overflow-hidden flex-col items-center sm:pb-6 bg-black lg:px-12 sm:px-8 px-4">
        <div className="flex sm:flex-row flex-col">
          <div className="flex flex-col lg:w-[70%] sm:[60%] max-md:ml-0 max-md:w-full lg:ml-5 ">
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-orange-500 border-b-transparent border-r-transparent border-l-transparent rounded-full"
                  role="status"
                ></div>
              </div>
            ) : (
              <>
                {podcast ? (
                  <div className="py-12">
                    <div className="w-full h-auto">
                      <HtmlContent htmlContent={podcast?.embededCode || ""} />
                    </div>
                    <p className="text-lg text-[#DF841C] text-center mt-4">
                      Podcast
                    </p>
                    <h1 className="mt-2 w-[80%] m-auto text-center lg:text-3xl md:text-2xl text-2xl font-medium text-[#BBBBBB]">
                      {podcast?.title}
                    </h1>
                    <p className="text-center mt-2 text-[#999999] capitalize">
                      {podcast?.permaLink.split( "-" ).join( " " )}
                    </p>
                    <div className="flex justify-center gap-3 mt-3 text-[#999999]">
                      {podcast?.category.map( ( cat: any, index: any ) => (
                        <button
                          key={cat._id}
                          className="py-1.5 px-6 bg-[#0A090F] border border-[#17161B] rounded"
                        >
                          {cat}
                        </button>
                      ) )}
                    </div>
                        <div className="mt-3 text-[#999999] flex flex-wrap justify-center gap-4">
                          <span>{formatDateTime( podcast?.createdAt ?? "No date available" )}</span>
                          <span className="text-neutral-400 text-sm flex items-center">
                            <FaEye className="mr-1 mt-0.5" />
                            {podcast?.views || 0} views
                          </span>
                          <span className="text-[#767676] flex items-center gap-1 cursor-pointer">
                            {podcast?.likes?.includes( user?._id ) ? (
                              <FaHeart className="text-red-500" onClick={async () => {
                                if ( user ) {
                                  await removePodcastLike( dispatch, podcast._id, user._id );
                                  getPodcastBySlug();
                                } else {
                                  toast.warning( "Please login to like" );
                                }
                              }} />
                            ) : (
                              <span onClick={async () => {
                                if ( user ) {
                                  await addPodcastLike( dispatch, podcast._id, user._id );
                                  getPodcastBySlug();
                                } else {
                                  toast.warning( "Please login to like" );
                                }
                              }}>
                                <img src="/asset/Like.svg" alt="" />
                              </span>
                            )}
                            {podcast?.likes?.length || 0}
                          </span>
                          <button onClick={handleShare} className="flex items-center gap-1">
                            <FaShare className="mr-1 mt-0.5" /> 
                          </button>
                          {podcast?.bookmarkedBy?.includes( user?._id ) ? (
                            <button onClick={() => handleBookmarkRemove( podcast?._id )} className="flex items-center gap-1">
                              <FaBookmark className="w-5 h-5" />
                              Bookmarked
                            </button>
                          ) : (
                            <button onClick={() => handleBookmark( podcast?._id )} className="flex items-center gap-1">
                              <img src="/asset/Bookmark.svg" alt="Bookmark" className="w-5 h-5" />
                              Bookmark
                            </button>
                          )}
                        </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4 mt-8">
                      <div className="text-center text-gray-400 w-full">
                        <h1 className="text-2xl font-semibold">
                          No podcast found
                        </h1>
                        <p className="text-sm text-gray-400">
                          No podcast found for "{slug}". Browse other podcasts.
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-gray-400 w-full mt-4">
                      <h1 className="text-2xl font-semibold">
                        You can explore other podcasts here
                      </h1>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* right */}
          <div className="flex flex-col ml-5 lg:w-[30%] sm:w-[40%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full py-4">
              <div className="sm:block hidden">
                <div className="relative border  border-[#28272D] rounded flex justify-between">
                  <input
                    type="text"
                    placeholder="Search"
                    // value={searchQuery}
                    // onChange={( e ) => setSearchQuery( e.target.value )}
                    className=" text-[#7B7A7F] bg-[#0A090F] lg:w-80 sm:w-full w-40 px-4 py-2 rounded border-none focus:outline-none"
                  />
                  <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
                    <IoSearchOutline className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {!user ? (
                <div className="  flex items-center justify-evenly py-6">
                  <button
                    className="py-3.5 lg:px-12 px-8 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg"
                    onClick={() => router.push( "/auth/user/signup" )}
                  >
                    Join for free
                  </button>
                  <p
                    className="text-lg hover:underline"
                    onClick={() => router.push( "/auth/user/login" )}
                  >
                    Sign In
                  </p>
                </div>
              ) : (
                <div
                  className="  flex items-center justify-end gap-4 py-6 cursor-pointer"
                  onClick={() => router.push( "/view-profile" )}
                >
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <img
                    src={user?.profileImage}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}

              {/* it should be sticky at top till footer comes to screen */}
              <div className=" h-[32rem] rounded-lg sticky  top-0 z-40  flex justify-center items-center bg-[#0A090F]">
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
                    {emailError && (
                      <p className="text-red-500 text-center">{emailError}</p>
                    )}
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={handleEmailChange}
                      className="py-4 px-5 rounded-3xl bg-black border border-neutral-700"
                    />
                    <button
                      className="py-4 px-12 bg-red-600 hover:bg-red-500 rounded-3xl whitespace-nowrap disabled:cursor-not-allowed"
                      onClick={CreateSubscriber}
                      disabled={!email || !!emailError}
                    >
                      Join for free
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment section */}
        <div className="sm:mt-20 mt-10 max-w-full lg:w-[86%] w-full sm:max-md:mt-10 ">
          {podcast && <DiscussionEmbedComponent article={podcast} />}
        </div>
        {/* <div className="flex  shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" /> */}
      </div>

      {/* Author section */}
      {podcast && (
        <div className="lg::mt-5 lg:ml-52 rounded-lg lg:px-20 sm:px-8 px-4">
          <div className="lg:py-10 flex border-neutral-800">
            <div className="flex flex-col gap-3">
              <img
                src={author?.profileImage}
                alt={author?.name || "No author found"}
                className="h-14 w-14 rounded-full object-cover"
              />

              <h1 className="xl font-semibold">
                {" "}
                Written by {author?.name || "Unknown"}
              </h1>

              <div className="flex gap-3 items-center">
                <div className="flex gap-2">
                  <p>{author?.posts?.length} Articles</p>
                  {/* <p className="text-red-600">View All</p> */}
                </div>

                <div className="flex gap-1">
                  <div className="w-8 cursor-pointer h-8 bg-[#4e4e50] rounded-full flex justify-center items-center">
                    <FaLinkedin className="w-4 h-4" />
                  </div>

                  <div className="w-8 h-8 cursor-pointer bg-[#4e4e50] rounded-full flex justify-center items-center">
                    <FaTwitter className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <p className="text-justify text-sm text-[#ADADAD] sm:w-[80%]">
                {author?.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 lg:ml-52 bg-[#0A090F] rounded-lg">
        <div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
          <div className="w-[90%] m-auto sm:flex-row flex-col gap-5 flex justify-between py-10 text-[#FFFCFC99]">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Get connected</h1>
              <div className="flex gap-3 lg:mt-0 mt-3">
                <div className="w-10 cursor-pointer h-10 border border-[#666666] rounded-full flex justify-center items-center" >
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
              <h1 className="sm:text-3xl text-xl text-[#FFFFFF] pb-3">
                Receive your daily crypto update
              </h1>
              <div className="w-full">
                <div className="flex lg:flex-row flex-col items-center gap-4">
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
                    disabled={!email || !!emailError}
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
                    <a
                      href="/privacy-policy"
                      className="underline text-gray-300"
                    >
                      Privacy Policy
                    </a>{" "}
                    statements.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CardDetails;