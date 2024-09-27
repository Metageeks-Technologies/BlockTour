"use client";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import {getAuthor, getCurrentUser} from "@/app/redux/feature/contributor/api";
import {getAllPosts, getPostById} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IoBookmarkOutline, IoSearchOutline} from "react-icons/io5";
import {FaFacebookSquare, FaLinkedin, FaTwitter, } from "react-icons/fa";
import {IoLogoYoutube} from "react-icons/io";
import {FaXTwitter} from "react-icons/fa6";
import Cookies from "js-cookie";
import instance from "@/utils/axios";

const CardDetails = () => {
    const {slug} = useParams<{slug: string;}>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    // const card = useAppSelector( ( state: any ) => state.post.currentPost );
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

    const getPostBySlug = async () => {
        try {
            const response = await instance.get( `/post/posts/${slug}` );
            console.log( "response", response );
            if ( response.data.post.length > 0 ) {
                setData( response.data.post );
            } else setCard( response.data.post );
        } catch ( error: any ) {
            console.error( error );
        }
    };

    useEffect( () => {
        if ( slug ) {
            setIsLoading( true );
            getPostBySlug();
            getAllPosts( dispatch );
            if ( Cookies.get( "UserToken" ) ) {
                getCurrentUser( dispatch );
            }
            setIsLoading( false );
        }
    }, [dispatch, slug] ); 

    useEffect( () => {
        if ( card ) {
            if ( card.creatorId ) {
                // dispatch( getAuthor( card.creatorId ) );
                getAuthor( dispatch, card.creatorId );
            } else if ( card.authorId ) {
                // dispatch( getAdminAuthor( card.authorId ) );
                getAdminAuthor( dispatch, card.authorId );
            }
        }
    }, [dispatch, card] );

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

    return (
        <div>
            {/* <Navbar/> */}
            <div className=" lg:ml-40 flex overflow-hidden flex-col items-center pb-6 bg-black  md:px-12 ">
                {/* where i scroll first left side then right side */}
                <div className="flex max-h-screen sticky top-0">
                    <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full md:ml-5 overflow-y-auto scrollbar-hide">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-screen">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-orange-500 border-b-transparent border-r-transparent border-l-transparent rounded-full" role="status">
                                    {/* <span className="visually-hidden">Loading...</span> */}
                                </div>
                            </div>
                        ) :
                            <>
                                {data && data.length > 0 ? (
                                    data?.map( ( post: any ) => (
                                        <div
                                            key={post._id}
                                            className="bg-[#0A090F] cursor-pointer p-5 rounded-lg shadow-lg flex space-x-5 mb-4 border border-[#17161B]"
                                            onClick={() => {
                                                router.push( `/article/${post.permaLink}` );
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
                                    ) ) )

                                    : card ?
                                        <div className="flex flex-col w-[85%] m-auto">
                                            <h1 className="mt-8 lg:text-4xl md:text-2xl text-2xl font-medium text-neutral-300 max-md:mt-10 max-md:max-w-full">
                                                {card?.title}
                                            </h1>

                                            <div className=" flex justify-between items-center py-8">
                                                <div className="flex gap-2.5 items-center text-sm font-bold leading-none ">
                                                    <img
                                                        loading="lazy"
                                                        srcSet={author?.profileImage}
                                                        className=" rounded-full object-cover h-12 w-12 "
                                                    />
                                                    <div className="flex flex-col gap-y-2 grow shrink-0 my-auto basis-0 w-fit">
                                                        <div className="flex gap-2.5 self-start">
                                                            <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
                                                                {card?.category.join( ", " )}
                                                            </div>
                                                        </div>

                                                        <div className=" text-white text-opacity-50">
                                                            {card?.authorName} | {formatDateTime( card?.createdAt )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="h-7 w-7 bg-[#1C1C1D] hover:bg-[#232324] flex justify-center items-center  rounded-full">
                                                    <IoBookmarkOutline className="h-4 w-4 cursor-pointer text-neutral-400" />
                                                </div>
                                            </div>

                                            <div className="flex overflow-hidden relative flex-col flex-wrap gap-1.5 items-start pt-96 pr-20 w-full min-h-[450px] max-md:pt-24 max-md:pr-5 max-md:max-w-full rounded-lg">
                                                {card?.postType?.toLowerCase() === "video post" ? (
                                                    <video
                                                        src={card?.previewImageUrl}
                                                        controls
                                                        className="object-cover absolute inset-0 size-full"
                                                    />
                                                ) : (
                                                    <img
                                                        loading="lazy"
                                                        src={card?.previewImageUrl}
                                                        alt={card?.title}
                                                        className="object-cover absolute inset-0 size-full"
                                                    />
                                                )}
                                            </div>

                                            <div className="mt-5 text-base leading-7 text-zinc-400 max-md:mr-2 max-md:max-w-full">
                                                <h1 className=" text-2xl font-medium text-white ">
                                                    {card?.title}
                                                </h1>

                                                <div className="mt-5 ">
                                                    <HtmlContent htmlContent={card?.description || ""} />
                                                </div>
                                            </div>
                                        </div>
                                        :
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
                                            {/* provide any three cards here with any three different categories */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mt-4 ">
                                                {getRandomPosts.map( ( post: any ) => (
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
                                                ) )}
                                            </div>
                                        </>
                                }
                            </>
                        }

                    </div>


                    {/* right */}
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

                            {!user ? (
                                <div className="  flex items-center justify-evenly py-6">
                                    <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg" onClick={() => router.push( "/auth/user/signup" )}>
                                        Join for free
                                    </button>
                                    <p className="text-lg hover:underline" onClick={() => router.push( "/auth/user/login" )}>Sign In</p>
                                </div>
                            ) : (
                                    <div className="  flex items-center justify-end gap-4 py-6 cursor-pointer" onClick={() => router.push( "/view-profile" )}>
                                    <p className="text-lg font-semibold">{user?.name}</p>
                                    <img src={user?.profileImage} alt="" className="w-10 h-10 rounded-full" />
                                </div>
                            )}

                            {/* <div className="mt-5">
                <p className="text-[#999999] mb-2">In this article</p>
                <div className="flex gap-3">
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">What to Expect</button>
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">Polkadot</button>
                </div>
              </div> */}

                            {/* <div className=" w-full border border-[#17161B] mt-6 bg-[#0A090F] rounded flex justify-center">
                <h1 className="uppercase text-lg font-semibold text-[#CCCCCC] p-4">Friend & Sponsor</h1>
              </div> */}

                            {/* <div className="flex gap-5 justify-between mt-6 ">
                <div className="flex flex-col my-auto">
                  <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300">
                    Sony And Startale Team Up For L2 Rollup: Soneium
                  </div>
                  <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                    November 29, 2019
                  </div>
                </div>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="h-20 w-16 object-cover"
                />
              </div> */}

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
                                        {emailError && <p className="text-red-500 text-center">{emailError}</p>}
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="py-4 px-5 rounded-3xl bg-black border border-neutral-700"
                                        />
                                        <button className="py-4 px-12 bg-red-600 hover:bg-red-500 rounded-3xl whitespace-nowrap disabled:cursor-not-allowed" onClick={CreateSubscriber} disabled={!email || !!emailError} >
                                            Join for free
                                        </button>

                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex gap-5 justify-between mt-7">
                <div className="flex flex-col my-auto">
                  <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300 max-md:pr-5">
                    Telegram Founder Faces French Arrest; Crypto Leaders React
                  </div>
                  <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                    November 29, 2019
                  </div>
                </div>
                <img
                  loading="lazy"
                  srcSet="https://s3-alpha-sig.figma.com/img/86d1/f753/dd0598df14bfba95cc49375f892a91a3?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MGkwxEi~qO~mZnyzDEy66psRNg-OlxexiftK9uWaPT6GLtztvZh3gCMPejd59271IuqpLRbvHAEg1Xhqry4s4cdwdBT7Y4nhrGUDdutn3Titx4oEAAbOQ3UVJ6VUxxXfNQwx25IEwmvaLFCqf4xL-J8l0f2G61HYOsTixCkOAcdrEYYj8B4UpPIYfq7HavKRkV5ngHydEH~eAXKyDebWu4Q5yj-7ixw4xvOH7vpAHdm7DJ6qtMyEmldB3ViNNoxiaSjo5Y6qZEU3DRQ6UiuOk8PmFmRWHuop-a3PrNWeHeitWUP-Ul2NErhXWr0IbDIhanLrlrFNS0~MhalL7rVwcg__"
                  className="h-20 w-16 object-cover"
                />
              </div> */}

                            {/* <div className="flex gap-5 justify-between mt-7">
                <div className="flex flex-col my-auto">
                  <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300 max-md:pr-5">
                    Telegram Founder Faces French Arrest; Crypto Leaders React
                  </div>
                  <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                    November 29, 2019
                  </div>
                </div>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="h-20 w-16 object-cover"
                />
              </div> */}

                            {/* <div className="flex gap-5 justify-between mt-6">
                <div className="flex flex-col my-auto">
                  <div className="py-1.5 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300">
                    Noel Gallagher says Liam’s tweets are
                    <br />
                    the reason Oasis won’t reunite
                  </div>
                  <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                    November 29, 2019
                  </div>
                </div>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="h-20 w-16 object-cover"
                />
              </div> */}

                            {/* <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
                <h1 className="text-white text-xl">Advertisement</h1>
              </div> */}

                            {/* <div className="flex gap-5 justify-between self-end mt-16 max-w-full w-[272px] max-md:mt-10">
                <div className="self-end mt-6 text-xs font-semibold leading-loose text-neutral-400">
                  3687<span className="font-bold"> Followers</span>
                </div>
                <button className="px-4 py-1 text-neutral-400 border border-neutral-700">
                  Follow
                </button>
              </div> */}

                            {/* <div className="flex mt-8 ">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-square w-[114px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]"
                />
              </div> */}

                            {/* <div className="flex ">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                />
              </div> */}

                            {/* <div className="flex">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                />
              </div>

              <h1 className="self-start mt-14 text-base font-medium leading-loose text-zinc-300 max-md:mt-10 max-md:ml-1.5">
                @username
              </h1> */}
                        </div>
                    </div>
                </div>


                {/* Comment section */}
                <div className="mt-20 max-w-full w-[86%] max-md:mt-10 ">
                    {card && <DiscussionEmbedComponent article={card} />}
                </div>
                {/* <div className="flex  shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" /> */}
            </div>

            {/* Author section */}
            {card && (
                <div className="mt-5 lg:ml-52 rounded-lg px-20">
                    <div className="py-10 flex border-neutral-800">
                        <div className="flex flex-col gap-3">
                            <img
                                src={author?.profileImage}
                                alt={author?.name || "No author found"}
                                className="h-14 w-14 rounded-full object-cover"
                            />

                            <h1 className="xl font-semibold"> Written by {author?.name || "Unknown"}</h1>

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

                            <p className="text-justify text-sm text-[#ADADAD] w-[80%]">
                                {author?.bio}
                            </p>

                        </div>

                    </div>
                </div>
            )}



            <div className="mt-5 lg:ml-52 bg-[#0A090F] rounded-lg">
                {/* <div className="py-10 border-b border-neutral-800">
          <div className="flex flex-col gap-5">
            <img
              src={author?.profileImage} 
              alt={author?.name || "No author found"}
              className="h-14 w-14 rounded-full object-cover"
            />

            <h1>Written by {author?.name || "Unknown"}</h1>

            <div className="flex gap-5 items-center">
              <div className="flex gap-2">
                <p>{author?.posts?.length} Articles</p>

              </div>

              <div className="flex gap-1">
                <div className="w-10 cursor-pointer h-10 bg-[#4e4e50] rounded-full flex justify-center items-center">
                  <FaLinkedin className="w-5 h-5" />
                </div>

                <div className="w-10 h-10 cursor-pointer bg-[#4e4e50] rounded-full flex justify-center items-center">
                  <FaTwitter className="w-5 h-5" />
                </div>
              </div>
            </div>

            <p className="w-[60%] text-[#ADADAD]">
              {author?.bio} {" "}

            </p>
          </div>
        </div>  */}

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
                            <h1 className="text-3xl pb-2 font-semibold text-[#FFFFFF]">Receive your daily crypto update</h1>
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
                                        disabled={!email || !!emailError}
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
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CardDetails;
