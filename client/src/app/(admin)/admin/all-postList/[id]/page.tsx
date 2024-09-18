"use client";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import instance from "@/utils/axios";
import {notifySuccess} from "@/utils/toast";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
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

const CardDetails = () => {
  const {id} = useParams();
  const [card, setCard] = useState<CardData>();
  const [status, setStatus] = useState<string | undefined>( card?.status );
  const admin = useAppSelector( ( state: any ) => state.superAdmin.admin );
  const author = useAppSelector( ( state: any ) => state?.contributor?.author );
  // console.log( "author:-", author );
  const dispatch = useAppDispatch();

  useEffect( () => {
    fetchCurrentPost( id as string );
  }, [] );

  const fetchCurrentPost = async ( id: string ) => {
    try {
      const response = await instance.get( `/post/post/${id}` );
      // console.log( "response:-", response );
      getAuthor( dispatch, response?.data?.post?.creatorId );
      setCard( response?.data?.post );
      setStatus( response?.data?.post?.status.toLowerCase() );
    } catch ( error ) {
      console.log( "error:-", error );
    }
  };

  const updateStatus = async ( newStatus: string ) => {
    try {
      const response = await instance.put( `/post/post/${id}`, {status: newStatus} );
      console.log( "response in updating:-", response );
      notifySuccess( response.data?.message );
      if ( response.status === 200 ) {
        createNotifcation( author?._id, admin?._id, newStatus );
      }
    } catch ( error ) {
      console.log( "error in updating:-", error );
    }
  };

  const createNotifcation = async ( receiver: string, sender: string, status: string ) => {
    try {
      const response = await instance.post( "/notification/create-notification", {sender, receiver, message: `Your post ${card?.title}  has been ${status.toLowerCase() === "published" ? "published" : "rejected"} by ${admin?.name} on behalf of admin`} );
      console.log( "response after creating notification:-", response );
    } catch ( error ) {
      console.error( "Error creating notification:", error );
    }
  };



  if ( !card ) {
    return (
      <div className="ml-64  bg-[#0A090F] px-8 py-8  text-white m-4 rounded-2xl w-full border border-[#28272D] ">
        <div className="flex gap-2 items-center">
          <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
          <h1 className="text-[#999999] font-semibold text-2xl">
            Blog Details
          </h1>
        </div>
        {/* no blog found */}
        <div className="flex flex-col mt-5 px-28 ">
          <h1 className="mt-5 lg:text-4xl md:text-2xl text-2xl font-medium text-white  max-md:mt-10 max-md:max-w-full line-clamp-2"> No Blog Found for this id </h1>
        </div>

      </div>
    );
  }

  return (
    <div className="ml-64  bg-[#0A090F] px-8 py-8  text-white m-4 rounded-2xl w-full border border-[#28272D] ">
      <div className="flex gap-2 items-center">
        <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
        <h1 className="text-[#999999] font-semibold text-2xl">
          Blog Details
        </h1>
      </div>
      <div className="flex flex-col mt-5 px-28 ">
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="mt-5 lg:text-4xl md:text-2xl text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full line-clamp-2">
            {card.title}
          </h1>

          {/* Author Info and Metadata */}
          <div className="mt-3 flex flex-wrap gap-4 items-center">
            {/* Author profile picture and name */}
            <div className="flex items-center gap-3">
              <img
                loading="lazy"
                src={author?.profileImage}
                alt={author?.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="text-sm text-neutral-400 py-4 ">
                <button className="bg-[#DF841C] py-1 px-4 my-2 rounded-md text-white font-semibold text-sm">
                  {card.category.join( ", " )}
                </button>
                <p className="font-medium text-white">
                  <span
                    className="text-neutral-400"
                  >
                    By :-
                  </span>
                  {" "} {author?.name || "Unknown Author"}</p>
                {/* <p className="text-neutral-400">{author?.bio || "No bio available"}</p> */}
                {/* <p className="text-sm text-neutral-400">Status: {status}</p> */}
              </div>
            </div>

            {/* Category button */}

            {/* Date */}
            {/* <p className="text-sm text-neutral-400">{new Date( card.date ).toLocaleDateString()}</p> */}

            {/* Status */}
          </div>

          {/* Preview image */}
          <img
            loading="lazy"
            src={card.previewImageUrl}
            alt={card.title}
            className="w-full object-cover rounded mt-4"
          />
        </div>

        <div className="mt-4 "> <div className="text-neutral-400 mt-3" dangerouslySetInnerHTML={{__html: card?.description || ""}} />
        </div>

        <div className="flex justify-end mt-5 gap-5 font-roboto">
          <button className="bg-[#7B7A7F] py-2 px-5 rounded-lg" onClick={() => updateStatus( 'Draft' )} > Draft </button>
          <button className="bg-[#DF841C] py-2 px-5 rounded-lg" onClick={() => updateStatus( 'Published' )} > Publish </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
