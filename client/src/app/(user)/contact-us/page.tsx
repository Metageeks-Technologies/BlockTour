import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

// const page = () => {
//   return (
//     <div className="m-auto">
//     <div className="flex overflow-hidden flex-col bg-black pb-[350px]  ">

//       <div className="flex relative flex-col items-center px-20  pb-96 w-full min-h-[720px] max-md:px-5 max-md:py-24 max-md:max-w-full">
//         <img
//           loading="lazy"
//           srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
//           className="object-cover absolute inset-0 size-full"
//         />
//         <div className="flex relative flex-col mb-0 max-w-full w-[1194px] max-md:mb-2.5">
//         <Navbar />
//         {/* flex relative flex-col items-start max-w-full w-[1220px] */}
//         <div className="pt-20">
//           <div className="text-center text-4xl font-medium leading-none text-white">
//             Contact us
//           </div>
//           <div className="mt-2.5 text-2xl leading-10 text-center text-zinc-400 max-md:max-w-full">
//             Block Tour is ready to provide the right solution
//             <br />
//             according to your needs
//           </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex z-10 h-[39rem] rounded absolute top-[26rem] self-center w-[70%] m-auto  bg-black border border-solid border-zinc-800 ">
//         <div className="flex border rounded border-[#333333] flex-col w-full bg-gradient-to-br from-[#000000] to-[#333333]   ">
//           <div className="p-10">
//             <div className="text-4xl font-medium leading-none text-white">
//               Get in Touch
//             </div>

//             <div className=" flex flex-col gap-6 mt-7">
//               <div className="flex gap-2 items-center">
//                 <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
//                   <img src="/asset/maps.svg" alt="" />
//                 </div>
//                 <div>
//                   <h1 className="font-semibold">Send us a message</h1>
//                   <p className="text-sm text-[#CCCCCC]">
//                     Address: Lorem ipsum dolor sit amet,
//                     <br />
//                     consectetur adipiscing elit.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
//                   <img src="/asset/mail.svg" alt="" />
//                 </div>
//                 <div>
//                   <h1 className="font-semibold">Email Us</h1>
//                   <p className="text-sm text-[#CCCCCC]">
//                     support@blocktour.org
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
//                   <img src="/asset/27-call.svg" alt="" />
//                 </div>
//                 <div>
//                   <h1 className="font-semibold">Email Us</h1>
//                   <p className="text-sm text-[#CCCCCC]">
//                     support@blocktour.org
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex shrink-0 self-stretch mt-9 w-full h-px bg-zinc-600" />

//             <div className="mt-8 text-lg font-medium leading-none text-white">
//               Follow our Social media
//             </div>

//             <div className="flex gap-2 mt-5">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/99fdd6728cdafa0069b9fb70334f3f0466e4beda2023cfa8e438d7a5aa914851?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
//                 className="object-contain shrink-0 w-10 rounded-none aspect-square"
//               />
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/a71e3dc73c4eb5271d146a7425c8b92c3835c00d454af36051d21ecfca0bff8a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
//                 className="object-contain shrink-0 w-10 rounded-none aspect-square"
//               />
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7d3a31c0b4e7002901728f0f7ebb00c80cfa7c4026c508b82b6a53f060d4380?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
//                 className="object-contain shrink-0 w-10 rounded-none aspect-square"
//               />
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/b43db349c4af3794d2aa1f5d0c6198f27dc512f2d4a5c9e5fc3fd082e4185c43?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
//                 className="object-contain shrink-0 w-10 rounded-none aspect-square"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col w-full ">
//           <div className="p-10">
//             <div className="self-start text-4xl text-white">
//               Send us a message
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="mt-3">
//                 <label className="block text-[#777777] mb-1">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="Enter your first name"
//                   className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//                 />
//               </div>

//               <div className="mt-3">
//                 <label className="block text-[#777777] mb-1">
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="Enter your Company Name"
//                   className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[#777777] mb-1">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Enter your phone"
//                   className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[#777777] mb-1">Email</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="Enter your Email"
//                   className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//                 />
//               </div>
//             </div>

//             <div className="mt-3">
//               <label className="block text-[#777777] mb-1">Subject</label>
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Enter your Subject "
//                 className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//               />
//             </div>

//             <div className="mt-3">
//               <label className="block text-[#777777] mb-1">Message</label>
//               <textarea
//                 name="subject"
//                 placeholder="Enter your Message"
//                 rows={2}
//                 className="w-full px-4 py-3 rounded-md bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
//               />
//             </div>

//             <div className="flex justify-end items-center">
//               <button className=" px-12  py-3 mt-8 font-semibold  bg-amber-500 rounded-3xl text-black 5">
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//     </div>
//   );
// };

// export default page;

const page = () => {
  return (
    <div className="lg:ml-52 w-full">
      <div className="w-[90%] m-auto ">
        <div className="flex ">
          <div className="flex justify-center py-12 w-[70%] ">
            <div className=" flex flex-col w-[80%] m-auto">
              <h1 className="text-4xl text-center text-[#BBBBBB] ">Contact us</h1>
              <p className="text-center mt-2 text-[#BBBBBB]">
                Block Tour is ready to provide the right solution <br />{" "}
                according to your needs
              </p>

              <div className="py-10">
                <div className="grid grid-cols-2 gap-4 w-full ">
                  <div className="mt-3">
                    <label className="block text-[#777777]">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-[#777777]">Company Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your Company Name"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[#777777]">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter your phone"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[#777777]">Email</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your Email"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-[#777777] mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter your Subject "
                    className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-[#777777] mb-1">Message</label>
                  <textarea
                    name="subject"
                    placeholder="Enter your Message"
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                  />
                </div>
              </div>

              <div className="border border-[#333333] grid grid-cols-3 p-5">
                <div className="flex justify-center items-center border-r border-[#333333]">
                  <div className="flex flex-col items-center">
                    <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center">
                      <img src="/asset/mail.svg" alt="" />
                    </div>
                    <h1 className="mt-3 text-lg text-white font-semibold">
                      Email Us
                    </h1>
                    <p className="text-white">support@blocktour.org</p>
                  </div>
                </div>

                <div className="flex justify-center items-center border-r border-[#333333]">
                  <div className="flex flex-col items-center">
                    <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center">
                      <img src="/asset/27-call.svg" alt="" />
                    </div>
                    <h1 className="mt-3 text-lg text-white font-semibold">
                      Call Us
                    </h1>
                    <p className="text-white">+9198107928XX</p>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center">
                      <img src="/asset/maps.svg" alt="" />
                    </div>
                    <h1 className="mt-3 text-lg text-white font-semibold">
                      Address:
                    </h1>
                    <p className="text-white ">Lorem ipsum dolor sit,</p>
                  </div>
                </div>
              </div>
                
                <div className="flex justify-center my-8">
              <div >
                {" "}
               <h1> Follow our Social media</h1>
                <div className="flex gap-2 mt-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/99fdd6728cdafa0069b9fb70334f3f0466e4beda2023cfa8e438d7a5aa914851?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 w-10 rounded-none aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a71e3dc73c4eb5271d146a7425c8b92c3835c00d454af36051d21ecfca0bff8a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 w-10 rounded-none aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7d3a31c0b4e7002901728f0f7ebb00c80cfa7c4026c508b82b6a53f060d4380?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 w-10 rounded-none aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b43db349c4af3794d2aa1f5d0c6198f27dc512f2d4a5c9e5fc3fd082e4185c43?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 w-10 rounded-none aspect-square"
                />
              </div>
              </div>

              
              </div>
            </div>
          </div>
          <div className="w-[35%] lg:pl-8 mt-4 ">
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
          <div className="  flex items-center justify-between   py-6">
            <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg">
              Join for free
            </button>
            <p className="text-lg hover:underline">Sign In</p>
          </div>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default page;
