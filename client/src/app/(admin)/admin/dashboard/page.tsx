"use client"
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {ClipLoader} from "react-spinners";
import instance from "@/utils/axios";
import {formatDateTime} from "@/utils/DateFormat";
import {IoSearchOutline} from "react-icons/io5";
import {getAllCategories} from "@/app/redux/feature/category/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {getCurrentAdmin} from "@/app/redux/feature/admin/api";

interface Post {
  _id: string;
  title: string;
  authorName: string;
  category: string[];
  tags: string[];
  status: 'published' | 'draft' | 'trash';
  createdAt: string; // Changed from publishedDate to createdAt
}

interface Contributor {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  postsCount: number;
  lastPostDate: string;
  status: 'active' | 'inactive';
  contributor: boolean;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'posts' | 'contributors'>( 'posts' );
  const [posts, setPosts] = useState<Post[]>( [] );
  const [contributors, setContributors] = useState<Contributor[]>( [] );
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>( true );
  const [currentPage, setCurrentPage] = useState<number>( 1 );
  const [itemsPerPage, setItemsPerPage] = useState<number>( 10 );
  const [sortBy, setSortBy] = useState<string>( "date" );
  const [categoryFilter, setCategoryFilter] = useState<string>( "all" );
  const [searchTerm, setSearchTerm] = useState<string>( "" );

  const categories = useAppSelector( ( state: any ) => state.category.categories );
  const currentAdmin = useAppSelector( ( state: any ) => state.superAdmin.admin );

  const fetchAdmin = useCallback( async () => {
    try {
      await getCurrentAdmin( dispatch );
    } catch ( error ) {
      console.error( "Error fetching admin:", error );
    } finally {
      setIsAdminLoading( false );
    }
  }, [dispatch] );

  const fetchCategories = useCallback( async () => {
    await getAllCategories( dispatch );
  }, [dispatch] );

  const fetchPosts = useCallback( async () => {
    try {
      const response = await instance.get( '/post/all-posts' );
      setPosts( response?.data?.posts || [] );
    } catch ( error ) {
      console.error( 'Error fetching posts:', error );
      setPosts( [] );
    }
  }, [] );

  const fetchContributors = useCallback( async () => {
    try {
      const response = await instance.get( '/auth/user' );
      setContributors( response?.data?.users || [] );
    } catch ( error ) {
      console.error( 'Error fetching contributors:', error );
      setContributors( [] );
    }
  }, [] );

  const fetchData = useCallback( async () => {
    setIsLoading( true );
    if ( activeTab === 'posts' ) {
      await fetchPosts();
    } else {
      await fetchContributors();
    }
    setIsLoading( false );
  }, [activeTab, fetchPosts, fetchContributors] );

  useEffect( () => {
    fetchAdmin();
    fetchCategories();
  }, [fetchAdmin, fetchCategories] );

  useEffect( () => {
    if ( !isAdminLoading ) {
      if ( !currentAdmin ) {
        router.push( '/auth/admin/login' );
      } else {
        fetchData();
      }
    }
  }, [isAdminLoading, currentAdmin, router, fetchData] ); 

 
  const filteredAndSortedItems = useMemo( () => {
    let items: any = activeTab === 'posts' ? [...posts] : [...contributors];

    // Apply search
    if ( searchTerm ) {
      items = items.filter( ( item: any ) => {
        if ( activeTab === 'posts' ) {
          const post = item as Post;
          return (
            post.title.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            post.authorName.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            post.category.some( cat => cat.toLowerCase().includes( searchTerm.toLowerCase() ) ) ||
            post.tags.some( tag => tag.toLowerCase().includes( searchTerm.toLowerCase() ) )
          );
        } else {
          const contributor = item as Contributor;
          return (
            contributor.name.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            contributor.email.toLowerCase().includes( searchTerm.toLowerCase() )
          );
        }
      } );
    }

    // Apply category filter for posts
    if ( activeTab === 'posts' && categoryFilter !== 'all' ) {
      items = ( items as Post[] ).filter( post => post.category.includes( categoryFilter ) );
    }

    // Apply sorting
    items.sort( ( a: any, b: any ) => {
      if ( activeTab === 'posts' ) {
        const postA = a as Post;
        const postB = b as Post;
        if ( sortBy === 'date' ) {
          return new Date( postB.createdAt ).getTime() - new Date( postA.createdAt ).getTime();
        } else if ( sortBy === 'title' ) {
          return postA.title.localeCompare( postB.title );
        }
      } else {
        const contribA = a as Contributor;
        const contribB = b as Contributor;
        if ( sortBy === 'date' ) {
          return new Date( contribB.createdAt ).getTime() - new Date( contribA.createdAt ).getTime();
        } else if ( sortBy === 'name' ) {
          return contribA.name.localeCompare( contribB.name );
        }
      }
      return 0;
    } );
    return items;
  }, [activeTab, posts, contributors, searchTerm, categoryFilter, sortBy] );

