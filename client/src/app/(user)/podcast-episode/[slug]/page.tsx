"use client";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IoSearchOutline} from "react-icons/io5";
import {FaBookmark, FaEye, FaFacebookSquare, FaLinkedin, FaTwitter} from "react-icons/fa";
import {IoLogoYoutube} from "react-icons/io";
import {FaXTwitter} from "react-icons/fa6";
import instance from "@/utils/axios";
import {getAllPodcasts} from "@/app/redux/feature/podcast/api";
import {toast} from "react-toastify";

const PodcastDetails = () => {
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
    const allPodcasts = useAppSelector( ( state: any ) => state.podcast?.podcasts );

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
        } finally {
            setIsLoading( false );
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

    const createSubscriber = async () => {
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
        const shareUrl = `${window.location.origin}/podcast-episode/${slug}`;
        const shareTitle = podcast?.title || 'Check out this podcast';
        const shareText = 'I found this interesting podcast on Blockbar. Check it out!';

        if ( navigator.share ) {
            console.log( "share:-", navigator.share );
            try {
                await navigator.share( {
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                } );
                toast.success( 'Shared successfully!' );
            } catch ( error ) {
                console.error( 'Error sharing:', error );
                fallbackCopyToClipboard( shareUrl );
            }
        } else {
            fallbackCopyToClipboard( shareUrl );
        }
    };

    const fallbackCopyToClipboard = ( text: string ) => {
        navigator.clipboard.writeText( text ).then( () => {
            toast.success( 'Link copied to clipboard!' );
        } ).catch( ( err ) => {
            console.error( 'Failed to copy: ', err );
            toast.error( 'Failed to copy link. Please try again.' );
        } );
    };

    return (
        <div className="lg:ml-40 bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                            </div>
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    data.map( ( post ) => (
                                        <PodcastCard key={post._id} post={post} handleShare={handleShare} handleBookmark={handleBookmark} handleBookmarkRemove={handleBookmarkRemove} formatDateTime={formatDateTime} user={user} />
                                    ) )
                                ) : podcast ? (
                                    <PodcastCard post={podcast} handleShare={handleShare} handleBookmark={handleBookmark} handleBookmarkRemove={handleBookmarkRemove} formatDateTime={formatDateTime} user={user} />
                                ) : (
                                    <NoPodcastFound slug={slug} getRelatedPodcasts={getRelatedPodcasts} router={router} />
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <Sidebar user={user} router={router} email={email} handleEmailChange={handleEmailChange} emailError={emailError} createSubscriber={createSubscriber} />
                    </div>
                </div>

                {/* Comment section */}
                {podcast && (
                    <div className="mt-12 lg:ml-16">
                        <DiscussionEmbedComponent article={podcast} />
                    </div>
                )}

                {/* Author section */}
                {podcast && <AuthorSection author={author} />}

                {/* Newsletter and Footer */}
                <NewsletterSection email={email} handleEmailChange={handleEmailChange} emailError={emailError} createSubscriber={createSubscriber} isTermsAndPrivacy={isTermsAndPrivacy} setIsTermsAndPrivacy={setIsTermsAndPrivacy} termsCheckboxRef={termsCheckboxRef} />
                <Footer />
            </div>
        </div>
    );
};

