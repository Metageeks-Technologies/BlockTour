"use client";
import {useAppSelector} from '@/app/redux/hooks';
import {useRouter} from 'next/navigation';
import React from 'react';
import HtmlContent from '../HtmlContent';
import {formatDateTime} from '@/utils/DateFormat';

const Blockchain = () => {
  const router = useRouter();
  const posts = useAppSelector( ( state: any ) => state.post.posts );
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" && post.category.includes( "Blockchain" ) ).reverse().slice( 0, 4 );

  return (
    <div className="flex lg:flex-row md:flex-row flex-col gap-6 ">
      <div className="flex flex-col gap-y-10 lg:basis-[69%] md:basis-[60%]">
        <div className="flex flex-wrap gap-5 justify-between w-full font-medium text-neutral-400 max-md:max-w-full">
          <div className="flex items-center gap-5 text-2xl leading-none whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96a2929769fb0495e4dfcad36839f35b9d19b3f07f360b7d04bcb6c05e2c6685?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 aspect-square w-[39px]"
            />
            <div className="basis-auto">Blockchain</div>
          </div>
          {/* <div className="flex gap-2.5 self-start mt-2.5 text-base leading-7">
            <div>See all</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbba5c0b4581ad1e88995cbfe3f8a4b8fbf67aad29f2d2d15241baac2b6b255?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 my-auto w-4 aspect-[1.14]"
            />
          </div> */}
        </div>
        {publishedPosts.length === 0 ? (
          <div className="animate-pulse">
            <div className="flex flex-col gap-y-10 lg:basis-[69%] md:basis-[60%]">
              {[...Array( 4 )].map( ( _, index ) => (
                <div key={index} className="flex lg:flex-row md:flex-col flex-col gap-8 w-full">
                  <div className="h-56 lg:w-80 md:w-full bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-300 w-3/4 mb-2"></div>
                    <div className="flex gap-3 items-center mb-4">
                      <div className="h-6 w-20 bg-gray-300"></div>
                      <div className="h-4 w-24 bg-gray-300"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 w-full"></div>
                      <div className="h-4 bg-gray-300 w-full"></div>
                      <div className="h-4 bg-gray-300 w-3/4"></div>
                    </div>
                  </div>
                </div>
              ) )}
            </div>
          </div>
        ) : (
          publishedPosts.map( ( card: any ) => (
            <div key={card.id} className="flex lg:flex-row md:flex-col flex-col gap-8 w-full cursor-pointer" onClick={() => {router.push( `/article/${card.permaLink}` );}}>
              {card.postType?.toLowerCase() === "video post" ? (
                <video
                  src={card.previewImageUrl}
                  controls
                  className="h-56 lg:w-80 md:w-full object-cover"
                />
              ) : (
                <img
                  loading="lazy"
                  src={card.previewImageUrl}
                  alt={card.title}
                  className="h-56 lg:w-80 md:w-full object-cover"
                />
              )}

              <div>
                <h1 className="text-2xl text-white font-semibold line-clamp-2">
                  {card.title}
                </h1>
                <div className="mt-1 flex gap-3 items-center">
                  <button className="bg-[#DF841C] py-0.5 px-3">
                    {card.category.join( ", " )}
                  </button>
                  <p className="text-sm text-neutral-400">{formatDateTime( card.createdAt )}</p>
                </div>
                <div className="text-neutral-400 mt-5 line-clamp-4" dangerouslySetInnerHTML={{__html: card?.description}} />
              </div>
            </div>
          ) )
        )}
      </div>

      <div className="flex flex-col ml-5  lg:basis-[31%]  md:basis-[40%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col mt-3.5 w-full max-md:mt-10">
          <div className="flex overflow-hidden gap-5 justify-between w-full  bg-neutral-800">
            <div className="flex gap-2 items-center">
              <div className="flex relative flex-col justify-center items-end self-stretch px-4 py-2 ">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d16a1a60effe1411263aa544a7cdf8129cc38b15def8a8b6d727d93657e4ae10?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative shrink-0 w-full h-4 bg-white bg-opacity-10" />
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                22,000
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                Fans
              </div>
            </div>
            <div className="px-4 py-1 my-auto text-xs font-bold leading-none text-white uppercase whitespace-nowrap border-l border-white border-opacity-10">
              Like
            </div>
          </div>

          <div className="flex overflow-hidden gap-5 justify-between mt-2.5 w-full bg-neutral-800">
            <div className="flex gap-2 items-center">
              <div className="flex relative flex-col justify-center items-end self-stretch px-4 py-2 ">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/533701f176055a9890c52e9c7ff8377bccab6a233c7ca9d3df84ad8cb246747f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative shrink-0 w-full h-4 bg-white bg-opacity-10" />
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                46,000
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                Followers
              </div>
            </div>
            <div className="px-4 py-1 my-auto text-xs font-bold leading-none text-white uppercase whitespace-nowrap border-l border-white border-opacity-10">
              Follow
            </div>
          </div>
          <div className="flex overflow-hidden gap-5 justify-between mt-2.5 w-full bg-neutral-800">
            <div className="flex gap-2 items-center">
              <div className="flex relative flex-col justify-center items-end self-stretch px-4 py-2 ">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e0febff62092c58b8ab181c39eacec75068e03b51ea34f111f2762c9ab9e0f?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative shrink-0 w-full h-4 bg-white bg-opacity-10" />
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                500
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                Followers
              </div>
            </div>
            <div className="px-4 py-1 my-auto text-xs font-bold leading-none text-white uppercase whitespace-nowrap border-l border-white border-opacity-10">
              Follow
            </div>
          </div>
          <div className="flex overflow-hidden gap-5 justify-between mt-2.5 w-full bg-neutral-800">
            <div className="flex gap-2 items-center">
              <div className="flex relative flex-col justify-center items-end self-stretch  py-2 px-4">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/63f87e778d822f2b1b5d962fafc2548d8666846971d5c52e482d5a185b7fe31b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative shrink-0 w-full h-4 bg-white bg-opacity-10" />
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                50,000
              </div>
              <div className="self-stretch my-auto text-xs font-bold leading-loose text-white">
                Followers
              </div>
            </div>
            <div className="px-4 py-1 my-auto text-xs font-bold leading-none text-white uppercase whitespace-nowrap border-l border-white border-opacity-10">
              Follow
            </div>
          </div>
          <div className="self-start mt-14 text-2xl font-medium leading-none text-neutral-400 max-md:mt-10">
            Recent comments
          </div>

          <div className="mt-7 pb-4 w-full text-sm font-medium border-b border-white border-opacity-20">
            <p className="text-white">
              {" "}
              <span className="text-gray-400">Sarah Sareno on</span>{" "}
              Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a
              single day
            </p>
          </div>

          <div className="mt-5 pb-4 w-full text-sm font-medium border-b border-white border-opacity-20">
            <p className="text-white">
              {" "}
              <span className="text-gray-400">Sarah Sareno on</span>{" "}
              Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a
              single day
            </p>
          </div>

          <div className="mt-5 pb-4 w-full text-sm font-medium border-b border-white border-opacity-20">
            <p className="text-white">
              {" "}
              <span className="text-gray-400">Sarah Sareno on</span>{" "}
              Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a
              single day
            </p>
          </div>

          <div className="mt-5 pb-4 w-full text-sm font-medium border-b border-white border-opacity-20">
            <p className="text-white">
              {" "}
              <span className="text-gray-400">Sarah Sareno on</span>{" "}
              Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a
              single day
            </p>
          </div>
          <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
            <h1 className="text-white text-xl">Advertisement</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
