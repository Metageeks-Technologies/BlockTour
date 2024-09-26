import React from 'react';
import Footer from '@/components/Footer';

const Page = () => {
  return (
    <div className="min-h-screen lg:ml-52 bg-[#0A090F] text-white flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#DF841C]">Coming Soon</h1>
          <p className="text-xl md:text-2xl mb-8 text-[#ADADAD]">
            We're working hard to bring you amazing blockchain guides.
          </p>
          <div className="mb-8">
            <div className="inline-block border-2 border-[#DF841C] rounded-full p-2 animate-pulse">
              <div className="w-4 h-4 bg-[#DF841C] rounded-full"></div>
            </div>
          </div>
          <p className="text-lg text-[#999999]">
            Stay tuned for in-depth tutorials, expert insights, and comprehensive guides on blockchain technology.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
