"use client";

import {getAllCategories} from "@/app/redux/feature/category/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, {useEffect, useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

const PostsTable = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector( ( state ) => state.category.categories );
  const [loading, setLoading] = useState( true );
  const [searchTerm, setSearchTerm] = useState( "" );
  const [itemsPerPage, setItemsPerPage] = useState( 10 );
  const [currentPage, setCurrentPage] = useState( 1 );
  const [filteredCategories, setFilteredCategories] = useState( [] );

  useEffect( () => {
    getAllCategories( dispatch ).finally( () => setLoading( false ) );
  }, [dispatch] );

  useEffect( () => {
    setFilteredCategories(
      categories.filter( ( category:any ) =>
        category.name.toLowerCase().includes( searchTerm.toLowerCase() )
      )
    );
  }, [categories, searchTerm] );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = ( pageNumber:number ) => setCurrentPage( pageNumber );

  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D]">
        <h1 className="text-white text-xl font-semibold">Category List</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 px-8">
          <select className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded">
            <option>Bulk actions</option>
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#DF841C" size={50} />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center text-white">No Categories Found</div>
        ) : (
          <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
            <thead>
              <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                <th className="py-3 px-8">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Count</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map( ( cate:any, idx ) => (
                <tr
                  key={cate._id}
                  className="border-b border-[#28272D] hover:bg-[#28272D]"
                >
                  <td className="py-3 px-8">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4">{cate.name}</td>
                  <td className="py-3 px-4">{cate.description}</td>
                  <td className="py-3 px-4">{cate.slug}</td>
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4 text-center flex items-center justify-center">
                    <button className="text-white flex items-center justify-center h-8 w-8 bg-[#28272D] rounded-full">
                      <BiDotsVerticalRounded className="h-6 w-6" />
                    </button>
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
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min( indexOfLastItem, filteredCategories.length )} of{" "}
          {filteredCategories.length} entries
        </div>
        <div className="flex space-x-2">
          <button onClick={() => paginate( currentPage - 1 )} disabled={currentPage === 1}>
            <img src="/asset/Group 12367.svg" alt="Previous" />
          </button>
          {[...Array( Math.ceil( filteredCategories.length / itemsPerPage ) ).keys()].map( ( number ) => (
            <button
              key={number + 1}
              onClick={() => paginate( number + 1 )}
              className={`px-4 py-2 rounded ${currentPage === number + 1 ? "bg-[#DF841C] text-white" : "text-[#7B7A7F]"
                }`}
            >
              {number + 1}
            </button>
          ) )}
          <button
            onClick={() => paginate( currentPage + 1 )}
            disabled={currentPage === Math.ceil( filteredCategories.length / itemsPerPage )}
          >
            <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsTable;
