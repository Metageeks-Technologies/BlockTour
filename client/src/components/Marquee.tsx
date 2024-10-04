// components/BlogMarquee.tsx
"use client";
import {getAllNews} from '@/app/redux/feature/news/api';
import {useAppSelector, useAppDispatch} from '@/app/redux/hooks';
import {RootState} from '@/app/redux/store';
import React, {useEffect} from 'react';
import Marquee from 'react-fast-marquee';

const BlogMarquee: React.FC = () => {
  const {news} = useAppSelector( ( state: RootState ) => state.news );
  const dispatch = useAppDispatch();
  useEffect( () => {
    dispatch( getAllNews );
  }, [] );
  return (
    <div className="px-2">
      <Marquee speed={60} className="text-white h-12 text-xl font-semibold tracking-wider w-[90%]" >
        {news.map( ( news: any ) => {
          return (
            <div className="mx-6 flex items-center">
              <span className="mr-2">{news?.icon}</span>
              {news?.title}
            </div>
          );
        } )} 
      </Marquee>
    </div>
  );
};

export default BlogMarquee;
