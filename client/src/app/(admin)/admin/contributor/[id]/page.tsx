"use client";
import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import instance from "@/utils/axios";
import {notifyError, notifySuccess} from "@/utils/toast";
import {ClipLoader} from 'react-spinners';
import {useAppSelector} from '@/app/redux/hooks';
import {RootState} from '@/app/redux/store';

type CardData = {
  _id: string;
  imgSrc: string;
  title: string;
  category: string[];
  date: string;
  description: string;
  permaLink?: string;
  publishedDate?: Date;
  visibility?: string;
  status: string;
  tags?: string[];
  postSliderImageUrl?: string;
  postSettingImageUrl?: string;
  previewImageUrl?: string;
  authorName?: string;
  postType?: string;
};

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  contributor: boolean;
  phone?: string;
  address?: string;
  country?: string;
  posts: string[];
}

const Page = () => {
  const [user, setUser] = useState<User | null>( null );
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [contributor, setContributor] = useState<boolean>( false );
  const [posts, setPosts] = useState<CardData[]>( [] );
  const [currentPage, setCurrentPage] = useState<number>( 1 );
  const [postsPerPage, setPostsPerPage] = useState<number>( 8 );
  const [totalPages, setTotalPages] = useState<number>( 1 );
  const admin = useAppSelector( ( state: any ) => state.superAdmin.admin );
  const router = useRouter();
  const {id} = useParams();
  // console.log("admin:-",admin)

  const fetchUserById = async ( _id: string ) => {
    try {
      const response = await instance.get( `/auth/user/${_id}` );
      setUser( response?.data?.user );
      setContributor( response?.data?.user.contributor );
      fetchPosts( response?.data?.user?.posts, currentPage, postsPerPage );
    } catch ( error ) {
      console.error( "Error fetching user:", error );
      notifyError( "Failed to fetch user data. Please try again later." );
    } finally {
      setIsLoading( false );
    }
  };

  useEffect( () => {
    if ( id ) {
      fetchUserById( id as string );
    }
  }, [id] );

  const fetchPosts = async ( ids: string[], page: number, limit: number ) => {
    try {
      const response = await instance.post( "/post/postForCreator", {ids, page, limit} );
      console.log( "response:-", response.data );
      setPosts( response.data.posts );
      setCurrentPage( response.data.currentPage );
      setTotalPages( response.data.totalPages );
    } catch ( error ) {
      console.error( "Error fetching posts:", error );
      notifyError( "Failed to fetch posts. Please try again later." );
    }
  };

  const handleContributorChange = async () => {
    const newContributorStatus = !contributor;
    try {
      await handleUpdate( newContributorStatus );
      setContributor( newContributorStatus );
      notifySuccess( "Contributor status updated successfully" );
    } catch ( error ) {
      console.error( "Error updating contributor:", error );
      notifyError( "An error occurred while updating contributor status. Please try again later." );
    }
  };

  const handleUpdate = async ( newStatus: boolean ) => {
    const response = await instance.put( `/auth/user/${id}`, {isContributor: newStatus} );
    console.log( "response:-", response );
    if ( response.status === 200 && admin ) {
      createNotifcation( id as string, admin?._id, admin?.name, admin?.profileImage );
    }
  };

  const createNotifcation = async ( receiver: string, sender: string, senderName:string,senderImage:string ) => {
    try {
      const response = await instance.post( "/notification/create-notification", {sender, receiver, senderName,senderImage, message: !contributor ? "You are now a contributor  and can create your own block" : "You are no longer a contributor and now you will not able to create the block "} );
      console.log( "response after creating notification:-", response );
    } catch ( error ) {
      console.error( "Error creating notification:", error );
    }
  };

  const handlePageChange = ( newPage: number ) => {
    setCurrentPage( newPage );
    if ( user?.posts ) {
      fetchPosts( user.posts, newPage, postsPerPage );
    }
  };

  const handlePostsPerPageChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    const newPostsPerPage = parseInt( event.target.value, 10 );
    setPostsPerPage( newPostsPerPage );
    setCurrentPage( 1 );
    if ( user?.posts ) {
      fetchPosts( user.posts, 1, newPostsPerPage );
    }
  };

  if ( isLoading ) {
    return <div className="flex justify-center items-center h-screen mx-auto">
      <ClipLoader color="#DF841C" size={50} />
    </div>;
  }

  return (
    <div className="ml-64 bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D]">
      <div className="border-b border-[#28272D] px-4 py-4">
        <h2 className="text-xl px-6">Contributor Profile</h2>
      </div>
      <div className="px-8">
        <div className="flex items-center justify-between mt-6 border border-[#28272D] rounded-lg px-4 py-3 bg-[#1B1923]">
          <div className="flex gap-10 items-center">
            <img src={user?.profileImage || "/default-profile.jpg"} alt="Profile Photo" className="w-24 h-24 cursor-pointer rounded-full object-cover bg-gray-700" />
            <div>
              <h3 className="font-semibold">{user?.name || "N/A"}</h3>
              <p className="text-sm text-gray-400">{user?.email || "N/A"}</p>
              <p className="text-sm text-gray-400">{user?.phone || "N/A"}</p>
              <p className="text-sm text-gray-400">{user?.address || "N/A"}</p>
              <p className="text-sm text-gray-400">{user?.country || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm mr-2">Contribute</span>
            <div
              onClick={handleContributorChange}
              className={`flex items-center w-24 h-10 rounded-full p-1 cursor-pointer ${contributor ? 'bg-orange-500' : 'bg-gray-300'}`}
            >
              <div
                className={`flex items-center justify-center w-11 h-8 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${contributor ? 'translate-x-full' : ''}`}
              >
                <span className={`text-sm font-semibold w-fit ${contributor ? 'text-orange-500' : 'text-gray-400'}`}>
                  {contributor ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 px-8 mb-4">
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 items-center">
            <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
            <h1 className="text-[#999999] font-semibold text-2xl">
              Contributor Blog
            </h1>
          </div>
          <div>
            <label htmlFor="postsPerPage" className="mr-2">Posts per page:</label>
            <select id="postsPerPage" value={postsPerPage} onChange={handlePostsPerPageChange} className="bg-[#1B1923] text-white border border-[#28272D] rounded p-2">
              <option value={8}>8</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4 mt-4">
          {posts.length ? posts.map( ( card ) => (
            <div key={card._id} className="flex flex-col border border-neutral-700 rounded-lg overflow-hidden cursor-pointer" onClick={() => router.push( `/admin/contributor/${id}/${card._id}` )}>
              <img
                loading="lazy"
                src={card.previewImageUrl || "/default-post-image.jpg"}
                className="h-40 w-full object-cover"
                alt={card.title}
              />
              <div className="p-4 flex flex-col h-full">
                <div className="flex gap-2 items-center mb-2">
                  <span className="bg-[#DF841C] py-0.5 px-2 text-xs rounded">
                    {card.category.join( ", " )}
                  </span>
                  <p className="text-xs text-neutral-400">{card.date}</p>
                </div>
                <h1 className="text-lg text-white font-semibold mb-2 line-clamp-2">
                  {card.title}
                </h1>
                <p >
                  <span className="text-sm text-neutral-400"> Status :- </span>
                  <span className={`text-sm capitalize ${card.status.toLowerCase() === 'published' ? 'text-green-500' : card.status.toLowerCase() === 'draft' ? 'text-yellow-500' : 'text-white'}`}>  {" "}{card.status} </span>
                </p>
              </div>
            </div>
          ) ) : (
            <div className="col-span-full">
              <div className="flex items-center justify-center border-[#28272D] rounded-lg py-16 w-full bg-[#1B1923]">
                <img loading='lazy' src="/asset/no_blog_found.svg" alt="No Blog Found" />
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex justify-between items-center mt-4 px-8">
            <div className="text-[#7B7A7F]">
              Showing {( currentPage - 1 ) * postsPerPage + 1} to {Math.min( currentPage * postsPerPage, posts.length )} of {posts.length} entries
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handlePageChange( currentPage - 1 )} disabled={currentPage === 1}>
                <img src="/asset/Group 12367.svg" alt="Previous" />
              </button>
              {[...Array( totalPages ).keys()].map( ( number ) => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange( number + 1 )}
                  className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
                >
                  {number + 1}
                </button>
              ) )}
              <button onClick={() => handlePageChange( currentPage + 1 )} disabled={currentPage === totalPages}>
                <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;