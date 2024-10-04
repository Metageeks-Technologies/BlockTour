"use client";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {getAllPosts} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams, useRouter} from "next/navigation";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IoBookmarkOutline, IoSearchOutline} from "react-icons/io5";
import {FaBookmark, FaEye, FaFacebookSquare, FaInstagram, FaLinkedin, FaRegClock, FaTwitter, } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import instance from "@/utils/axios";
import {FiHeart} from "react-icons/fi";

const CardDetails = () => {
    const {slug} = useParams<{slug: string;}>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [card, setCard] = useState<any>( null );
    const [data, setData] = useState<any>( null );
    const [isLoading, setIsLoading] = useState<boolean>( true );
    const [email, setEmail] = useState<string>( "" );
    const [emailError, setEmailError] = useState<string>( "" );
    const [isTermsAndPrivacy, setIsTermsAndPrivacy] = useState<boolean>( false );
    const termsCheckboxRef = useRef<HTMLInputElement>( null );
    const author = useAppSelector( ( state: any ) => state.contributor?.author || state.superAdmin?.author );
    const posts = useAppSelector( ( state ) => state.post.posts );
    const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );

    const getPostBySlug = useCallback( async () => {
        try {
            const response = await instance.get( `/post/posts/${slug}` );
            if ( response.data.post.length > 0 ) {
                setData( response.data.post );
            } else {
                setCard( response.data.post );
            }
        } catch ( error: any ) {
            console.error( error );
        } finally {
            setIsLoading( false );
        }
    }, [slug] );

    useEffect( () => {
        if ( slug ) {
            getPostBySlug();
            getAllPosts( dispatch );
        }
    }, [slug, getPostBySlug, dispatch] );

    useEffect( () => {
        if ( card ) {
            if ( card.creatorId ) {
                getAuthor( dispatch, card.creatorId );
            } else if ( card.authorId ) {
                getAdminAuthor( dispatch, card.authorId );
            }
        }
    }, [card, dispatch] );

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

        return filterAndShuffle( posts, 3 );
    }, [posts] );

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

    const handleBookmark = async ( id: any ) => {
        try {
            const response = await instance.post( '/bookmark/add', {postId: id, userId: user?._id} );
            getPostBySlug();
            console.log( response.data );
            alert( `${response.data.message || "Bookmarked Successfully"}` );
        } catch ( error: any ) {
            console.error( error );
            alert( `${error.response.data.message || "There is some error in bookmarking"}` );
        }
    };

    const handleBookmarkRemove = async ( id: any ) => {
        try {
            const response = await instance.post( '/bookmark/remove', {postId: id, userId: user._id} );
            console.log( response.data );
            getPostBySlug();
            alert( `${response.data.message || "Bookmarked Successfully"}` );
        } catch ( error: any ) {
            console.error( error );
            alert( `${error.response.data.message || "There is some error in bookmarking"}` );
        }
    };

    return (
        <div className="bg-black">
            <div className="lg:ml-4 xl:ml-40 flex flex-col items-center pb-6 bg-black px-4 lg:px-12">
                <div className="flex flex-col lg:flex-row w-full max-w-7xl">
                    {/* Left column */}
                    <div className="w-full lg:w-[70%] overflow-y-auto scrollbar-hide">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-screen">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-orange-500 border-b-transparent border-r-transparent border-l-transparent rounded-full" role="status">
                                </div>
                            </div>
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    data?.map( ( post: any ) => (
                                        <div
                                            key={post._id}
                                            className="bg-[#0A090F] cursor-pointer p-4 lg:p-5 rounded-lg shadow-lg flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mb-4 border border-[#17161B]"
                                            onClick={() => {
                                                router.push( `/article/${post.permaLink}` );
                                            }}
                                        >
                                            <img
                                                src={post.previewImageUrl}
                                                alt="Thumbnail"
                                                className="w-full sm:w-44 h-36 object-cover rounded-lg"
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
                                    ) )
                                ) : card ? (
                                    <div className="flex flex-col w-full">
                                        <h1 className="mt-8 text-2xl lg:text-4xl font-medium text-neutral-300">
                                            {card?.title}
                                        </h1>

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8">
                                            <div className="flex gap-2.5 items-center text-sm font-bold leading-none mb-4 sm:mb-0">
                                                <img
                                                    loading="lazy"
                                                    srcSet={author?.profileImage}
                                                    className="rounded-full object-cover h-12 w-12"
                                                />
                                                <div className="flex flex-col gap-y-2">
                                                    <div className="flex gap-2.5 self-start">
                                                        <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
                                                            {card?.category.join( ", " )}
                                                        </div>
                                                    </div>
                                                    <div className="text-white text-opacity-50">
                                                        {card?.authorName} | {formatDateTime( card?.createdAt )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                <span className="text-[#767676] flex items-center">
                                                    <FaRegClock className="mr-1" />
                                                    {card?.readingTime} min read
                                                </span>
                                                <span className="text-[#767676] flex items-center">
                                                    <FaEye className="mr-1" />
                                                    {card?.views || 0} views
                                                </span>
                                                <span className="text-[#767676] flex items-center gap-1">
                                                    <img src="/asset/Like.svg" alt="" />
                                                    0
                                                </span>
                                                <span className="text-[#767676] flex items-center gap-1">
                                                    <img src="/asset/share1.svg" alt="" />
                                                    0
                                                </span>
                                                {card?.bookmarkedBy?.includes( user?._id ) ? (
                                                    <span className="text-[#767676] flex items-center gap-1 cursor-pointer" onClick={() => {
                                                        if ( user ) {
                                                            handleBookmarkRemove( card._id );
                                                        } else {
                                                            alert( "Please login to bookmark" );
                                                        }
                                                    }}>
                                                        <FaBookmark className="w-5 h-5" />
                                                    </span>
                                                ) : (
                                                    <span className="text-[#767676] flex items-center gap-1 cursor-pointer" onClick={() => {
                                                        if ( user ) {
                                                            handleBookmark( card._id );
                                                        } else {
                                                            alert( "Please login to bookmark" );
                                                        }
                                                    }}>
                                                        <img src="/asset/Bookmark.svg" alt="Bookmark" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative w-full pb-[56.25%] mb-8">
                                            {card?.postType?.toLowerCase() === "video post" ? (
                                                <video
                                                    src={card?.previewImageUrl}
                                                    controls
                                                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <img
                                                    loading="lazy"
                                                    src={card?.previewImageUrl}
                                                    alt={card?.title}
                                                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                />
                                            )}
                                        </div>

                                        <div className="mt-5 text-base leading-7 text-zinc-400">
                                            <h1 className="text-2xl font-medium text-white mb-4">
                                                {card?.title}
                                            </h1>
                                            <div className="mt-5">
                                                <HtmlContent htmlContent={card?.description || ""} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-gray-700 rounded-xl h-80 flex justify-center items-center w-full col-span-4 mt-8">
                                            <div className="text-center text-gray-400 w-full">
                                                <h1 className="text-2xl font-semibold">No posts found</h1>
                                                <p className="text-sm text-gray-400">
                                                    No posts found for "{slug}". Browse other data.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center text-gray-400 w-full mt-4">
                                            <h1 className="text-2xl font-semibold">
                                                You can explore other posts here
                                            </h1>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                            {getRandomPosts.map( ( post: any ) => (
                                                <div
                                                    key={post._id}
                                                    className="cursor-pointer rounded-xl border border-[#17161B] overflow-hidden bg-[#0A090F] pb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                    style={{
                                                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px;13px, rgba(0, 0, 0, 0.09) 0px -5px 16px",
                                                    }}
                                                    onClick={() => {
                                                        router.push( `/article/${post.permaLink}` );
                                                    }}
                                                >
                                                    <img
                                                        src={post.previewImageUrl}
                                                        alt={post.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-semibold mb-2 text-[#CCCCCC] line-clamp-2">
                                                            {post.title}
                                                        </h3>
                                                        <div
                                                            className="text-sm text-[#B0AFAF] mb-3 line-clamp-3"
                                                            dangerouslySetInnerHTML={{__html: post.description}}
                                                        />
                                                        <div className="flex justify-between items-center text-sm text-[#767676]">
                                                            <span>{formatDateTime( post.createdAt )}</span>
                                                            <span>{post.readingTime} min read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right column */}
                    <div className="w-full lg:w-[30%] mt-8 lg:mt-10 lg:ml-5">
                        <div className="sticky top-10 space-y-6">
                            {/* Search input */}
                            <div className="relative border border-[#28272D] rounded flex justify-between">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-[#0A090F] text-[#7B7A7F] w-full px-4 py-2 rounded border-none focus:outline-none"
                                />
                                <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
                                    <IoSearchOutline className="h-6 w-6" />
                                </button>
                            </div>

                            {/* User section */}
                            {!user ? (
                                <div className="flex items-center justify-between py-6">
                                    <button className="py-3.5 px-6 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg text-sm" onClick={() => router.push( "/auth/user/signup" )}>
                                        Join for free
                                    </button>
                                    <p className="text-sm hover:underline cursor-pointer" onClick={() => router.push( "/auth/user/login" )}>Sign In</p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-end gap-4 py-6 cursor-pointer" onClick={() => router.push( "/view-profile" )}>
                                    <p className="text-sm font-semibold">{user?.name}</p>
                                    <img src={user?.profileImage} alt="" className="w-8 h-8 rounded-full" />
                                </div>
                            )}

                            {/* Newsletter signup */}
                            <div className="bg-[#0A090F] p-6 rounded-lg">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-center">
                                        <img src="/asset/Block-logo.svg" alt="" className="w-32 h-12 object-contain" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-center">Level up on crypto, daily</h2>
                                    <p className="text-sm text-[#ADADAD] text-center">
                                        Join the world's most popular crypto community with daily alpha, news, & analysis, all free.
                                    </p>
                                    {emailError && <p className="text-red-500 text-xs text-center">{emailError}</p>}
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="py-3 px-4 text-sm rounded-full bg-black border border-neutral-700"
                                    />
                                    <button
                                        className="py-3 px-6 bg-red-600 hover:bg-red-500 rounded-full text-sm whitespace-nowrap disabled:cursor-not-allowed disabled:bg-gray-600"
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

                {/* Comment section */}
                <div className="mt-12 w-full ">
                    {card && <DiscussionEmbedComponent article={card} />}
                </div>
            </div>

            {/* Author section */}
            {card && (
                <div className="mt-12 px-4 lg:px-20 max-w-7xl mx-auto">
                    <div className="py-8 flex flex-col sm:flex-row gap-6 border-t border-neutral-800">
                        <img
                            src={author?.profileImage}
                            alt={author?.name || "No author found"}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-semibold">Written by {author?.name || "Unknown"}</h2>
                            <div className="flex flex-wrap gap-4 items-center">
                                <p className="text-sm">{author?.posts?.length} Articles</p>
                                <div className="flex gap-2">
                                    <a href="#" className="w-8 h-8 bg-[#4e4e50] rounded-full flex justify-center items-center">
                                        <FaLinkedin className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-8 h-8 bg-[#4e4e50] rounded-full flex justify-center items-center">
                                        <FaTwitter className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            <p className="text-sm text-[#ADADAD]">{author?.bio}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Get connected section */}
            <div className="mt-12 lg:ml-52 bg-[#0A090F]">
                <div className="w-full mx-auto px-4 lg:px-20">
                    <div className="py-10 flex flex-col lg:flex-row justify-between gap-8 text-[#FFFCFC99] border-b border-[#1F1D24]">
                        <div className="w-full lg:w-1/2 space-y-4">
                            <h2 className="text-2xl font-semibold text-white">Get connected</h2>
                            <p>Follow us on social media for the latest updates and news.</p>
                            <div className="flex gap-4">
                                {/* <a href="#" className="text-2xl hover:text-white transition-colors">
                                    <FaFacebookSquare className="w-8 h-8" />
                                </a> */}
                                <a href="https://www.instagram.com/blocktourmedia/" className="text-2xl hover:text-white transition-colors">
                                    <FaInstagram className="w-8 h-8" />
                                </a>
                                <a href="https://twitter.com/blocktourmedia" className="text-2xl hover:text-white transition-colors">
                                    <FaTwitter className="w-8 h-8" />
                                </a>
                                <a href="https://www.linkedin.com/company/blocktourmedia/" className="text-2xl hover:text-white transition-colors">
                                    <FaLinkedin className="w-8 h-8" />
                                </a>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-white mb-4">Receive your daily crypto update</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`bg-[#1F1C2C] border ${emailError ? 'border-red-500' : 'border-[#474457]'} text-white py-3 px-4 rounded-lg w-full focus:outline-none`}
                                    />
                                    
                                    <button
                                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                                        disabled={!email || !!emailError}
                                        onClick={CreateSubscriber}
                                    >
                                        Join for Free
                                    </button>
                                </div>
                                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                <div className="flex items-start">
                                    <input type="checkbox" id="agree" className="mr-2 mt-1" ref={termsCheckboxRef} onChange={() => {
                                        setIsTermsAndPrivacy( !isTermsAndPrivacy );
                                        handleEmailChange( {target: {value: email}} as React.ChangeEvent<HTMLInputElement> );
                                    }} />
                                    <label htmlFor="agree" className="text-gray-400 text-sm">
                                        By joining, I agree to the Blockbar{" "}
                                        <a href="/terms-and-conditions" className="underline text-gray-300">Terms and Conditions</a>{" "}
                                        and <a href="/privacy-policy" className="underline text-gray-300">Privacy Policy</a> statements.
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