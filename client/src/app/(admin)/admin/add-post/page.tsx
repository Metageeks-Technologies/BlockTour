"use client";
import React, {useEffect, useState, useCallback} from "react";
import dynamic from "next/dynamic"; // Import the 'dynamic' function from the correct module
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineCloudUpload} from "react-icons/md";
import axios from "axios";
import instance from "@/utils/axios";
import {notifyError, notifySuccess, notifyWarn} from "@/utils/toast";
import {getAllCategories} from "@/app/redux/feature/category/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {useRouter} from "next/navigation";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic( () => import( "react-quill" ), {ssr: false} );

const AddPostPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentAdmin = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const categories = useAppSelector( ( state ) => state.category.categories );
  const [isLoading, setIsLoading] = useState( false );
  const [sliderImages, setSliderImages] = useState<File[]>( [] );
  const [previewFile, setPreviewFile] = useState<File | null>( null );
  const [previewType, setPreviewType] = useState<string>( "" );
  const [collapsedSections, setCollapsedSections] = useState( {
    categories: false,
    tags: false,
    postType: false,
    preview: false,
  } );
  const [data, setData] = useState( {
    title: "",
    permaLink: "",
    description: "",
    publishedDate: new Date().toISOString().split( 'T' )[0],
    visibility: "Public",
    status: "Draft",
    postType: "",
    category: [] as string[],
    tags: [] as string[],
    postSliderImageUrl: [] as string[],
    previewImageUrl: "",
    authorId: "",
    authorName: ""
  } );

  const getUploadUrl = useCallback( async ( fileName: string ): Promise<string> => {
    try {
      const response = await instance.post<{url: string;}>( "/aws/getUploadRrl", {
        folder: 'posts',
        fileName
      } );
      return response.data.url;
    } catch ( error ) {
      console.error( 'Error getting upload URL:', error );
      throw error;
    }
  }, [] );

  const handleUpload = useCallback( async ( file: File ): Promise<string | null> => {
    if ( !file ) return null;

    try {
      const uploadUrl = await getUploadUrl( `${file.lastModified}${file.size}${file.name}` );
      if ( !uploadUrl ) return null;

      const res = await axios.put( uploadUrl, file, {
        headers: {'Content-Type': file.type},
      } );

      if ( res.status === 200 ) {
        return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/posts/${file.lastModified}${file.size}${file.name}`;
      }
      return null;
    } catch ( error ) {
      console.error( 'Error uploading file:', error );
      return null;
    }
  }, [getUploadUrl] );

  const handleSliderImageChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files ) {
      setSliderImages( prev => [...prev, ...Array.from( e.target.files as FileList )] );
    }
  }, [] );

  const handlePreviewFileChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files[0] ) {
      const file = e.target.files[0];
      const fileType = file.type.split( '/' )[0]; // 'image' or 'video'

      if ( ( data.postType === "Image Post" && fileType !== "image" ) ||
        ( data.postType === "Video Post" && fileType !== "video" ) ) {
        notifyWarn( `Please select a ${data.postType === "Image Post" ? "image" : "video"} file for ${data.postType}` );
        return;
      }

      setPreviewFile( file );
      setPreviewType( fileType );
    }
  }, [data.postType] );

  const handleDiscardPreviewFile = useCallback( () => {
    setPreviewFile( null );
    // setPreviewType( "" );
  }, [] );

  const removeSliderImage = useCallback( ( index: number ) => {
    setSliderImages( prev => prev.filter( ( _, i ) => i !== index ) );
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
      tags: e.target.value.split( "," ).map( tag => tag.trim() ),
    } ) );
  }, [] );

  useEffect( () => {
    if ( currentAdmin ) {
      setData( prev => ( {
        ...prev,
        authorName: currentAdmin.name,
        authorId: currentAdmin._id
      } ) );
    }
  }, [currentAdmin] );

  useEffect( () => {
    getAllCategories( dispatch ).finally( () => setIsLoading( false ) );
  }, [dispatch] );

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if ( !previewFile ) {
      notifyWarn( "Please select a preview image" );
      return;
    }

    setIsLoading( true );
    try {
      const postSliderImageUrl = await Promise?.all( sliderImages?.map( image => handleUpload( image ) ) );
      const previewImageUrl = await handleUpload( previewFile );

      if ( !previewImageUrl ) {
        notifyWarn( "Failed to upload preview image to AWS S3" );
        return;
      }

      const updatedData = {
        ...data,
        authorId: currentAdmin?._id,
        authorName: currentAdmin?.name,
        postSliderImageUrl: postSliderImageUrl?.filter( url => url !== null ) as string[],
        previewImageUrl,
      };

      const response = await instance.post( "/post/posts", updatedData );
      notifySuccess( "Post created successfully!" );
      console.log( "Form submitted successfully:", response.data );
      // Reset form data here
      setData( {
        title: "",
        permaLink: "",
        description: "",
        publishedDate: new Date().toISOString().split( 'T' )[0],
        visibility: "Public",
        status: "Draft",
        postType: "",
        category: [] as string[],
        tags: [] as string[],
        postSliderImageUrl: [] as string[],
        previewImageUrl: "",
        authorId: "",
        authorName: ""
      } );
      setSliderImages( [] );
      setPreviewFile( null );
      setIsLoading( false );
      router.push( `/admin/dashboard` );
    } catch ( error: any ) {
      notifyError( `${error?.response?.data?.message || "An error occurred"}` );
      console.error( "Error submitting the form:", error );
    } finally {
      setIsLoading( false );
    }
  };

  const toggleSection = useCallback( ( section: keyof typeof collapsedSections ) => {
    setCollapsedSections( prev => ( {...prev, [section]: !prev[section]} ) );
  }, [] );

  const CollapsibleSection = ( {title, name, children}: {title: string, name: keyof typeof collapsedSections, children: React.ReactNode;} ) => (
    <div className="flex flex-col rounded-none max-w-md mx-auto mt-5">
      <div className="flex flex-col py-5 w-full rounded-md border border-solid border-neutral-700">
        <header
          className="flex gap-3 self-center w-full text-base whitespace-nowrap max-w-[317px] text-[#7B7A7F] cursor-pointer"
          onClick={() => toggleSection( name )}
        >
          <h2 className="grow my-auto">{title}</h2>
          {collapsedSections[name] ? <MdKeyboardArrowDown className="h-6 w-6" /> : <MdKeyboardArrowUp className="h-6 w-6" />}
        </header>
        {!collapsedSections[name] && (
          <>
            <div className="mt-3 border-b border-[#414141]" />
            <div className="mt-4 px-4">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="ml-64 bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D]">
      <div className="border-b border-[#28272D] px-4 py-4">
        <h1 className="text-2xl px-6">Add New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex p-8 gap-5">
        {/* Left Column (Form Fields) */}
        <div className="basis-[70%]">
          {/* Post Title */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-[#7B7A7F]">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input"
              value={data.title}
              onChange={( e ) =>
                setData( ( prevData ) => ( {
                  ...prevData,
                  title: e.target.value,
                  permaLink: e.target.value.toLowerCase().replace( / /g, "-" ),
                } ) )
              }
            />
          </div>

          {/* Permalink */}
          <div className="mb-6">
            <label className="block font-medium mb-1 text-[#7B7A7F]">
              Permalink
            </label>
            <input
              type="text"
              placeholder="Enter permalink"
              className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input"
              value={data.permaLink}
              onChange={( e ) =>
                setData( ( prevData ) => ( {
                  ...prevData,
                  permaLink: e.target.value,
                } ) )
              }
            />
          </div>

          {/* Description (Text Editor) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3 text-[#7B7A7F]">
              Description
            </label>
            <div className="bg-[#0A090F] rounded p-2 border border-[#414141]">
              <ReactQuill
                theme="snow"
                value={data.description}
                onChange={( value ) =>
                  setData( ( prevData ) => ( {
                    ...prevData,
                    description: value,
                  } ) )
                }
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
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "color",
                  "background",
                  "script",
                  "blockquote",
                  "code-block",
                  "list",
                  "bullet",
                  "align",
                  "link",
                  "image",
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
                  <p className="text-xs text-[#52525B]">
                    Add multiple images for your post slider
                  </p>
                </div>
                <input
                  id="slider-image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleSliderImageChange}
                  accept="image/*"
                  multiple
                />
                <button type="button" className="mb-2 text-sm text-white bg-[#7B7A7F] hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-lg px-5 py-2">
                  Browse Files
                </button>
              </label>
            </div>
            {sliderImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2 text-[#7B7A7F]">Selected Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {sliderImages.map( ( image, index ) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL( image )}
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
        <div className="basis-[30%] mt-7">
          <div className="flex flex-col gap-2">
            {/* <button
              type="button"
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
              disabled={isLoading}
            >
              Preview Changes
            </button> */}
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              disabled={isLoading}
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>

          {/* Post Settings */}
          <div className="border border-neutral-700 p-4 rounded-lg max-w-md mx-auto mt-5">
            {/* Published Date */}
            <div className="mb-4">
              <label className="block text-[#7B7A7F] text-sm font-bold mb-2" htmlFor="published-date">
                Published Date
              </label>
              <input
                type="date"
                className="bg-[#0A090F] text-[#7B7A7F] border border-[#414141] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                value={data.publishedDate}
                onChange={( e ) =>
                  setData( ( prevData ) => ( {
                    ...prevData,
                    publishedDate: e.target.value,
                  } ) )
                }
              />
            </div>

            {/* Visibility */}
            <div className="mb-4">
              <label className="block text-[#7B7A7F] text-sm font-bold mb-2" htmlFor="visibility">
                Visibility
              </label>
              <select
                id="visibility"
                className="bg-[#0A090F] text-[#7B7A7F] border border-[#414141] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                value={data.visibility}
                onChange={( e ) =>
                  setData( ( prevData ) => ( {
                    ...prevData,
                    visibility: e.target.value,
                  } ) )
                }
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-[#7B7A7F] text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="bg-[#0A090F] text-[#7B7A7F] border border-[#414141] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                value={data.status}
                onChange={( e ) =>
                  setData( ( prevData ) => ( {
                    ...prevData,
                    status: e.target.value,
                  } ) )
                }
              >
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <CollapsibleSection title="Categories" name="categories">
            {categories?.map( ( category: any ) => (
              <div key={category._id} className="flex mt-1 items-center">
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
          </CollapsibleSection>

          {/* Tags */} 

            <div className="border border-[#414141] p-4 mt-5 rounded">
              <div className="flex justify-between">
                <h1 className="block text-[#7B7A7F] font-bold mb-2">
                  Add Tags (Up to 5)
                </h1>
                {/* <MdKeyboardArrowDown className="h-6 w-6" /> */}
              </div>
              <input
                type="text"
                id="tags"
                placeholder="Add tags"
                value={data.tags.join( ", " )}
                onChange={handleTagChange}
                // className="bg-[#0A090F] text-[#7B7A7F] placeholder-gray-500 mt-2 border border-[#414141] rounded-lg py-2 px-3 focus:outline-none w-full
                className="bg-[#0A090F] text-[#7B7A7F] placeholder-gray-500 mt-2 border border-[#414141] rounded-lg py-2 px-3 focus:outline-none w-full custom-input"
              />
            </div>

          {/* Post Type */}
          <CollapsibleSection title="Post Type" name="postType">
            <div className="space-y-2 cursor-pointer">
              {["Image Post", "Video Post"].map( ( postType ) => (
                <div key={postType} className="flex items-center">
                  <input
                    type="radio"
                    id={postType}
                    name="postType"
                    value={postType}
                    checked={data.postType === postType}
                    onChange={( e ) =>
                      setData( ( prevData ) => ( {
                        ...prevData,
                        postType: e.target.value,
                      } ) )
                    }
                    className="custom-checkbox"
                  />
                  <label
                    htmlFor={postType}
                    className="ml-2 text-[#7B7A7F] text-sm"
                  >
                    {postType}
                  </label>
                </div>
              ) )}
            </div>
          </CollapsibleSection>

          {/* Preview File Section */}
          <CollapsibleSection title={`Preview ${data.postType === "Video Post" ? "Video" : "Image"}`} name="preview">
            {!previewFile ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="preview-file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full border-2 border-dashed border-[#7B7A7F] rounded-lg p-4"
                >
                  <div className="flex flex-col items-center justify-center pb-4">
                    <MdOutlineCloudUpload className="h-8 w-8 text-neutral-600 mt-2" />
                    <p className="mb-2 text-sm text-[#7B7A7F]">
                      <span className="font-semibold">Choose a file</span> or drag & drop it here
                    </p>
                    <p className="text-xs text-[#808089]">
                      Select a preview {data.postType === "Video Post" ? "video" : "image"} for your post
                    </p>
                  </div>
                  <input
                    id="preview-file-upload"
                    type="file"
                    className="hidden"
                    onChange={handlePreviewFileChange}
                    accept={data.postType === "Video Post" ? "video/*" : "image/*"}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <h4 className="text-sm font-medium mb-2 text-[#7B7A7F]">Selected Preview {previewType.charAt( 0 ).toUpperCase() + previewType.slice( 1 )}:</h4>
                {previewType === "image" ? (
                  <img
                    src={URL.createObjectURL( previewFile )}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL( previewFile )}
                    controls
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <button
                  onClick={handleDiscardPreviewFile}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Discard preview file"
                >
                  <MdClose className="h-5 w-5" />
                </button>
              </div>
            )}
          </CollapsibleSection>


        </div>
      </form>
    </div>
  );
};

export default AddPostPage;