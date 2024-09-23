"use client";
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import instance from "@/utils/axios";
import {notifySuccess} from "@/utils/toast";
import HtmlContent from "@/components/HtmlContent";

type ContentData = {
  _id: string;
  title: string;
  category: string[];
  publishedDate?: Date;
  visibility?: string;
  status: string;
  tags?: string[];
  authorName?: string;
  postType?: string;
  // Post-specific fields
  description?: string;
  permaLink?: string;
  postSliderImageUrl?: string[];
  postSettingImageUrl?: string;
  previewImageUrl?: string;
  creatorId?: any;
  authorId?: any;
  // Podcast-specific fields
  embededCode?: string;
};

const ContentDetails = () => {
  const {id} = useParams();
  const [content, setContent] = useState<ContentData>();
  const [contentType, setContentType] = useState<'post' | 'podcast'>( 'post' );
  const admin = useAppSelector( ( state: any ) => state.superAdmin.admin );
  const author = useAppSelector( ( state: any ) => state?.contributor?.author );
  const adminAuthor = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const dispatch = useAppDispatch();

  useEffect( () => {
    fetchCurrentContent( id as string );
  }, [id] );

  const fetchCurrentContent = async ( id: string ) => {
    try {
      // First, try to fetch as a post
      try {
        const postResponse = await instance.get( `/post/post/${id}` );
        console.log( "post response:", postResponse );
        if ( postResponse.data?.post ) {
          setContent( postResponse.data.post );
          setContentType( 'post' );
          return; // Exit the function if post is found
        }
      } catch ( postError ) {
        console.log( "Post not found, trying podcast" );
      }

      // If post is not found or throws an error, try to fetch as a podcast
      const podcastResponse = await instance.get( `/podcast/podcasts/${id}` );
      console.log( "podcast response:", podcastResponse );
      if ( podcastResponse.data ) {
        setContent( podcastResponse.data );
        setContentType( 'podcast' );
      } else {
        throw new Error( "Content not found" );
      }
    } catch ( error ) {
      console.log( "error:", error );
      // Handle the error appropriately, e.g., set an error state or show a message to the user
    } finally {
      // This block will run regardless of whether we found a post, podcast, or neither
      if ( content?.creatorId ) {
        getAuthor( dispatch, content.creatorId );
      } else if ( content?.authorId ) {
        getAdminAuthor( dispatch, content.authorId );
      }
    }
  };

  const updateStatus = async ( newStatus: string ) => {
    try {
      const endpoint = contentType === 'post' ? `/post/post/${id}` : `/podcast/${id}`;
      const response = await instance.put( endpoint, {status: newStatus} );
      notifySuccess( response.data?.message );
      if ( response.status === 200 ) {
        setContent( prevContent => ( {
          ...prevContent!,
          status: newStatus,
        } ) );
        createNotification( author?._id, admin?.name, admin?.profileImage, admin?._id, newStatus );
      }
    } catch ( error ) {
      console.log( "error in updating:-", error );
    }
  };

  const createNotification = async ( receiver: string, senderName: string, senderImage: string, sender: string, status: string ) => {
    try {
      const response = await instance.post( "/notification/create-notification", {
        sender,
        senderName,
        senderImage,
        receiver,
        message: `Your ${contentType} ${content?.title} has been ${status.toLowerCase() === "published" ? "published" : "rejected"} by ${admin?.name} on behalf of admin`,
      } );
      console.log( "response after creating notification:-", response );
    } catch ( error ) {
      console.error( "Error creating notification:", error );
    }
  };

  if ( !content ) {
    return (
      <div className="ml-64 bg-[#0A090F] px-8 py-8 text-white m-4 rounded-2xl w-full border border-[#28272D]">
        <div className="flex gap-2 items-center">
          <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
          <h1 className="text-[#999999] font-semibold text-2xl">Content Details</h1>
        </div>
        <div className="flex flex-col mt-5 px-28">
          <h1 className="mt-5 lg:text-4xl md:text-2xl text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full line-clamp-2">No Content Found for this id</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 bg-[#0A090F] px-8 py-8 text-white m-4 rounded-2xl w-full border border-[#28272D]">
      <div className="flex gap-2 items-center">
        <img src="/asset/Group 12856.svg" alt="" className="h-10 w-10" />
        <h1 className="text-[#999999] font-semibold text-2xl">{contentType === 'post' ? 'Blog' : 'Podcast'} Details</h1>
      </div>
      <div className="flex flex-col mt-5 px-28">
        <div className="flex flex-col">
          <h1 className="mt-5 lg:text-4xl md:text-2xl text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full line-clamp-2">{content.title}</h1>

          <div className="mt-3 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3">
              <img
                loading="lazy"
                src={author?.profileImage || adminAuthor?.profileImage}
                alt={author?.name || adminAuthor?.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="text-sm text-neutral-400 py-4">
                <button className="bg-[#DF841C] py-1 px-4 my-2 rounded-md text-white font-semibold text-sm">
                  {content.category.join( ", " )}
                </button>
                <p className="font-medium text-white">
                  <span className="text-neutral-400">By :-</span> {author?.name || adminAuthor?.name || "Unknown Author"}
                </p>
              </div>
            </div>
          </div>

          {contentType === 'post' && (
            content.postType?.toLowerCase() === "video post" ? (
              <video
                src={content.previewImageUrl}
                controls
                className="w-full object-cover rounded mt-4"
              />
            ) : (
              <img
                loading="lazy"
                src={content.previewImageUrl}
                alt={content.title}
                className="w-full object-cover rounded mt-4"
              />
            )
          )}

          {contentType === 'podcast' && (
            <div className="mt-4" dangerouslySetInnerHTML={{__html: content.embededCode || ""}} />
          )}
        </div>

        {contentType === 'post' && content.description && (
          <div className="mt-4">
            <HtmlContent htmlContent={content.description} />
          </div>
        )}

        <div className="flex justify-end mt-5 gap-5 font-roboto">
          <button
            className={`relative bg-[#7B7A7F] py-2 px-5 rounded-lg ${content?.status?.toLowerCase() === "draft" ? "cursor-not-allowed opacity-50" : "hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:rounded-full hover:before:z-10"}`}
            disabled={content?.status?.toLowerCase() === "draft"}
            onClick={() => updateStatus( "Draft" )}
          >
            Draft
          </button>
          <button
            className={`relative bg-[#DF841C] py-2 px-5 rounded-lg ${content?.status?.toLowerCase() === "published" ? "cursor-not-allowed opacity-50" : "hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:rounded-full hover:before:z-10"}`}
            disabled={content?.status?.toLowerCase() === "published"}
            onClick={() => updateStatus( "Published" )}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;