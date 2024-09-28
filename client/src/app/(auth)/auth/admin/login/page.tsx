"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getCurrentAdmin } from "@/app/redux/feature/admin/api";
import { useAppDispatch } from "@/app/redux/hooks";
import instance from "@/utils/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await instance.post(
        "/auth/admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("token :-",response)
      // Store the token in cookies
      Cookies.set("AdminToken", response.data.token, { expires: 7 });
      console.log(response.data.token);

      getCurrentAdmin(dispatch);
      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.log("error in login:-", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className=" w-[35rem] p-8 space-y-4 bg-[#0A090F] rounded-3xl shadow-md border border-[#2b2934]">
          <div className="text-center">
            <img
              src="/asset/Block-logo.svg"
              alt="Cluster Protocol"
              className="mx-auto h-20 w-auto"
              onClick={() => router.push("/")}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                className={`group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-neutral-800 bg-[#F6911D] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Page;