const PodcastCard = ( {post, handleShare, handleBookmark, handleBookmarkRemove, formatDateTime, user} ) => (
    <div className="bg-[#0A090F] rounded-xl border border-[#17161B] overflow-hidden shadow-lg mb-8">
        <div className="p-6">
            <div className="w-full h-auto mb-4">
                <HtmlContent htmlContent={post?.embededCode || ""} />
            </div>
            <p className="text-lg text-[#DF841C] text-center">Podcast</p>
            <h1 className="mt-2 text-center text-2xl lg:text-3xl font-medium text-[#BBBBBB]">{post?.title}</h1>
            <p className="text-center mt-2 text-[#999999] capitalize">{post?.permaLink.split( "-" ).join( " " )}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
                {post?.category.map( ( cat ) => (
                    <button key={cat} className="py-1.5 px-6 bg-[#0A090F] border border-[#17161B] rounded text-[#999999]">
                        {cat}
                    </button>
                ) )}
            </div>
            <div className="mt-3 flex justify-center items-center gap-4 text-[#999999] flex-wrap">
                <span>{formatDateTime( post?.createdAt )}</span>
                <span className="flex items-center gap-1">
                    <FaEye className="mr-1" />
                    {post?.views || 0} views
                </span>
                <button onClick={handleShare} className="flex items-center gap-1">
                    <img src="/asset/share1.svg" alt="Share" className="w-5 h-5" />
                    Share
                </button>
                {post?.bookmarkedBy?.includes( user?._id ) ? (
                    <button onClick={() => handleBookmarkRemove( post?._id )} className="flex items-center gap-1">
                        <FaBookmark className="w-5 h-5" />
                        Bookmarked
                    </button>
                ) : (
                    <button onClick={() => handleBookmark( post?._id )} className="flex items-center gap-1">
                        <img src="/asset/Bookmark.svg" alt="Bookmark" className="w-5 h-5" />
                        Bookmark
                    </button>
                )}
            </div>
        </div>
    </div>
);

const NoPodcastFound = ( {slug, getRelatedPodcasts, router} ) => (
    <div className="space-y-8">
        <div className="bg-gray-700 rounded-xl p-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">No podcast found</h1>
            <p className="text-gray-400">
                No podcast found for "{slug}". Browse other podcasts.
            </p>
        </div>
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
                You can explore other podcasts here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRelatedPodcasts.map( ( podcast ) => (
                    <RelatedPodcastCard key={podcast._id} podcast={podcast} router={router} />
                ) )}
            </div>
        </div>
    </div>
);

const RelatedPodcastCard = ( {podcast, router} ) => (
    <div
        className="bg-[#0A090F] rounded-xl border border-[#17161B] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => router.push( `/podcast-episode/${podcast.permaLink}` )}
    >
        <img
            src={podcast.previewImageUrl}
            alt={podcast.title}
            className="w-full h-44 object-cover"
        />
        <div className="p-4">
            <div className="flex gap-2 items-center mb-2">
                {podcast?.category && podcast.category.length > 0 && (
                    <span className="bg-[#DF841C] py-0.5 px-3 text-sm text-[#230E00] font-semibold rounded">
                        {podcast.category[0]}
                    </span>
                )}
                <span className="text-[#767676] text-sm">
                    {podcast.createdAt ? formatDateTime( podcast.createdAt ) : "No date available"}
                </span>
            </div>
            <h3 className="text-lg font-semibold text-[#CCCCCC] line-clamp-2 mb-2">
                {podcast.title}
            </h3>
            <div
                className="text-sm text-[#B0AFAF] line-clamp-2"
                dangerouslySetInnerHTML={{__html: podcast.description}}
            />
        </div>
    </div>
);

