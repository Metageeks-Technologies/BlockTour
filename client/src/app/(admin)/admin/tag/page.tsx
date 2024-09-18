
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React from 'react';
const tags = [
  "Collaboration", "React Developer", "Angular Developer", "Promotion",
  "Collaboration", "React Developer", "Angular Developer", "Promotion",
  "Collaboration", "React Developer", "Angular Developer", "Promotion",
  "React Developer", "Collaboration", "Promotion", "Angular Developer",
  "React Developer", "Collaboration", "Promotion", "Angular Developer",
  "Collaboration", "React Developer", "Angular Developer", "Promotion"
];

const TagList = () => {
  return (
    <div className="ml-64  bg-[#0A090F]  text-white m-4 rounded-2xl w-full border border-[#28272D]">
      <div className="border-b border-[#28272D] px-4 py-4">
        <h1 className="text-xl px-6 ">Tags</h1>
      </div>
      <div className="flex flex-wrap gap-2 px-8 py-12 ">
        {tags.map( ( tag, index ) => (
          <span
            key={index}
            className="bg-[#28272D] border border-[#626262]  text-[#CCCCCC] px-4 py-2 rounded-md  cursor-pointer transition duration-200"
          >
            {tag}
          </span>
        ) )}
      </div>
    </div> 
  );
};

export default TagList;
