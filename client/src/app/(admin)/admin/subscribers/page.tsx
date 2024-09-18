"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import instance from "@/utils/axios";
import axios from "axios";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {ClipLoader} from "react-spinners";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

interface Subscriber {
  _id: string;
  email: string;
  status: 'active' | 'banned';
}

const SubscribersTable: React.FC = () => {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>( [] );
  const [statusFilter, setStatusFilter] = useState<string>( "" );
  const [searchTerm, setSearchTerm] = useState<string>( "" );
  const [itemsPerPage, setItemsPerPage] = useState<number>( 10 );
  const [currentPage, setCurrentPage] = useState<number>( 1 );
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [isExporting, setIsExporting] = useState<boolean>( false );

  useEffect( () => {
    fetchSubscribers();
  }, [] );

  const fetchSubscribers = async () => {
    setIsLoading( true );
    try {
      const response = await instance.get( '/subscriber/subscribers' );
      console.log( "Response:-", response );
      setSubscribers( response.data.subscribers );
    } catch ( error ) {
      console.error( error );
      setSubscribers( [] ); // Set to empty array in case of error
    } finally {
      setIsLoading( false );
    }
  };

  const handleStatusChange = async ( id: string, newStatus: 'active' | 'banned' ) => {
    try {
      await instance.put( `/subscriber/subscribers/${id}`, {status: newStatus} );
      fetchSubscribers();
    } catch ( error ) {
      console.error( error );
    }
  };

  const handleDelete = async ( id: string ) => {
    Swal.fire( {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    } ).then( async ( result ) => {
      if ( result.isConfirmed ) {
        try {
          await instance.delete( `/subscriber/subscribers/${id}` );
          Swal.fire( {
            title: "Deleted!",
            text: "Subscriber has been deleted Successfully !.",
            icon: "success"
          } );
          fetchSubscribers();
        } catch ( error ) {
          console.error( error );
        }
      }
    } );
  };

  const filteredSubscribers = subscribers && subscribers.length > 0
    ? subscribers
      .filter( sub => statusFilter === "" || sub.status === statusFilter )
      .filter( sub => sub.email.toLowerCase().includes( searchTerm.toLowerCase() ) )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscribers.slice( indexOfFirstItem, indexOfLastItem );

  const paginate = ( pageNumber: number ) => setCurrentPage( pageNumber );

  const ExportSubscribers = () => {
    setIsExporting( true );
    const ws = XLSX.utils.json_to_sheet( subscribers ); // Convert subscribers data to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet( wb, ws, "Subscribers" ); // Append the worksheet to the workbook

    // Generate Excel file and trigger download
    XLSX.writeFile( wb, "subscribers.xlsx" );
    setIsExporting( false );
  };

  return (
    <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D]">
        <h1 className="text-white text-xl font-semibold">Subscribers</h1>
        <button
          className="bg-[#DF841C] text-white px-4 py-2 rounded"
          onClick={ExportSubscribers}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      <div className="border-b border-[#17161B] mt-8 mb-4 flex gap-8 px-8 font-semibold">
        <p className="text-[#7B7A7F] mb-1 cursor-pointer">All Subscribers</p>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 px-8">
          <div className="flex gap-2 items-center">
            <p>Sort by Status</p>
            <select
              className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
              value={statusFilter}
              onChange={( e ) => setStatusFilter( e.target.value )}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
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
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No Subscribers Found</td>
                </tr>
              ) : currentItems.map( ( subscriber ) => (
                <tr
                  key={subscriber._id}
                  className="border-b border-[#28272D] hover:bg-[#28272D]"
                >
                  <td className="py-3 px-8">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4">{subscriber.email}</td>
                  <td className="py-3 px-4">{subscriber.status}</td>
                  <td className="py-3 px-4 text-center flex items-center justify-center">
                    <div className="relative group">
                      <button className="text-white flex items-center justify-center h-8 w-8 bg-[#28272D] rounded-full">
                        <BiDotsVerticalRounded className="h-6 w-6" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-[#28272D] rounded-md shadow-lg z-10 hidden group-hover:block">
                        <button
                          className="block px-4 py-2 text-sm text-white hover:bg-[#3A3940] w-full text-left"
                          onClick={() => handleStatusChange( subscriber._id, subscriber.status === 'active' ? 'banned' : 'active' )}
                        >
                          {subscriber.status === 'active' ? 'Ban' : 'Activate'}
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-white hover:bg-[#3A3940] w-full text-left"
                          onClick={() => handleDelete( subscriber._id )}
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
          Showing {indexOfFirstItem + 1} to {Math.min( indexOfLastItem, filteredSubscribers.length )} of {filteredSubscribers.length} entries
        </div>
        <div className="flex space-x-2">
          <button onClick={() => paginate( currentPage - 1 )} disabled={currentPage === 1}>
            <img src="/asset/Group 12367.svg" alt="Previous"  />
          </button>
          {[...Array( Math?.ceil( filteredSubscribers.length / itemsPerPage ) ).keys()].map( ( number ) => (
            <button
              key={number + 1}
              onClick={() => paginate( number + 1 )}
              className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
            >
              {number + 1}
            </button>
          ) )}
          <button onClick={() => paginate( currentPage + 1 )} disabled={currentPage === Math.ceil( filteredSubscribers.length / itemsPerPage )}>
            <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribersTable;