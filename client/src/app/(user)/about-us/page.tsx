"use client";

import {useAppSelector} from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {useRouter} from "next/navigation";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

// const page = () => {
//   return (
//     <div className="h-[40rem] bg-gradient-to-r from-[#000000] to-[#333333]">
//       <div className="w-[80%] m-auto">
//         <Navbar />

//         <div className=" flex gap-16 mt-12 ">
//           <div className="w-full py-8  ">
//             <h1 className="text-3xl ">Welcome to BlockTour.org</h1>
//             <h4 className=" font text-lg  mt-5">
//               Your Gateway to the Blockchain World
//             </h4>
//             <p className="mt-2  text-[#ADADAD]">
//               At BlockTour.org, we are driven by a single mission: to demystify
//               blockchain technology and make it accessible to everyone.
//             </p>
//             <p className="mt-6  text-[#ADADAD]">
//               Our platform serves as a hub for blockchain enthusiasts,
//               professionals, and newcomers alike, offering a unique blend of
//               educational resources, real-world events, and immersive tours that
//               showcase the transformative potential of blockchain.
//             </p>
//           </div>
//           <div className="w-full">
//             <img src="/asset/banner.jpg" alt="" className="rounded-xl" />
//           </div>
//         </div>
//       </div>

//       <div className=" w-[80%] m-auto">
//         <div className="bg-[#000000] my-12 p-12 border rounded-md border-[#333333]">
//           <h1 className="text-4xl text-center">Our Journey</h1>
//           <p className="text-center text-[#ADADAD] mt-6 ">
//             Founded in 2021 by a team of blockchain advocates and tech
//             entrepreneurs, BlockTour.org has quickly grown into a trusted
//             community resource. With backgrounds in cryptography, business, and
//             education, our founders envisioned a platform that bridges the gap
//             between complex blockchain technology and everyday users.
//           </p>
//         </div>

//         <div className="flex gap-10">
//           <div className="w-full">
//             <img src="/asset/Group 13398.jpg" alt="" className="rounded-xl" />
//           </div>

//           <div className="w-full flex flex-col gap-4">
//             <h1 className="text-4xl">What We Do</h1>
//             <p className="text-[#ADADAD]">
//               <span className="text-white">Events and Meetups:</span> We
//               organize and host a variety of events ranging from introductory
//               seminars for beginners to advanced workshops for tech
//               professionals. These gatherings are great opportunities to learn,
//               network, and share knowledge.
//             </p>

//             <p className="text-[#ADADAD]">
//               <span className="text-white">Educational Tours:</span> Our
//               signature blockchain tours take participants to key sites and
//               companies leading the blockchain revolution. These tours provide a
//               firsthand look at how blockchain technology is being implemented
//               across different industries.
//             </p>

//             <p className="text-[#ADADAD]">
//               {" "}
//               <span className="text-white">Resource Hub:</span> From in-depth
//               articles and tutorials to podcasts and interviews with industry
//               leaders, our resources are designed to educate and inspire.
//               Whether you’re looking to understand the basics of blockchain or
//               dive into complex topics, we have something for everyone.
//             </p>
//           </div>
//         </div>

//         <div className="flex gap-10 items-center py-12">
//           <div className=" w-full">
//             <h1 className="text-4xl">Our Community Commitment</h1>
//             <p className="mt-4 text-[#ADADAD]">
//               We believe in the power of community and the role it plays in
//               advancing technology. BlockTour.org is committed to fostering a
//               supportive and inclusive environment where all members can explore
//               the potential of blockchain technology together.
//             </p>
//           </div>

//           <div className="w-full">
//             <img src="/asset/Group 13399.jpg" alt="" className="rounded-xl" />
//           </div>
//         </div>

//         <div className="h-60 bg-gradient-to-r from-[#000000] via-[#333333] to-[#000000] flex items-center ">
//           <div className="flex flex-col">
//             <h1 className="text-4xl text-center">Join Us</h1>
//             <p className="mt-6 px-12 text-[#ADADAD]">
//               Whether you’re a blockchain novice, a seasoned developer, or
//               simply curious about new technologies, BlockTour.org is your
//               starting point. Join us on this exciting journey to explore and
//               shape the future of blockchain. Let’s discover the endless
//               possibilities together!
//             </p>
//           </div>
//         </div>

