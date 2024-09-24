"use client";
import Header from "@/components/Header";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import {useAppDispatch} from "@/app/redux/hooks";
// import {addAdmin} from "@/app/redux/feature/admin/api"; // Update the import to addAdmin
import {notifyError, notifySuccess} from "@/utils/toast";
import instance from "@/utils/axios";
import {useRouter} from "next/navigation";

const AddAdminPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [name, setName] = useState( "" );
    const [email, setEmail] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [confirmPassword, setConfirmPassword] = useState( "" );
    const [loading, setLoading] = useState( false );
    const [showPassword, setShowPassword] = useState( false );
    const [showConfirmPassword, setShowConfirmPassword] = useState( false );
    const togglePasswordVisibility = () => {
        setShowPassword( !showPassword );
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword( !showConfirmPassword );
    };

    const handleSubmit = async ( e: any ) => {
        e.preventDefault();
        setLoading( true );
        if ( password !== confirmPassword ) {
            notifyError( "Password and Confirm Password do not match" );
            setLoading( false );
            return;
        }
        const newAdmin = {
            name,
            email,
            password,
        };
        try {
            // await addAdmin( dispatch, newAdmin ); // Update the action to addAdmin
            const response = await instance.post( "/auth/admin/signup", newAdmin, {headers: {"Content-Type": "application/json", }, } );
            console.log( "response in creating the staff:-", response );
            if ( response.status === 200 ) {
                notifySuccess( "Admin added successfully!" );
                router.push( "/admin/staff" );
            }
            setName( "" );
            setEmail( "" );
            setPassword( "" );
            setConfirmPassword( "" );
        } catch ( error ) {
            notifyError( "Failed to add admin. Please try again." );
            console.log( "error in creating the staff:-", error );
        } finally {
            setLoading( false );
        }
    };

    return (
        <div className="ml-64 h-screen bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D]">
            <div className="border-b border-[#28272D] px-4 py-4">
                <h1 className="text-xl px-6">Add New Staff</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex px-8 py-6 gap-5">
                    <div className="w-full">
                        <div className="flex gap-3 w-full mb-4 text-[#7B7A7F]">
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Admin Name"
                                    value={name}
                                    onChange={( e ) => setName( e.target.value )}
                                    disabled={loading}
                                    className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Admin Email"
                                    value={email}
                                    onChange={( e ) => setEmail( e.target.value )}
                                    disabled={loading}
                                    className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                                />
                            </div>
                        </div>
                        {/* for confirm password also, the eye icon will be shown */}
                        <div className="flex gap-3 w-full mb-4 text-[#7B7A7F]">
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Admin Password"
                                        value={password}
                                        onChange={( e ) => setPassword( e.target.value )}
                                        disabled={loading}
                                        className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3 cursor-pointer"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter Admin Confirm Password"
                                        value={confirmPassword}
                                        onChange={( e ) => setConfirmPassword( e.target.value )}
                                        disabled={loading}
                                        className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                                    />
                                    <span
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-3 top-3 cursor-pointer"
                                    >
                                        {showConfirmPassword ? "🙈" : "👁️"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 flex justify-end">
                    <button
                        type="submit"
                        className="py-2 px-6 bg-[#DF841C] rounded text-[#000000] shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add New Staff"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdminPage;