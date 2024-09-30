import React from 'react';
import {useAppSelector} from '@/app/redux/hooks';
import {useRouter} from 'next/navigation';
import {formatDateTime} from '@/utils/DateFormat';

const CryptoPage = () => {
  const posts = useAppSelector( ( state: any ) => state.post.posts );
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" && post.category.includes( "Crypto" ) ).reverse().slice( 0, 3 );
  const musicPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" && post.category.includes( "Music" ) ).reverse().slice( 0, 3 );
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-y-10 lg:basis-[69%] md:basis-[60%]">
        <div className="flex gap-5 justify-between w-full font-medium text-neutral-400">
          <div className="flex items-center gap-3 text-2xl leading-none whitespace-nowrap">
            <img
              src="https://images.vexels.com/media/users/3/144837/isolated/preview/40f189daa5c0279718484ca5f5569f78-crypto-icon.png"
              alt="Crypto icon"
              className="w-10 h-10"
            />
            <h1>Crypto</h1>
          </div>
          {/* <div className="flex gap-2.5 self-start mt-2.5 text-base leading-7">
            <div>See all</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbba5c0b4581ad1e88995cbfe3f8a4b8fbf67aad29f2d2d15241baac2b6b255?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 my-auto w-4 aspect-[1.14]"
              alt="Arrow icon"
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
            <div key={card.id} className="flex group lg:flex-row md:flex-col flex-col gap-8 w-full cursor-pointer" onClick={() => {
              router.push( `/article/${card.permaLink}` );
            }}>
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
                <h1 className="text-2xl text-white font-semibold line-clamp-2 group-hover:text-[#DF841C]">
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

      <div className="flex  lg:basis-[31%]  md:basis-[40%] ">
        <div className="flex flex-col w-full max-md:mt-10 ">
          <div className="flex gap-4 text-2xl font-medium leading-none whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10f9d5eb73784601a3814c5d2e3dfbd6dc451c79cf025a32601bc5bccf63f0e2?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 aspect-square w-[34px]"
            />
            <div className="my-auto">Music</div>
          </div>

          <div className="flex gap-5 mt-5 max-md:mt-10 ">
            <div className="flex flex-col grow shrink-0 items-start max-w-full text-sm font-medium leading-5 basis-0 text-zinc-300 w-fit">

              {musicPosts.map( ( card: any ) => (
                <div key={card._id} className="flex gap-5 mt-5 justify-between items-center group cursor-pointer" onClick={() => {
                  router.push( `/article/${card.permaLink}` );
                }}>
                  <div>
                    <p className="text-sm text-white group-hover:text-[#DF841C] line-clamp-2">
                      {card.title}
                    </p>
                    <p className="text-neutral-400 mt-3">
                      {formatDateTime( card.createdAt )}
                    </p>
                  </div>
                  <img
                    src={card.previewImageUrl}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ) )}
              <div className="mt-14 text-2xl font-medium leading-none text-neutral-400 max-md:mt-10">
                Archives
              </div>
              <div className="mt-8 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">August 2024</div>
              <div className="mt-6 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">July 2024 </div>
              <div className="mt-6 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">June 2024 </div>
              <div className="mt-7 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">May 2024</div>
              <div className="mt-6 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">April 2024</div>
              <div className="mt-6 text-sm text-zinc-300 hover:text-[#DF841C] cursor-pointer">March 2024</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoPage;
