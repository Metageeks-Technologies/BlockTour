import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="m-auto">
    <div className="flex overflow-hidden flex-col bg-black pb-[350px]  ">

      <div className="flex relative flex-col items-center px-20  pb-96 w-full min-h-[720px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd69ba42434e998f90368c63a0556862966ad896628d9150126a7e643835161e?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col mb-0 max-w-full w-[1194px] max-md:mb-2.5">
        <Navbar />
        {/* flex relative flex-col items-start max-w-full w-[1220px] */}
        <div className="pt-20">
          <div className="text-center text-4xl font-medium leading-none text-white">
            Contact us
          </div>
          <div className="mt-2.5 text-2xl leading-10 text-center text-zinc-400 max-md:max-w-full">
            Block Tour is ready to provide the right solution
            <br />
            according to your needs
          </div>
          </div>
        </div>
      </div>

      <div className="flex z-10 h-[39rem] rounded absolute top-[26rem] self-center w-[70%] m-auto  bg-black border border-solid border-zinc-800 ">
        <div className="flex border rounded border-[#333333] flex-col w-full bg-gradient-to-br from-[#000000] to-[#333333]   ">
          <div className="p-10">
            <div className="text-4xl font-medium leading-none text-white">
              Get in Touch
            </div>

            <div className=" flex flex-col gap-6 mt-7">
              <div className="flex gap-2 items-center">
                <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
                  <img src="/asset/maps.svg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold">Send us a message</h1>
                  <p className="text-sm text-[#CCCCCC]">
                    Address: Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit.
                  </p> 
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
                  <img src="/asset/mail.svg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold">Email Us</h1>
                  <p className="text-sm text-[#CCCCCC]">
                    support@blocktour.org
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="border bg-[#000000] border-[#333333] w-16 h-16 rounded-full flex justify-center items-center ">
                  <img src="/asset/27-call.svg" alt="" />
                </div>
                <div>
                  <h1 className="font-semibold">Email Us</h1>
                  <p className="text-sm text-[#CCCCCC]">
                    support@blocktour.org
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 self-stretch mt-9 w-full h-px bg-zinc-600" />

            <div className="mt-8 text-lg font-medium leading-none text-white">
              Follow our Social media
            </div>

            <div className="flex gap-2 mt-5">
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

        <div className="flex flex-col w-full ">
          <div className="p-10">
            <div className="self-start text-4xl text-white">
              Send us a message
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mt-3">
                <label className="block text-[#777777] mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                />
              </div>

              <div className="mt-3">
                <label className="block text-[#777777] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your Company Name"
                  className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                />
              </div>

              <div>
                <label className="block text-[#777777] mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                />
              </div>

              <div>
                <label className="block text-[#777777] mb-1">Email</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-[#777777] mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter your Subject "
                className="w-full px-4 py-3 rounded-3xl bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
              />
            </div>

            <div className="mt-3">
              <label className="block text-[#777777] mb-1">Message</label>
              <textarea
                name="subject"
                placeholder="Enter your Message"
                rows={2}
                className="w-full px-4 py-3 rounded-md bg-[#000000] border border-[#28272D] text-white outline-none custom-input"
              />
            </div>

            <div className="flex justify-end items-center">
              <button className=" px-12  py-3 mt-8 font-semibold  bg-amber-500 rounded-3xl text-black 5">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default page;
