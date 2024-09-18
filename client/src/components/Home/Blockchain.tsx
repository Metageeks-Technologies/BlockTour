"use client"
import {useAppSelector} from '@/app/redux/hooks';
import { useRouter } from 'next/navigation';
import React from 'react'
type CardData = {
    id: number;
    imgSrc: string;
    title: string;
    category: string;
    date: string;
    description: string;
  };
  
  const cardData: CardData[] = [
    {
      id: 1,
      imgSrc:
        "https://s3-alpha-sig.figma.com/img/005f/4736/6495135ba9397ac4a60079d072ea26c5?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GUKMONuuHSE7ZI3pH~pSbVNwfeoRLSf2s-FVRIlxF8tqHnpA-DAIWDNCyTptSwdjsiqEkyt-~mECz7ybBDxRhqhY2MRFy4awwSufxSPb1LK94KuFC4ZR2uzUIlsVX0YYaEHRfruFVzJectt0lQf3ejgdU3pqJhUr3wnlXcvu5CxkBmD1x9gFrITNb1Y~FgTNMQIJGJ9fjB134snW6u34LMf8IHG5E6i-B6RzdfYzY4Rp1gz3mzcKrOkLpp2EHNoDZZ9pA9fCCuNDiRdQrfJyw3hzW5lLL9xilhSfBg7DgTUPo5hwVNHA47tL-wgzywli0hkyKEa7xUvD3rxL5B-tuw__",
      title:
        "Is Crypto on the Brink of a Bull Market or Bear Market? Utilizing Consensus 2024 as a Gauge",
      category: "Crypto",
      date: "May 29, 2024",
      description:
        "Consensus 2024: Market Sentiment in Question Bitcoin ETFs Lead to Market Speculation At Consensus 2024, the prevailing question on everyone's…",
    },
    {
      id: 2,
      imgSrc:
        "https://s3-alpha-sig.figma.com/img/c57b/e6aa/5741ee0e5a86f1971e61e2b66d13c10e?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aKyxpeeapwncPJFj9oeay16LiCx8GOjSqWQO1LCXTR-X4zvdgpJX8OjGeFuDCV6R9Irw7UproeYHuCFZ9SSSG0OoVGImKp8wG6~mf8kcPRmnnxD4VFxwIBe052Boo8dxv685l5ODZG6P20kZDY9sfPiKOUKF8BGd656quzUb-lIznHri4CpOVFH--63k3kpE5QFaL5Gai2YZKDI~O1Ug2f9RSI7c04Fny1V80XsJs5YrjNbMmz1png-EONiwJAwv489EFmRx64pZtByGFgjkLS~pNpaCuePqQtZPz4Cv7Sx27SPdZVgYmCgsjKVHV6YRF0zvtg0cZrUcQ-Glr5EpFw__",
      title: "College Campus Protests Exploited by Russian Influence Campaign",
      category: "NFT",
      date: "May 17, 2024",
      description:
          "Covert Doppelganger Campaign Echoes Russian Narratives The covert Doppelganger campaign, believed to be originating from Russia, has been spreading disinformation around the ongoing campus protests in the United States...",
      },
    {
      id: 3,
      imgSrc:
        "https://s3-alpha-sig.figma.com/img/0496/07ff/6e0f7abc0558dc5948fdb1910f880f9e?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UTaGqrTDAApO6PaCq5DP9uiCHalkOUXzX~AnSEl18KavaKOXelA5ZHn5dTn9THJw0d-WqqblPuBJFbXWRrxh-jPMCQx1G7NCy54S1nI0E4~XeBluWaCuE5B1x3UWo6Y5oYJVuixv2sBE3vMCVDhqlpIXYjG7DWuf6KDHTu0TO70f9mmtzjqxIJLWKQzasA4DpF231wBTKRwJQwsdOHtfnJ3kahSRgcuOQpru7OymGC6uS6tEiSfHSa0taRoWHEamjdAt8jCfRhLQX6GYWW86l450oJp7NwZ68dou1JRH6uVQeo47iB6AAMDxthgjr71NY35QbY70NsPXRc5W7bZweg__",
      title: "Coinbase Veterans Raise $21M For NPC Labs Gaming Startup ",
      category: "Blockchain",
      date: "july 29, 2024",
      description:
        "Covert Doppelganger Campaign Echoes Russian Narratives The covert Doppelganger campaign, believed to be originating from Russia, has been spreading disinformation around the ongoing campus protests in the United States...",
    },
    {
      id: 4,
      imgSrc:
        "https://s3-alpha-sig.figma.com/img/2505/edd4/ccae0c6963d23eebf918276146b8c765?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bxZ3uN~Vnpb-Gpavg1Zq9YAlWeCAEL4Oc8fADS4D3B--1x31lIgUXVuXbFW~fctA1F6mpybS6JPSukoTewe6GRPPECWsPrpsGA9broNQMsnwa-49AsjBnQeHfFJtyBz~nwDvKcOOwgrzjn5vlCcIs~JzQsNZRJ3r3oO48LTEPs99en1IfOH~s59boqF1GTTJxkmQWuZoMGoxBYSjcgqFtyAISDMyz6RhgWhpprVbEtgPWwDjWowuvX5iJuAVsLb929ax8-XZ3zIA~xJ9LV~MH7kMZDRQNgj80V3tpUMcAbH~YsyPC6nVdmZD6ggR~VjzBlZiv995OEKH~pBxFZh36w__",
      title:
        "The changing role of Ethereum faucets within an expanding blockchain environment",
      category: "Crypto",
      date: "May 29, 2024",
      description:
        "Ethereum faucets have been an integral part of the Ethereum network since its inception, providing beginners with a small amount of Ether for free...",
    },
    // Add 4 more cards similarly
  ];

const Blockchain = () => {
  const router = useRouter();
  const posts = useAppSelector( ( state: any ) => state.post.posts )
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" ).reverse().slice( 0, 4 );

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
        <div className="flex gap-2.5 self-start mt-2.5 text-base leading-7">
          <div>See all</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbba5c0b4581ad1e88995cbfe3f8a4b8fbf67aad29f2d2d15241baac2b6b255?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
            className="object-contain shrink-0 my-auto w-4 aspect-[1.14]"
          />
        </div>
      </div>
      {publishedPosts?.map((item:any) => (
        <div key={item._id} className="flex lg:flex-row md:flex-col flex-col gap-8 w-full cursor-pointer" onClick={() => {
          router.push(`/detail-page/${item._id}`);
        }}>
          <img
            loading="lazy"
            src={item.previewImageUrl}
            className="h-56 lg:w-80  md:w-full object-cover"
            alt={item.title}
          />
          <div>
            <h1 className="text-2xl text-white font-semibold">
              {item.title}
            </h1>
            <div className="mt-1 flex gap-3 items-center">
              <button className="bg-[#DF841C] py-0.5 px-3">
                {item?.category.join(", ")}
              </button>
              <p className="text-sm text-neutral-400">{item.date}</p>
            </div>
            <div className="text-neutral-400 mt-5 line-clamp-6" dangerouslySetInnerHTML={{__html: item?.description}} />
          </div>
          
        </div>
      ))}
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
  )
}

export default Blockchain
