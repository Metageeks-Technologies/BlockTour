import React from 'react';
import {IoArrowBackOutline} from 'react-icons/io5';

const OTPVerification = () => {
  return (
    <div className="flex  items-center justify-center min-h-screen ">
      <div className="bg-[#0A090F] w-max-w-md  border border-[#2b2934] p-8   rounded-lg shadow-lg w-full max-w-md text-center">
        <img src="/asset/Block-logo.svg" alt="Cluster Protocol Logo" className="mx-auto h-20 w-auto mb-6" /> {/* Replace with your logo path */}
        <h2 className="text-white text-2xl mb-8">OTP Verification</h2>
        <p className="text-neutral-400 mb-8 ">
          Please enter the OTP that we sent to the email address.
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          <input
            type="text"
            placeholder='5'
            maxLength={1}
            className="w-12 h-12 bg-[#0A090F] text-white text-center rounded-md border border-[#46454a] outline-none"
          />
          <input
            type="text"
            placeholder='2'
            maxLength={1}
            className="w-12 h-12 bg-[#0A090F] text-white text-center rounded-md border border-[#46454a] outline-none"
          />
          <input
            type="text"
            placeholder='1'
            maxLength={1}
            className="w-12 h-12 bg-[#0A090F] text-white text-center rounded-md border border-[#46454a] outline-none"
          />
          <input
            type="text"
            placeholder='0'
            maxLength={1}
            className="w-12 h-12 bg-[#0A090F] text-white text-center rounded-md border border-[#46454a] outline-none"
          />
        </div>
        <p className='text-[#FE0000] text-sm'>Please Enter Valid OTP</p>
        <p className="text-gray-400 text-sm mt-1 mb-8">
          Didn’t receive a code? Click to <a href="#" className="text-white underline">Resend</a>
        </p>
        <button className="w-full py-2 text-neutral-800 bg-[#F6911D] rounded-md focus:outline-none">
          Verify
        </button>
        <div className="mt-8 flex items-center justify-center gap-2">
          <IoArrowBackOutline className='h-5 w-5 text-neutral-400' />
          <a href="/admin/signup" className="text-gray-400 text-sm cursor-pointer"> Back to Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;