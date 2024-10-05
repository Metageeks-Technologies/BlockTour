"use client";
import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/navigation";
import instance from "@/utils/axios";
import {FaEyeSlash, FaEye, FaGoogle, FaFacebookF, FaInstagram} from "react-icons/fa";
import {SiBlockchaindotcom} from "react-icons/si";
import {useAppDispatch} from "@/app/redux/hooks";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState( "" );
  const [password, setPassword] = useState( "" );
  const [loading, setLoading] = useState( false );
  const [showPassword, setShowPassword] = useState( false );
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword( !showPassword );
  };

  const handleLogin = async ( event: React.FormEvent ) => {
    event.preventDefault();
    setLoading( true );

    try {
      const response = await instance.post( "/auth/user/login", {email, password} );
      console.log( response.data );
      getCurrentUser( dispatch );
      router.push( "/dashboard" );
      toast.success( "Login successful!" );
    } catch ( error ) {
      toast.error( "Login failed. Please try again." );
      console.log( "error:-", error );
    } finally {
      setLoading( false );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 sm:p-8 space-y-4 bg-[#0A090F] rounded-3xl shadow-md border border-[#2b2934]">
          <div className="text-center">
            <img
              src="/asset/Block-logo.svg"
              alt="Block Tour Logo"
              className="mx-auto h-20 w-auto cursor-pointer"
              onClick={() => router.push( "/" )}
            />
            <h2 className="mt-6 text-2xl font-extrabold text-white">
              Login to Your Account!
            </h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="rounded-md shadow-sm space-y-5">
              <div>
                <span className="text-sm text-neutral-400">Email Address</span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={( e ) => setEmail( e.target.value )}
                  className="appearance-none mt-1 rounded-md bg-[#0A090F] relative block w-full px-3 py-2.5 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="w-full relative">
                <span className="text-sm text-neutral-400">Password</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={( e ) => setPassword( e.target.value )}
                  className="appearance-none mt-1 bg-[#0A090F] rounded-md relative block w-full px-3 py-2.5 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 top-7 flex items-center "
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-[#7B7A7F]" />
                  ) : (
                    <FaEye className="h-5 w-5 text-[#7B7A7F]" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-neutral-400"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-neutral-400 hover:text-white underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-neutral-800 bg-[#F6911D] ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center my-6 px-5">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-neutral-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <div className="mt-6 px-5 text-center text-neutral-400">
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <button className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm">
                <FaGoogle className="w-5 h-5" />
                <span className="hidden sm:inline">Google</span>
              </button>
              <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <FaFacebookF className="w-5 h-5" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <FaInstagram className="w-5 h-5" />
                <span className="hidden sm:inline">Instagram</span>
              </button>
              <button className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm">
                <SiBlockchaindotcom className="w-5 h-5" />
                <span className="hidden sm:inline">FAM Protocol</span>
              </button>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-neutral-400">
            Don't have an account?{" "}
            <a
              href="/auth/user/signup"
              className="font-medium text-white hover:text-gray-300 underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;