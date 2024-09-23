"use client";
import React, {useEffect, useState, useCallback} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import instance from "@/utils/axios";
import {notifyError, notifySuccess, notifyWarn} from "@/utils/toast";
import {getAllCategories} from "@/app/redux/feature/category/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";

const ReactQuill = dynamic( () => import( "react-quill" ), {ssr: false} );

const AddPodcastPage = () => {
  const dispatch = useAppDispatch();
  const currentAdmin = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const categories = useAppSelector( ( state ) => state.category.categories );
  const [isLoading, setIsLoading] = useState( false );
  const [collapsedSections, setCollapsedSections] = useState( {
    categories: false,
    tags: false,
  } );
  const [data, setData] = useState( {
    title: "",
    permaLink: "",
    embededCode: "",
    publishedDate: new Date().toISOString(),
    visibility: "Public",
    status: "Draft",
    category: [] as string[],
    tags: [] as string[],
    authorId: "",
    authorName: "",
    postType: "Podcast",
  } );

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

    if ( !data.embededCode ) {
      notifyWarn( "Please provide the embedded code for the podcast" );
      return;
    }

    setIsLoading( true );
    try {
      const response = await instance.post( "/podcast/create-podcast", data );
      notifySuccess( "Podcast created successfully!" );
      console.log( "Form submitted successfully:", response.data );
      // Reset form data here
      setData( {
        title: "",
        permaLink: "",
        embededCode: "",
        publishedDate: new Date().toISOString(),
        visibility: "Public",
        status: "Draft",
        category: [],
        tags: [],
        authorId: "",
        authorName: "",
        postType: "Podcast",
      } );

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
        <h1 className="text-2xl px-6">Add New Podcast</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex p-8 gap-5">
        {/* Left Column (Form Fields) */}
        <div className="basis-[70%]">
          {/* Podcast Title */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-[#7B7A7F]">
              Podcast Title
            </label>
            <input
              type="text"
              placeholder="Enter podcast title"
              className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input"
              value={data.title}
              onChange={( e ) =>
                setData( ( prevData ) => ( {
                  ...prevData,
                  title: e.target.value,
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

          {/* Embedded Code */}
          <div className="mb-6">
            <label className="block font-medium mb-1 text-[#7B7A7F]">
              Embedded Code
            </label>
            <textarea
              placeholder="Enter embedded code"
              className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 custom-input h-32"
              value={data.embededCode}
              onChange={( e ) =>
                setData( ( prevData ) => ( {
                  ...prevData,
                  embededCode: e.target.value,
                } ) )
              }
            />
          </div>
        </div>

        {/* Right Column (Podcast Settings) */}
        <div className="basis-[30%] mt-5">
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              disabled={isLoading}
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>

          {/* Podcast Settings */}
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
        </div>
      </form>
    </div>
  );
};

export default AddPodcastPage;