const Sidebar = ( {user, router, email, handleEmailChange, emailError, createSubscriber} ) => (
    <div className="space-y-6">
        <div className="relative">
            <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#0A090F] text-[#7B7A7F] px-4 py-2 rounded border border-[#28272D] focus:outline-none"
            />
            <button className="absolute right-0 top-0 bg-[#DF841C] text-white px-3 py-2 rounded">
                <IoSearchOutline className="h-6 w-6" />
            </button>
        </div>

        {!user ? (
            <div className="flex items-center justify-between py-6">
                <button className="py-3.5 px-8 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg" onClick={() => router.push( "/auth/user/signup" )}>
                    Join for free
                </button>
                <button className="text-lg hover:underline" onClick={() => router.push( "/auth/user/login" )}>Sign In</button>
            </div>
        ) : (
            <div className="flex items-center justify-end gap-4 py-6 cursor-pointer" onClick={() => router.push( "/view-profile" )}>
                <p className="text-lg font-semibold">{user?.name}</p>
                <img src={user?.profileImage} alt="" className="w-10 h-10 rounded-full" />
            </div>
        )}

        <div className="bg-[#0A090F] rounded-lg p-8 space-y-6">
            <div className="flex justify-center">
                <img
                    src="/asset/Block-logo.svg"
                    alt="Block Logo"
                    className="h-14 object-contain"
                />
            </div>
            <h2 className="text-3xl font-semibold text-center">
                Level up on crypto, daily
            </h2>
            <p className="text-[#ADADAD] text-center">
                Join the world's most popular crypto community with daily
                alpha, news, & analysis, all free.
            </p>
            {emailError && <p className="text-red-500 text-center">{emailError}</p>}
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
                className="w-full py-4 px-5 rounded-3xl bg-black border border-neutral-700"
            />
            <button
                className="w-full py-4 px-12 bg-red-600 hover:bg-red-500 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createSubscriber}
                disabled={!email || !!emailError}
            >
                Join for free
            </button>
        </div>
    </div>
);

const AuthorSection = ( {author} ) => (
    <div className="bg-[#0A090F] rounded-lg p-8 my-12">
        <div className="flex items-start gap-6">
            <img
                src={author?.profileImage}
                alt={author?.name || "No author found"}
                className="h-14 w-14 rounded-full object-cover"
            />
            <div>
                <h2 className="text-xl font-semibold mb-2">Written by {author?.name || "Unknown"}</h2>
                <div className="flex items-center gap-6 mb-4">
                    <p>{author?.posts?.length} Articles</p>
                    <div className="flex gap-2">
                        <SocialButton Icon={FaLinkedin} />
                        <SocialButton Icon={FaTwitter} />
                    </div>
                </div>
                <p className="text-sm text-[#ADADAD]">{author?.bio}</p>
            </div>
        </div>
    </div>
);

const SocialButton = ( {Icon} ) => (
    <button className="w-8 h-8 bg-[#4e4e50] rounded-full flex items-center justify-center">
        <Icon className="w-4 h-4" />
    </button>
);


const NewsletterSection = ( {email, handleEmailChange, emailError, createSubscriber, isTermsAndPrivacy, setIsTermsAndPrivacy, termsCheckboxRef} ) => (
    <div className="bg-[#0A090F] rounded-lg p-8 my-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Get connected</h2>
                <div className="flex gap-3">
                    <SocialButton Icon={FaLinkedin} />
                    <SocialButton Icon={FaTwitter} />
                    <SocialButton Icon={FaFacebookSquare} />
                    <SocialButton Icon={IoLogoYoutube} />
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-semibold mb-4">Receive your daily crypto update</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full bg-[#1F1C2C] border ${emailError ? 'border-red-500' : 'border-[#474457]'} text-white py-3.5 px-5 rounded-lg focus:outline-none`}
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1 absolute">{emailError}</p>
                        )}
                    </div>
                    <button
                        className="bg-orange-500 text-white px-10 py-3.5 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                        disabled={!email || !!emailError || !isTermsAndPrivacy}
                        onClick={createSubscriber}
                    >
                        Join for Free
                    </button>
                </div>
                <div className="flex items-start mt-4">
                    <input
                        type="checkbox"
                        id="agree"
                        className="mr-2 mt-1"
                        ref={termsCheckboxRef}
                        onChange={() => {
                            setIsTermsAndPrivacy( !isTermsAndPrivacy );
                            handleEmailChange( {target: {value: email}} );
                        }}
                    />
                    <label htmlFor="agree" className="text-gray-400 text-sm">
                        By joining, I agree to the Blockbar{" "}
                        <a href="/terms-and-conditions" className="underline text-gray-300">
                            Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" className="underline text-gray-300">
                            Privacy Policy
                        </a>{" "}
                        statements.
                    </label>
                </div>
            </div>
        </div>
    </div>
); 

export default PodcastDetails;
