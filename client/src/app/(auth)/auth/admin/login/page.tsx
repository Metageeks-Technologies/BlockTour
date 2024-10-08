"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
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
      const response = await instance.post( "/auth/admin/login", {email, password} ); 
      console.log("response:-",response)
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
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-[35rem] p-4 sm:p-8 space-y-4 bg-[#0A090F] rounded-3xl shadow-md border border-[#2b2934]">
          <div className="text-center">
            <img
              src="/asset/Block-logo.svg"
              alt="Cluster Protocol"
              className="mx-auto h-16 sm:h-20 w-auto cursor-pointer"
              onClick={() => router.push( "/" )}
            />
            <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-extrabold text-white">
              Login to Your Account!
            </h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div className="rounded-md shadow-sm space-y-4 sm:space-y-5">
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
                  className="appearance-none mt-1 rounded-md bg-[#0A090F] relative block w-full px-3 py-2 sm:py-2.5 border border-[#46454a] placeholder-gray-500 focus:outline-none text-sm"
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
                  className="appearance-none mt-1 bg-[#0A090F] rounded-md relative block w-full px-3 py-2 sm:py-2.5 border border-[#46454a] placeholder-gray-500 focus:outline-none text-sm"
                  placeholder="Enter your password"
                />
                
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 top-7 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-[#7B7A7F]" />
                  ) : (
                    <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-[#7B7A7F]" />
                  )}
                </button> 
              </div> 
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
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
          {/* <div className="flex items-center justify-center my-6 px-5">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-neutral-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <div className="mt-6 px-5 text-center text-neutral-400">
            <div className="flex justify-center gap-3 mt-2">
              <button className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm">
                <img
                  src="https://th.bing.com/th/id/R.7e557f1c0864829c54c300d15bee69f4?rik=fjZN1AYH30vXIw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgoogle%2fgoogle_PNG19635.png&ehk=ZmsumEtoeJQhKoUzQTZO2TEbYPBu0%2b7EFdjmJ3qljls%3d&risl=&pid=ImgRaw&r=0"
                  alt="Google"
                  className="w-6 h-6"
                />
                Google
              </button>
              <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <img src="/asset/Vector.svg" alt="Facebook" />
                Facebook
              </button>
              <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <img src="/asset/Instagram_1_.svg" alt="Instagram" />
                Instagram
              </button>
              <button className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm">
                <img
                  src="/asset/Group1.svg"
                  alt="FAM Protocol"
                  className="w-6 h-6"
                />
                FAM Protocol
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Page;