  const currentItems = filteredAndSortedItems.slice(
    ( currentPage - 1 ) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = filteredAndSortedItems.length;

  const paginate = ( pageNumber: number ) => setCurrentPage( pageNumber );

  const handleSearch = () => {
    setCurrentPage( 1 );  // Reset to first page when searching
  };

  return (
    <div className="ml-64 mx-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
      <div className="border-b border-[#17161B] mb-4 flex font-semibold w-1/3 ">
        <p
          className={`text-[#7B7A7F] mb-1 w-1/3 whitespace-nowrap py-2 text-center justify-center cursor-pointer ${activeTab === 'posts' ? 'border-[#DF841C] border-b-4 text-white mx-4' : ''}`}
          onClick={() => setActiveTab( 'posts' )}
        >
          Recent posts
        </p>
        <p
          className={`text-[#7B7A7F] mb-1 w-1/3 whitespace-nowrap py-2 text-center justify-center cursor-pointer ${activeTab === 'contributors' ? 'border-[#DF841C] border-b-4 text-white' : ''}`}
          onClick={() => setActiveTab( 'contributors' )}
        >
          Recent Contributors
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 px-8"> 
         
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
            {categories.map( ( category: any ) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ) )}
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

      <div className="overflow-x-auto pt-4">
        {isLoading ? (
          <div className="text-center py-4">
            <ClipLoader color="#DF841C" size={50} />
          </div>
        ) : activeTab === 'posts' ? (
          <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
            <thead>
              <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                <th className="py-3 px-4">S.No</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Categories</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <img src="/assets/no_blog_found.svg" alt="No blogs found" />
                  </td>
                </tr>
              ) : (
                currentItems.map( ( post: any, index: number ) => (
                  <tr key={post._id} className="border-b border-[#28272D] hover:bg-[#28272D] cursor-pointer" onClick={() => router.push( `/admin/all-postList/${post._id}` )}>
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">{post.authorName}</td>
                    <td className="py-3 px-4">{post.category.join( ', ' )}</td>
                    <td className="py-3 px-4">
                      {post.tags.map( ( tag: string, index: number ) => (
                        <span key={index} className="bg-[#28272D] px-2 py-1 rounded text-sm mr-1">
                          {tag}
                        </span>
                      ) )}
                    </td>
                    <td className="py-3 px-4">{post.status}</td>
                    <td className="py-3 px-4">{formatDateTime( post?.createdAt )}</td>
                  </tr>
                ) )
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
            <thead>
              <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                <th className="py-3 px-4">S.No</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Last Post Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No Contributors Found</td>
                </tr>
              ) : (
                currentItems.map( ( contributor: any, index: number ) => (
                  <tr key={contributor._id} className="border-b border-[#28272D] hover:bg-[#28272D] cursor-pointer" onClick={() => router.push( `/admin/contributor/${contributor._id}` )}>
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4">{contributor.name}</td>
                    <td className="py-3 px-4">{contributor.email}</td>
                    <td className="py-3 px-4">{formatDateTime( contributor.createdAt )}</td>
                    <td className="py-3 px-4">{contributor.contributor ? "Active" : "Inactive"}</td>
                  </tr>
                ) )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-8">
        <div className="text-[#7B7A7F]">
          Showing {( currentPage - 1 ) * itemsPerPage + 1} to {Math.min( currentPage * itemsPerPage, totalItems )} of {totalItems} entries
        </div>
        <div className="flex space-x-2">
          <button onClick={() => paginate( currentPage - 1 )} disabled={currentPage === 1}>
            <img src="/asset/Group 12367.svg" alt="Previous" />
          </button>
          {[...Array( Math.ceil( totalItems / itemsPerPage ) ).keys()].map( ( number ) => (
            <button
              key={number + 1}
              onClick={() => paginate( number + 1 )}
              className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
            >
              {number + 1}
            </button>
          ) )}
          <button onClick={() => paginate( currentPage + 1 )} disabled={currentPage === Math.ceil( totalItems / itemsPerPage )}>
            <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;