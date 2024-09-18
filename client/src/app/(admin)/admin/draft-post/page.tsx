"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import axios from "axios";
import {ClipLoader} from "react-spinners";
import instance from "@/utils/axios";

interface Post {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string[];
  tags: string[];
  status: 'published' | 'draft' | 'trash' | 'archived';
  date: string;
  seo: 'good' | 'average' | 'poor';
}

const PostsTable: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>( [] );
  const [filteredPosts, setFilteredPosts] = useState<Post[]>( [] );
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [statusFilter, setStatusFilter] = useState<string>( "draft" );
  const [searchTerm, setSearchTerm] = useState<string>( "" );
  const [sortBy, setSortBy] = useState<string>( "date" );
  const [categoryFilter, setCategoryFilter] = useState<string>( "all" );
  const [itemsPerPage, setItemsPerPage] = useState<number>( 10 );
  const [currentPage, setCurrentPage] = useState<number>( 1 );

  useEffect( () => {
    fetchPosts();
  }, [] );

  useEffect( () => {
    filterPosts();
  }, [posts, statusFilter, searchTerm, sortBy, categoryFilter] );

  const fetchPosts = async () => {
    setIsLoading( true );
    try {
      const response = await instance.get( '/post/all-posts' );
      console.log( response );
      setPosts( response?.data?.posts );
    } catch ( error ) {
      console.error( error );
      setPosts( [] );
    } finally {
      setIsLoading( false );
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Apply status filter
    if ( statusFilter !== "all" ) {
      filtered = filtered.filter( post => post.status.toLowerCase() === statusFilter );
    }

    // Apply search filter
    if ( searchTerm ) {
      filtered = filtered.filter( post =>
        post.title.toLowerCase().includes( searchTerm.toLowerCase() ) ||
        post?.author?.name?.toLowerCase()?.includes( searchTerm.toLowerCase() )
      );
    }

    // Apply category filter
    if ( categoryFilter !== "all" ) {
      filtered = filtered.filter( post => post.category.includes( categoryFilter ) );
    }

    // Apply sorting
    filtered.sort( ( a, b ) => {
      if ( sortBy === "date" ) {
        return new Date( b.date ).getTime() - new Date( a.date ).getTime();
      } else if ( sortBy === "title" ) {
        return a.title.localeCompare( b.title );
      }
      return 0;
    } );

    setFilteredPosts( filtered );
  };

  const handleStatusChange = async ( id: string, newStatus: 'published' | 'draft' | 'trash' ) => {
    try {
      await instance.put( `/post/posts/${id}`, {status: newStatus} );
      fetchPosts();
    } catch ( error ) {
      console.error( error );
    }
  };

  const handleDelete = async ( id: string ) => {
    if ( window.confirm( "Are you sure you want to delete this post?" ) ) {
      try {
        await instance.delete( `/post/posts/${id}` );
        fetchPosts();
      } catch ( error ) {
        console.error( error );
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice( indexOfFirstItem, indexOfLastItem );

  const paginate = ( pageNumber: number ) => setCurrentPage( pageNumber );

  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D]">
        <h1 className="text-white text-xl font-semibold">Archived Posts</h1>
        <button className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded" onClick={() => router.push( '/admin/add-post' )}>
          + Add New Post
        </button>
      </div>

      {/* <div className="border-b border-[#17161B] mt-8 mb-4 flex gap-8 px-8 font-semibold">
            <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'all' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'all' )}>All posts</p>
            <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'published' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'published' )}>Published</p>
            <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'trash' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'trash' )}>Trash</p>
          </div> */}

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 px-8">
          <select className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded">
            <option>Bulk actions</option>
          </select>
          <button className="bg-[#2E2E3E] text-white px-4 py-2 rounded">
            Apply
          </button>
          <div className="flex gap-2 items-center">
            <p>Sort by</p>
            <select
              className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
              value={sortBy}
              onChange={( e ) => setSortBy( e.target.value )}
            >
              <option value="date">Date created</option>
              <option value="title">Title</option>
            </select>
          </div>
          <select
            className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
            value={categoryFilter}
            onChange={( e ) => setCategoryFilter( e.target.value )}
          >
            <option value="all">All Categories</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="social-media">Social Media</option>
            <option value="sports">Sports</option>
            <option value="writing">Writing</option>
          </select>
        </div>

        <div className="flex gap-2 items-center px-4">
          <div className="relative border border-neutral-600 rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#0A090F] text-[#7B7A7F] px-4 py-2 rounded border-none focus:outline-none"
              value={searchTerm}
              onChange={( e ) => setSearchTerm( e.target.value )}
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
          <p>View</p>
          <select
            className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
            value={itemsPerPage}
            onChange={( e ) => setItemsPerPage( Number( e.target.value ) )}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#DF841C" size={50} />
          </div>
        ) : (
          <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
            <thead>
              <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                <th className="py-3 px-8">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Categories</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">SEO</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">No Posts Found</td>
                </tr>
              ) : currentItems.map( ( post ) => (
                <tr key={post.id} className="border-b border-[#28272D] hover:bg-[#28272D]">
                  <td className="py-3 px-8">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4">{post.id}</td>
                  <td className="py-3 px-4">{post.title}</td>
                  <td className="py-3 px-4 flex items-center space-x-2">
                    {/* <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" /> */}
                    <span>{post?.author?.name}</span>
                  </td>
                  <td className="py-3 px-4">{post?.category?.join( ', ' )}</td>
                  <td className="py-3 px-4">
                    {post.tags.map( ( tag, index ) => (
                      <span key={index} className="bg-[#28272D] px-2 py-1 rounded text-sm mr-1">
                        {tag}
                      </span>
                    ) )}
                  </td>
                  <td className="py-3 px-4">{post.status}</td>
                  <td className="py-3 px-4">{post.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-${post.seo === 'good' ? '[#00FF00]' : post.seo === 'average' ? '[#FFFF00]' : '[#FF0000]'} cursor-pointer`}>●</span>
                  </td>
                  <td className="py-3 px-4 text-center flex items-center justify-center">
                    <div className="relative group">
                      <button className="text-white flex items-center justify-center h-8 w-8 bg-[#28272D] rounded-full">
                        <BiDotsVerticalRounded className="h-6 w-6" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-[#28272D] rounded-md shadow-lg z-10 hidden group-hover:block">
                        <button
                          className="block px-4 py-2 text-sm text-white hover:bg-[#3A3940] w-full text-left"
                          onClick={() => handleStatusChange( post.id, post.status === 'published' ? 'draft' : 'published' )}
                        >
                          {post.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-white hover:bg-[#3A3940] w-full text-left"
                          onClick={() => handleDelete( post.id )}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-8">
        <div className="text-[#7B7A7F]">
          Showing {indexOfFirstItem + 1} to {Math.min( indexOfLastItem, filteredPosts.length )} of {filteredPosts.length} entries
        </div>
        <div className="flex space-x-2">
          <button onClick={() => paginate( currentPage - 1 )} disabled={currentPage === 1}>
            <img src="/asset/Group 12367.svg" alt="Previous" />
          </button>
          {[...Array( Math.ceil( filteredPosts.length / itemsPerPage ) ).keys()].map( ( number ) => (
            <button
              key={number + 1}
              onClick={() => paginate( number + 1 )}
              className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
            >
              {number + 1}
            </button>
          ) )}
          <button onClick={() => paginate( currentPage + 1 )} disabled={currentPage === Math.ceil( filteredPosts.length / itemsPerPage )}>
            <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsTable;