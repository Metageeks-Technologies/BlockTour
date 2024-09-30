// components/BlogMarquee.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';

const BlogMarquee: React.FC = () => {
  return (
    <div className="bg-tra px-2">
      <Marquee
        speed={60}
        className="text-white h-12 text-xl font-semibold tracking-wider w-[90%]"
      >
        <div className="mx-6 flex items-center">
          <span className="mr-2">📰</span> 
          Discover the Latest Blockchain News!
        </div>
        <div className="mx-6 flex items-center">
          <span className="mr-2">📊</span>
          In-Depth Analysis on Crypto Market Trends!
        </div>
        <div className="mx-6 flex items-center">
          <span className="mr-2">💡</span>
          Learn Blockchain Basics: Beginner's Guides!
        </div>
        <div className="mx-6 flex items-center">
          <span className="mr-2">🔐</span>
          Secure Your Crypto with Our Best Practices!
        </div>
        <div className="mx-6 flex items-center">
          <span className="mr-2">🎙️</span>
          Interviews with Blockchain Thought Leaders!
        </div>
        <div className="mx-6 flex items-center">
          <span className="mr-2">🚀</span>
          Stay Ahead with Emerging Blockchain Innovations!
        </div>
      </Marquee>
    </div>
  );
};

export default BlogMarquee;
