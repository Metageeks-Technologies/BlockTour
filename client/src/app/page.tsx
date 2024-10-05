"use client";
import Trending from "@/components/Home/Tranding";
import NFT from "@/components/Home/NFT";
import Blockchain from "@/components/Home/Blockchain";
import Politics from "@/components/Home/Politics";
import Tech from "@/components/Home/Crypto";
import Latest from "@/components/Home/Latest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {getAllPosts} from "./redux/feature/posts/api";
import {getAllCategories} from "./redux/feature/category/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {formatDateTime} from "@/utils/DateFormat";
import {useRouter} from "next/navigation";
import BlogMarquee from "@/components/Home/Marquee";

export default function Home () {
  const dispatch = useAppDispatch();
  const posts = useAppSelector( ( state ) => state.post.posts );
  const router = useRouter();
  const [loading, setLoading] = useState( true );

  // Sort posts by views and then filter by category;
  const trendingPosts = useMemo( () => {
    return posts.slice().sort( ( a: any, b: any ) => ( b.views || 0 ) - ( a.views || 0 ) ).filter( ( post: any ) => ( post.status.toLowerCase() === "published" ) ).slice( 0, 5 );
  }, [posts] );

  useEffect( () => {
    getAllPosts( dispatch );
    getAllCategories( dispatch );
    setLoading( false );
  }, [] );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,
    className: "slider-container",
  };

  return (
    <div>
      <BlogMarquee />
      <div className="flex flex-col max-md:pb-24">
        <div className="absolute lg:px-16  top-12 left-0 right-0 z-50  bg-transparent">
          <Navbar />
        </div>

        {
          loading || !trendingPosts.length ?
            <div className="w-[95%] min-h-[650px] bg-gray-800 animate-pulse mx-auto">
              <div className="w-full h-full flex flex-col justify-end p-16">
              </div>
            </div>
            :
            trendingPosts.length > 0 && (
              <Slider {...sliderSettings} className="w-full slider-container">
                {trendingPosts.map( ( post: any ) => (
                  <div key={post._id} className="relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[90vh] flex items-center px-4 md:px-8 lg:px-16">
                    <img
                      loading="lazy"
                      src={post.previewImageUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt={post.title}
                    />
                    {/* blur effect */}
                    <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 lg:px-16 mt-40 pt-52">
                      <div className="bg-white bg-opacity-0 p-4 md:p-6 lg:p-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white line-clamp-2 cursor-pointer" onClick={() => router.push( `/article/${post.permaLink}` )}>
                          {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-2.5 mt-4 text-sm font-bold">
                          <div className="px-1.5 py-1 bg-amber-600 text-stone-950">{post.category.join( ", " )}</div>
                          <div className="text-white text-opacity-50">
                            {formatDateTime( post?.createdAt )}
                          </div>
                        </div>
                        <div className="mt-4 text-sm md:text-base font-medium text-white text-opacity-50 line-clamp-2">
                          {post.description.replace( /<[^>]*>?/gm, '' )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) )}
              </Slider>
            )}

        {/* Divider */}
        <div className="flex shrink-0 self-stretch w-full h-px border border-solid border-white border-opacity-10" />

        <div className="flex  flex-col items-end self-center mt-8 max-w-full lg:w-[80%] md:w-full w-full lg:px-0 md:px-4 px-4">
          {/* Trending */}
          <div className="flex gap-3 items-start self-start  w-full text-2xl b font-medium leading-none whitespace-nowrap text-neutral-400 ">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d03d360d4207e4a2d392902c175c8f0caaf126cba404b76951246164475299f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 w-10 aspect-[1.11]" alt=""
            />
            <div className="mt-3 basis-auto">Trending</div>
          </div>

          <div className="mt-9 max-w-full w-full">
            <Trending />
          </div>

          {/* NFT Section*/}

          <div className="flex shrink-0 mt-9 max-w-full h-px border-t border-white border-opacity-10 w-full" />

          <div className="flex flex-wrap gap-5 justify-between items-center mt-11 max-w-full font-medium text-neutral-400 w-full max-md:mt-10 max-md:mr-1">
            <div className="flex gap-5 items-center text-2xl leading-none whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30cb3320b36ef746f43163935701e87580fa04d571e206ea0308169ffa78fd67?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                className="object-contain shrink-0 aspect-square w-[39px]"
              />
              <h1>NFT</h1>
            </div>

            {/* <div className="flex gap-2.5 mt-3.5 text-base leading-7">
            <div>See all</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbba5c0b4581ad1e88995cbfe3f8a4b8fbf67aad29f2d2d15241baac2b6b255?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 my-auto w-4 aspect-[1.14]"
            />
          </div> */}
          </div>

          <div className="mt-9 max-w-full w-full">
            <NFT />
          </div>

          {/* Blockchain section*/}

          <div className="flex shrink-0 mt-16 max-w-full h-px border-t border-white border-opacity-10 w-full max-md:mt-10" />

          <div className="mt-10 max-w-full w-full ">
            <Blockchain />
          </div>

          {/* this section done */}

          <div className="flex shrink-0 mt-24 max-w-full h-px border-t border-white border-opacity-10 w-full max-md:mt-10" />
          <div className="flex  flex-wrap gap-5 justify-between mt-12 max-w-full font-medium text-neutral-400 w-full max-md:mt-10">
            <div className="flex gap-5 text-2xl leading-none whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b560163035b0f8ea22001cd383905461d6737a7f7afd5ecceb11a5f43015f4a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                className="object-contain shrink-0 aspect-square w-[39px]"
              />
              <div className="my-auto">Politics</div>
            </div>
            {/* <div className="flex gap-2.5 self-start mt-2 text-base leading-7">
            <div>See all</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/90752f1fcffef6a72b0219699e043d6559175fbec658bf27339e099e094e02a0?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 my-auto w-4 aspect-[1.14]"
            />
          </div> */}
          </div>

          <div className="mt-10 max-w-full w-full">
            <Politics />
          </div>

          {/* Tech and Music section  */}

          <div className="flex shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-full max-md:mt-10" />
          <div className="mt-9  w-full flex lg:flex-row md:flex-row flex-col gap-8 ">
            <Tech />
          </div>

          {/* Latest post section  */}
          <div className="flex shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-full max-md:mt-10" />

          <div className="mt-14  max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <Latest />
            </div>
          </div>

          {/* Footer Section */}

          <div className="flex shrink-0 mt-16 max-w-full h-px border-t border-white border-opacity-10 w-full max-md:mt-10" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