//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default page;

const page = () => {
  const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );
  const router = useRouter();
  return (
    <div className="lg:ml-52">
      <div className=" flex pb-12 w-[90%] m-auto">
        <div className="w-full m-auto pt-8">
          <div className="w-[80%] m-auto">
            <h1 className="text-3xl">Welcome to BlockTour.org</h1>

            <div className=" flex flex-col gap-6 text-[#CCCCCC] ">
              <div>
                <h1 className="text-lg font-semibold mt-3 text-[#CCCCCC]">
                  Your Gateway to the Blockchain World
                </h1>
                <p className="mt-3 ">
                  At BlockTour.org, we are driven by a single mission: to
                  demystify blockchain technology and make it accessible to
                  everyone.
                </p>
              </div>

              <p>
                Our platform serves as a hub for blockchain enthusiasts,
                professionals, and newcomers alike, offering a unique blend of
                educational resources, real-world events, and immersive tours
                that showcase the transformative potential of blockchain.
              </p>

              <div>
                <h1 className="text-4xl">Our Journey</h1>
                <p className="mt-2">
                  Founded in 2021 by a team of blockchain advocates and tech
                  entrepreneurs, BlockTour.org has quickly grown into a trusted
                  community resource. With backgrounds in cryptography,
                  business, and education, our founders envisioned a platform
                  that bridges the gap between complex blockchain technology and
                  everyday users.
                </p>
              </div>

              <div>
                <h1 className=" text-4xl ">What We Do</h1>
                <p className="mt-2">
                  <span className="text-white">Events and Meetups: </span>
                  We organize and host a variety of events ranging from
                  introductory seminars for beginners to advanced workshops for
                  tech professionals. These gatherings are great opportunities
                  to learn, network, and share knowledge.
                </p>
              </div>

              <p>
                <span className="text-white">Educational Tours: </span>Our
                signature blockchain tours take participants to key sites and
                companies leading the blockchain revolution. These tours provide
                a firsthand look at how blockchain technology is being
                implemented across different industries.
              </p>

              <p>
                <span className="text-white">Resource Hub: </span>From in-depth
                articles and tutorials to podcasts and interviews with industry
                leaders, our resources are designed to educate and inspire.
                Whether you’re looking to understand the basics of blockchain or
                dive into complex topics, we have something for everyone.
              </p>

              <div>
                <h1 className="text-4xl">Our Community Commitment</h1>
                <p className="mt-2">
                  We believe in the power of community and the role it plays in
                  advancing technology. BlockTour.org is committed to fostering
                  a supportive and inclusive environment where all members can
                  explore the potential of blockchain technology together.
                </p>
              </div>

              <div className="bg-[#0A090F] p-5 border border-[#17161B]">
                <h1 className="text-4xl">Join Us</h1>
                <p className="mt-2">
                  Whether you’re a blockchain novice, a seasoned developer, or
                  simply curious about new technologies, BlockTour.org is your
                  starting point. Join us on this exciting journey to explore
                  and shape the future of blockchain. Let’s discover the endless
                  possibilities together!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] lg:pl-8 mt-8 ">
          <div className="relative border border-[#28272D] rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
          {!user ? (
            <div className="  flex items-center justify-evenly py-6">
              <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg" onClick={() => router.push( "/auth/user/signup" )}>
                Join for free
              </button>
              <p className="text-lg hover:underline" onClick={() => router.push( "/auth/user/login" )}>Sign In</p>
            </div>
          ) : (
            <div className="  flex items-center justify-end gap-8 py-6 cursor-pointer" onClick={() => router.push( "/view-profile" )}>
              <p className="text-lg font-semibold">{user?.name}</p>
              <img src={user?.profileImage} alt="" className="w-10 h-10 rounded-full" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
