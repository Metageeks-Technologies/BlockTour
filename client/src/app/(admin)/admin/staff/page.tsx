"use client";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {IoSearchOutline} from "react-icons/io5";
import {ClipLoader} from "react-spinners";
import instance from "@/utils/axios";
import {formatDateTime} from "@/utils/DateFormat";

interface StaffMember {
    _id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: 'active' | 'inactive';
    createdAt: string;
    profileImage:string;
}

const StaffTable: React.FC = () => {
    const router = useRouter();
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>( [] );
    const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>( [] );
    const [isLoading, setIsLoading] = useState<boolean>( true );
    const [statusFilter, setStatusFilter] = useState<string>( "all" );
    const [searchTerm, setSearchTerm] = useState<string>( "" );
    const [sortBy, setSortBy] = useState<string>( "date" );
    const [departmentFilter, setDepartmentFilter] = useState<string>( "all" );
    const [itemsPerPage, setItemsPerPage] = useState<number>( 10 );
    const [currentPage, setCurrentPage] = useState<number>( 1 );

    useEffect( () => {
        fetchStaffMembers();
    }, [] );

    useEffect( () => {
        filterStaffMembers();
    }, [staffMembers, statusFilter, searchTerm, sortBy, departmentFilter] );
    const fetchStaffMembers = async () => {
        setIsLoading( true );
        try {
            const response = await instance.get('/auth/admin/get-all-admins' );
console.log("response", response)
            setStaffMembers( response.data.admins );
        } catch ( error ) {
            console.error( error );
            setStaffMembers( [] );
        } finally {
            setIsLoading( false );
        }
    };

    const filterStaffMembers = () => {
        let filtered = [...staffMembers];

        if ( statusFilter !== "all" ) {
            filtered = filtered.filter( staff => staff.status.toLowerCase() === statusFilter );
        }

        if ( searchTerm ) {
            filtered = filtered.filter( staff =>
                staff.name.toLowerCase().includes( searchTerm.toLowerCase() ) ||
                staff.email.toLowerCase().includes( searchTerm.toLowerCase() )
            );
        }

        if ( departmentFilter !== "all" ) {
            filtered = filtered.filter( staff => staff.department === departmentFilter );
        }

        filtered.sort( ( a, b ) => {
            if ( sortBy === 'date' ) {
                return new Date( b.createdAt ).getTime() - new Date( a.createdAt ).getTime();
            } else if ( sortBy === 'name' ) {
                return a.name.localeCompare( b.name );
            }
            return 0;
        } ); 
        setFilteredStaff( filtered );
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStaff.slice( indexOfFirstItem, indexOfLastItem );

    const paginate = ( pageNumber: number ) => setCurrentPage( pageNumber );

    return (
        <div className="ml-64 m-4 py-4 bg-[#0A090F] rounded-2xl shadow-md w-full border border-[#28272D]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-8 py-2 border-b border-[#28272D]">
                <h1 className="text-white text-xl font-semibold">All Staff</h1>
                <button className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded" onClick={() => router.push( '/admin/staff/create-staff' )}>
                    + Add New Staff
                </button>
            </div>

            {/* Status Filter */}
            <div className="border-b border-[#17161B] mt-8 mb-4 flex gap-8 px-8 font-semibold">
                <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'all' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'all' )}>All Staff</p>
                <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'active' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'active' )}>Active</p>
                <p className={`text-[#7B7A7F] mb-1 cursor-pointer ${statusFilter === 'inactive' ? 'text-[#DF841C]' : ''}`} onClick={() => setStatusFilter( 'inactive' )}>Inactive</p>
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
                            <option value="date">Join Date</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                    {/* <select
                        className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
                        value={departmentFilter}
                        onChange={( e ) => setDepartmentFilter( e.target.value )}
                    >
                        <option value="all">All Departments</option>
                        Add department options here
                    </select> */}
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
                <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
                    <thead>
                        <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                            <th className="py-3 px-4">S.No</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            {/* <th className="py-3 px-4">Department</th>
                            <th className="py-3 px-4">Status</th> */}
                            <th className="py-3 px-4">Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    <ClipLoader color="#DF841C" size={50} />
                                </td>
                            </tr>
                        ) : currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">No Staff Members Found</td>
                            </tr>
                        ) : currentItems.map( ( staff, index ) => (
                            <tr key={staff._id} className="border-b border-[#28272D] hover:bg-[#28272D] cursor-pointer text-left" onClick={() => router.push( `/admin/staff/${staff._id}` )}>
                                <td className="py-3 px-4 text-center">{index + 1}</td>
                                <td className="py-3 px-4 flex items-center whitespace-nowrap">
                                    <img src={staff?.profileImage} alt={staff.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                    {staff.name}
                                </td>
                                <td className="py-3 px-4">{staff.email}</td>
                                <td className="py-3 px-4">{staff.role}</td>
                                {/* <td className="py-3 px-4">{staff.department}</td>
                                <td className="py-3 px-4">{staff.status}</td> */}
                                <td className="py-3 px-4">{formatDateTime( staff.createdAt )}</td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-8">
                <div className="text-[#7B7A7F]">
                    Showing {indexOfFirstItem + 1} to {Math.min( indexOfLastItem, filteredStaff.length )} of {filteredStaff.length} entries
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => paginate( currentPage - 1 )} disabled={currentPage === 1}>
                        <img src="/asset/Group 12367.svg" alt="Previous" />
                    </button>
                    {[...Array( Math.ceil( filteredStaff.length / itemsPerPage ) ).keys()].map( ( number ) => (
                        <button
                            key={number + 1}
                            onClick={() => paginate( number + 1 )}
                            className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-[#DF841C] text-white' : 'text-[#7B7A7F]'}`}
                        >
                            {number + 1}
                        </button>
                    ) )}
                    <button onClick={() => paginate( currentPage + 1 )} disabled={currentPage === Math.ceil( filteredStaff.length / itemsPerPage )}>
                        <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffTable;