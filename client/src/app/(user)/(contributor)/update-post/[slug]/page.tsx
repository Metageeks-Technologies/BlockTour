"use client";
import React, {useEffect, useState, useCallback} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  MdClose,
  MdKeyboardArrowDown,
  MdOutlineCloudUpload,
} from "react-icons/md";
import axios from "axios";
import instance from "@/utils/axios";
import {notifyError, notifyWarn} from "@/utils/toast";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import {useParams, useRouter} from "next/navigation";
import {getAllCategories} from "@/app/redux/feature/category/api";

const ReactQuill = dynamic( () => import( "react-quill" ), {ssr: false} );

const UpdatePostPage = () => {
  const {slug} = useParams<{slug: string;}>();

  const [isLoading, setIsLoading] = useState( false );
  const [sliderImages, setSliderImages] = useState<File[]>( [] );
  const [previewImage, setPreviewImage] = useState<File | null>( null );
  const [newPreviewImage, setNewPreviewImage] = useState<File | null>( null );
  const [newPreviewImageUrl, setNewPreviewImageUrl] = useState<string | null>( null );
  const user = useAppSelector( ( state: any ) => state.contributor.currentUser ) || {};
  const categories = useAppSelector( ( state: any ) => state.category.categories ) || [];
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [data, setData] = useState( {
    title: "",
    permaLink: "",
    description: "",
    publishedDate: new Date().toISOString().split( "T" )[0],
    visibility: "Private",
    status: "Draft",
    postType: "",
    category: [] as string[],
    tags: [] as string[],
    postSliderImageUrl: [] as string[],
    previewImageUrl: "",
    creatorId: "",
    authorName: "",
    _id: ""
  } );

  useEffect( () => {
    getCurrentUser( dispatch );
    getAllCategories( dispatch );
  }, [] );

  const formatDateForDisplay = ( date: string ) => {
    const dateObj = new Date( date );
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getUploadUrl = useCallback( async ( fileName: string ): Promise<string> => {
    try {
      const response = await instance.post<{url: string;}>( "/aws/getUploadRrl", {
        folder: "posts",
        fileName,
      } );
      return response.data.url;
    } catch ( error ) {
      console.error( "Error getting upload URL:", error );
      throw error;
    }
  }, [] );

  const handleUpload = useCallback( async ( file: File ): Promise<string | null> => {
    if ( !file ) return null;

    try {
      const uploadUrl = await getUploadUrl( `${file.lastModified}${file.size}${file.name}` );
      if ( !uploadUrl ) return null;

      const res = await axios.put( uploadUrl, file, {
        headers: {"Content-Type": file.type},
      } );

      if ( res.status === 200 ) {
        return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/posts/${file.lastModified}${file.size}${file.name}`;
      }
      return null;
    } catch ( error ) {
      console.error( "Error uploading file:", error );
      return null;
    }
  }, [getUploadUrl] );

  const handleSliderImageChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files ) {
      setSliderImages( ( prev ) => [...prev, ...Array.from( e.target.files as FileList )] );
    }
  }, [] );

  const handlePreviewImageChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files[0] ) {
      const file = e.target.files[0];
      setNewPreviewImage( file );
      setNewPreviewImageUrl( URL.createObjectURL( file ) );
    }
  }, [] );

  const removeNewPreviewImage = useCallback( () => {
    setNewPreviewImage( null );
    setNewPreviewImageUrl( null );
  }, [] );

  const removeSliderImage = useCallback( ( index: number ) => {
    setData( ( prevData ) => ( {
      ...prevData,
      postSliderImageUrl: prevData.postSliderImageUrl.filter( ( _, i ) => i !== index ),
    } ) );
  }, [] );

  const handleCategoryChange = useCallback( ( category: string ) => {
    setData( ( prevData ) => ( {
      ...prevData,
      category: prevData.category.includes( category )
        ? prevData.category.filter( ( cat ) => cat !== category )
        : [...prevData.category, category],
    } ) );
  }, [] );

  const handleTagChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setData( ( prevData ) => ( {
      ...prevData,
      tags: e.target.value.split( "," ).map( ( tag ) => tag.trim() ),
    } ) );
  }, [] );

  const getPostBySlug = async () => {
    try {
      const response = await instance.get( `/post/posts/${slug}` );
      setData( response.data.post );
    } catch ( error: any ) {
      console.error( error );
    }
  };

  useEffect( () => {
    if ( slug ) {
      getPostBySlug();
    }
  }, [slug] );

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setIsLoading( true );

    try {
      let updatedSliderImages = [...data.postSliderImageUrl];
      if ( sliderImages.length > 0 ) {
        const newSliderUrls = await Promise.all( sliderImages.map( ( image ) => handleUpload( image ) ) );
        updatedSliderImages = [...updatedSliderImages, ...newSliderUrls.filter( ( url ): url is string => url !== null )];
      }

      let updatedPreviewImageUrl = data.previewImageUrl;
      if ( newPreviewImage ) {
        const newPreviewImageUploadedUrl = await handleUpload( newPreviewImage );
        if ( newPreviewImageUploadedUrl ) {
          updatedPreviewImageUrl = newPreviewImageUploadedUrl;
        }
      }

      const updatedData = {
        ...data, 
        status: "Draft",
        postSliderImageUrl: updatedSliderImages,
        previewImageUrl: updatedPreviewImageUrl,
      };
console.log("updatedData", updatedData)
      const response = await instance.put( `post/contributor/post/${data._id}`, updatedData );
      alert( "Post updated successfully" );
      console.log( "Form submitted successfully:", response.data );

      createNotification( user?.name, user?.profileImage, user?._id, data?.title );

      router.push( "/dashboard" );
    } catch ( error: any ) {
      notifyError( `${error?.response?.data?.message || "An error occurred"}` );
      console.error( "Error submitting the form:", error );
    } finally {
      setIsLoading( false );
    }
  };

  const createNotification = async ( senderName: string, senderImage: string, sender: string, title: string ) => {
    try {
      await instance.post( "/notification/create-notification", {
        sender,
        senderName,
        senderImage,
        receiver: "66e26d8324ac899fcb8c641e",
        message: `A new post ${title} has been updated by ${senderName}. Please review and publish it`,
      } );
    } catch ( error ) {
      console.error( "Error updating notification:", error );
    }
  };

  return (
    <div className="lg:ml-52 p-4">
      <div className="bg-[#0A090F] text-white sm:rounded-2xl border border-[#28272D]">
        <div>
          <div className="border-b border-[#28272D] sm:px-4 py-4">
            <h1 className="text-2xl px-4">Update Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex sm:flex-row flex-col sm:p-8 p-4 gap-5">
            {/* Left Column (Form Fields) */}
            <div className="lg:basis-[70%] sm:basis-[60%] w-full">
              {/* Post Title */}
              <div className="mb-4">
                <label className="block font-medium mb-1 text-[#7B7A7F]">Post Title</label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input"
                  value={data.title}
                  onChange={( e ) => setData( ( prevData ) => ( {
                    ...prevData,
                    title: e.target.value,
                    permaLink: e.target.value.toLowerCase().replace( / /g, "-" ),
                  } ) )}
                />
              </div>

              {/* Permalink */}
              <div className="mb-6">
                <label className="block font-medium mb-1 text-[#7B7A7F]">Permalink</label>
                <input
                  type="text"
                  placeholder="Enter permalink"
                  className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input"
                  value={data.permaLink}
                  onChange={( e ) => setData( ( prevData ) => ( {...prevData, permaLink: e.target.value} ) )}
                />
              </div>

              {/* Description (Text Editor) */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-3 text-[#7B7A7F]">Description</label>
                <div className="bg-[#0A090F] rounded p-2 border border-[#414141]">
                  <ReactQuill
                    theme="snow"
                    value={data.description}
                    onChange={( value ) => setData( ( prevData ) => ( {...prevData, description: value} ) )}
                    placeholder="Enter description..."
                    modules={{
                      toolbar: [
                        [{font: []}],
                        [{size: []}],
                        ["bold", "italic", "underline", "strike"],
                        [{color: []}, {background: []}],
                        [{script: "sub"}, {script: "super"}],
                        ["blockquote", "code-block"],
                        [{list: "ordered"}, {list: "bullet"}],
                        [{align: []}],
                        ["link", "image"],
                      ],
                    }}
                    formats={[
                      "font", "size", "bold", "italic", "underline", "strike", "color",
                      "background", "script", "blockquote", "code-block", "list", "bullet",
                      "align", "link", "image",
                    ]}
                    className="text-white"
                  />
                </div>
              </div>

              {/* Post Slider Images */}
              <div className="border border-[#414141] p-5 rounded-lg mb-4">
                <h3 className="font-medium mb-2 text-[#7B7A7F]">Post Slider Images</h3>
                <div className="flex items-center justify-center w-full mt-5">
                  <label
                    htmlFor="slider-image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer w-full h-48 border-2 border-dashed border-[#414141] rounded-lg"
                  >
                    <div className="flex flex-col items-center justify-center pb-6">
                      <MdOutlineCloudUpload className="h-8 w-8 text-neutral-600" />
                      <p className="mb-2 mt-4 text-sm text-[#7B7A7F]">
                        <span className="font-semibold">Choose files</span> or drag & drop them here
                      </p>
                      <p className="text-xs text-[#52525B]">Add multiple images for your post slider</p>
                    </div>
                    <input
                      id="slider-image-upload"
                      type="file"
                      className="hidden"
                      onChange={handleSliderImageChange}
                      accept="image/*"
                      multiple
                    />
                    <button
                      type="button"
                      className="mb-2 text-sm text-white bg-[#7B7A7F] hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-lg px-5 py-2"
                    >
                      Browse Files
                    </button>
                  </label>
                </div>
                {data?.postSliderImageUrl.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 text-[#7B7A7F]">Selected Images:</h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.postSliderImageUrl.map( ( image, index ) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Slider image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeSliderImage( index )}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <MdClose className="h-4 w-4" />
                          </button>
                        </div>
                      ) )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (Post Settings) */}
            <div className="lg:basis-[30%] sm:basis-[40%] w-full sm:mt-7">
              <div className="flex flex-col gap-2 ">
                <button
                  type="submit"
                  className="bg-orange-500 sm:block hidden text-white py-2 px-4 rounded hover:bg-orange-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>

              {/* Post Settings */}
              <div className="border border-neutral-700 p-4 rounded-lg mt-5">
                {/* Published Date */}
                <div className="mb-4">
                  <label className="block text-[#7B7A7F] text-sm font-bold mb-2" htmlFor="published-date">
                    Published Date
                  </label>
                  {/* title on hover that you can't edit */}
                  <p className="bg-[#0A090F] text-[#7B7A7F] border border-[#414141] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full hover:cursor-not-allowed " title="You can't edit the published date">
                   {formatDateForDisplay( data.publishedDate )}
                  </p>
                </div>
              </div>
              {/* Categories */}
              <div className="flex flex-col rounded-none mt-5">
                <div className="flex flex-col py-5 w-full rounded-md border border-solid border-neutral-700">
                  <header className="flex px-4 gap-3 self-center w-full text-base whitespace-nowrap text-[#7B7A7F]">
                    <h2 className="grow my-auto">Categories</h2>
                    <MdKeyboardArrowDown className="h-6 w-6" />
                  </header>
                  <div className="mt-3 border-b border-[#414141]" />
                  <div className="flex flex-col px-4 mt-4 w-full">
                    {categories.map( ( category: any, index: number ) => (
                      <div key={index} className="flex mt-1 items-center">
                        <input
                          type="checkbox"
                          checked={data.category.includes( category.name )}
                          onChange={() => handleCategoryChange( category.name )}
                        />
                        <label htmlFor={category.name} className="ml-2 text-[#7B7A7F] text-sm">
                          {category.name}
                        </label>
                      </div>
                    ) )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="border border-[#414141] p-4 mt-5 rounded">
                <div className="flex justify-between">
                  <h1 className="block text-[#7B7A7F] font-bold mb-2">Add Tags (Up to 5)</h1>
                  <MdKeyboardArrowDown className="h-6 w-6" />
                </div>
                <input
                  type="text"
                  id="tags"
                  placeholder="Add tags"
                  value={data.tags.join( ", " )}
                  onChange={handleTagChange}
                  className="bg-[#0A090F] text-[#7B7A7F] placeholder-gray-500 mt-2 border border-[#414141] rounded-lg py-2 px-3 focus:outline-none w-full custom-input"
                />
              </div>

              {/* Post Type */}
              <div className="flex flex-col rounded-none mt-5">
                <div className="flex flex-col py-5 w-full rounded-md border border-solid border-neutral-700">
                  <header className="flex gap-3 px-4 self-center w-full text-base whitespace-nowrap text-zinc-500">
                    <h2 className="grow my-auto">Post Type</h2>
                    <MdKeyboardArrowDown className="h-6 w-6" />
                  </header>
                  <div className="mt-3 border-b border-[#414141]" />
                  <div className="space-y-2 mt-2 mx-3 cursor-pointer">
                    {["Image Post", "Video Post", "Quote Post", "Gallery Post"].map( ( postType ) => (
                      <div key={postType} className="flex items-center">
                        <input
                          type="radio"
                          id={postType}
                          name="postType"
                          value={postType}
                          checked={data.postType === postType}
                          onChange={( e ) => setData( ( prevData ) => ( {...prevData, postType: e.target.value} ) )}
                          className="custom-checkbox"
                        />
                        <label htmlFor={postType} className="ml-2 text-[#7B7A7F] text-sm">
                          {postType}
                        </label>
                      </div>
                    ) )}
                  </div>
                </div>
              </div>

              {/* Preview Image */}
              <div className="flex flex-col rounded-none mt-5">
                <div className="flex flex-col py-5 w-full rounded-md border border-solid border-neutral-700">
                  <header className="flex px-4 gap-3 self-center w-full text-base whitespace-nowrap text-zinc-500">
                    <h2 className="grow my-auto">Preview Image</h2>
                    <MdKeyboardArrowDown className="h-6 w-6" />
                  </header>
                  <div className="mt-3 border-b border-[#414141]" />
                  <div className="flex items-center justify-center w-full mt-5 px-4">
                    <label
                      htmlFor="preview-image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer w-full border-2 border-dashed border-[#7B7A7F] rounded-lg p-4"
                    >
                      <div className="flex flex-col items-center justify-center pb-4">
                        <MdOutlineCloudUpload className="h-8 w-8 text-neutral-600 mt-2" />
                        <p className="mb-2 text-sm text-center text-[#7B7A7F]">
                          <span className="font-semibold">Choose a file</span> or drag & drop it here
                        </p>
                        <p className="text-xs text-center text-[#808089]">
                          Select a preview image for your post
                        </p>
                      </div>
                      <input
                        id="preview-image-upload"
                        type="file"
                        className="hidden"
                        onChange={handlePreviewImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {newPreviewImageUrl ? (
                    <div className="mt-4 px-4 relative">
                      <h4 className="text-sm font-medium mb-2 text-[#7B7A7F]">New Preview Image:</h4>
                      <img
                        src={newPreviewImageUrl}
                        alt="New Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={removeNewPreviewImage}
                        className="absolute top-2 right-6 bg-red-500 text-white rounded-full p-1"
                      >
                        <MdClose className="h-4 w-4" />
                      </button>
                    </div>
                  ) : data?.previewImageUrl ? (
                    <div className="mt-4 px-4">
                      <h4 className="text-sm font-medium mb-2 text-[#7B7A7F]">Current Preview Image:</h4>
                      <img
                        src={data.previewImageUrl}
                        alt="Current Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <button
                  type="submit"
                  className="bg-orange-500 sm:hidden text-white py-2 px-4 rounded hover:bg-orange-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostPage;