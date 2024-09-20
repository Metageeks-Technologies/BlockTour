"use client";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {getPostById} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {RootState} from "@/app/redux/store";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import Navbar from "@/components/Navbar";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
type CardData = {
  id: number;
  imgSrc: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

// latest card data

const Data: CardData[] = [
  {
    id: 1,
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/005f/4736/6495135ba9397ac4a60079d072ea26c5?Expires=1725840000000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GUKMONuuHSE7ZI3pH~pSbVNwfeoRLSf2s-FVRIlxF8tqHnpA-DAIWDNCyTptSwdjsiqEkyt-~mECz7ybBDxRhqhY2MRFy4awwSufxSPb1LK94KuFC4ZR2uzUIlsVX0YYaEHRfruFVzJectt0lQf3ejgdU3pqJhUr3wnlXcvu5CxkBmD1x9gFrITNb1Y~FgTNMQIJGJ9fjB134snW6u34LMf8IHG5E6i-B6RzdfYzY4Rp1gz3mzcKrOkLpp2EHNoDZZ9pA9fCCuNDiRdQrfJyw3hzW5lLL9xilhSfBg7DgTUPo5hwVNHA47tL-wgzywli0hkyKEa7xUvD3rxL5B-tuw__",
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
];


const CardDetails = () => {
  const {id} = useParams<{id: string;}>();
  const dispatch = useAppDispatch();
  const card = useAppSelector( ( state: any ) => state.post.currentPost );
  const author = useAppSelector( ( state: any ) => state.contributor?.author || state.superAdmin?.author );

  useEffect( () => {
    if ( id ) {
      // dispatch( getPostById( id ) );
      getPostById( dispatch, id );
    }
  }, [dispatch, id] );

  useEffect( () => {
    if ( card ) {
      if ( card.creatorId ) {
        // dispatch( getAuthor( card.creatorId ) );
        getAuthor( dispatch, card.creatorId );
      } else if ( card.authorId ) {
        // dispatch( getAdminAuthor( card.authorId ) );
        getAdminAuthor( dispatch, card.authorId );
      }
    }
  }, [dispatch, card] );

  console.log( author, card );


  return (
    <div className="flex overflow-hidden flex-col items-center lg:px-20 md:px-4 pb-6 bg-black max-md:px-5">
      <div className="flex flex-col items-start max-w-full w-[1217px]">
        <Navbar />
        <div className="flex shrink-0 mt-2.5 max-w-full h-px border-t border-white border-opacity-10 w-[1192px]" />
        <h1 className="mt-12 lg:text-4xl md:text-2xl text-2xl font-medium text-white  max-md:mt-10 max-md:max-w-full">
          {card?.title}
        </h1>
        <div className="flex gap-2.5 mt-3 text-sm font-bold leading-none">
          <img
            loading="lazy"
            srcSet={author?.profileImage}
            className="object-contain shrink-0 rounded-full aspect-square w-[60px]"
          />
          <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
            <div className="flex gap-2.5 self-start">
              <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
                Press Release
              </div>
              <p className="my-auto basis-auto text-white text-opacity-50">
                {/* {card?.date} */}
              </p>
            </div>
            <div className="mt-2.5 text-white text-opacity-50">
              {card?.authorName} | {formatDateTime( card?.createdAt )}
            </div>
          </div>
        </div>
        <div className="mt-8 max-w-full w-[1192px]">
          <div className="flex lg:gap-5 md:gap-1 max-md:flex-col">
            <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex overflow-hidden relative flex-col flex-wrap gap-1.5 items-start pt-96 pr-20 w-full min-h-[450px] max-md:pt-24 max-md:pr-5 max-md:max-w-full">
                  {card?.postType?.toLowerCase() === "video post" ?
                    <video
                      src={card?.previewImageUrl}
                      controls
                      className="object-cover absolute inset-0 size-full"
                    /> :
                    <img
                      loading="lazy"
                      src={card?.previewImageUrl}
                      alt={card?.title}
                      className="object-cover absolute inset-0 size-full"
                    />
                  }
                  {/* <div className="lg:block md:hidden hidden ">
                    <div className="absolute bottom-0 left-0 flex gap-1 ">
                      <div className="h-10  bg-black gap-3 border cursor-pointer border-[#444444] rounded flex items-center px-2">
                        <img src="/asset/Share.svg" alt="" className="h-5 w-5" />
                        <p className="text-[#ADADAD] text-sm">Share</p>
                      </div>

                      <div className="h-10  bg-black border cursor-pointer border-[#FFA301B2] rounded flex items-center">
                        <img src="/asset/Overlay.svg" alt="" />
                        <p className="text-sm text-[#516EAB] px-2">Facebook</p>
                      </div>

                      <div className="h-10  bg-black border cursor-pointer border-[#FFA301B2] rounded flex items-center">
                        <img src="/asset/Overlay1.svg" alt="" />
                        <p className="text-sm text-[#29C5F6] px-2">Twiter</p>
                      </div>

                      <div className="h-10  bg-black border cursor-pointer border-[#FFA301B2] rounded flex items-center">
                        <img src="/asset/Overlay2.svg" alt="" />
                        <p className="text-sm text-[#CA212A] px-2">Pinterest</p>
                      </div>

                      <div className="h-10  bg-black border cursor-pointer border-[#FFA301B2] rounded flex items-center">
                        <img src="/asset/Overlay3.svg" alt="" />
                        <p className="text-sm text-[#7BBF6A] px-2">WhatsApp</p>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="mt-5 text-base leading-7 text-zinc-400 max-md:mr-2 max-md:max-w-full">
                  <h1 className=" text-2xl font-medium text-white ">
                    {card?.title}
                  </h1>
                  {/* <div
                    className="text-neutral-400 mt-5"
                    dangerouslySetInnerHTML={{__html: card?.description || ""}}
                  /> */}

                  <div className="mt-5">
                    <HtmlContent htmlContent={card?.description || ""} />
                  </div>

                  {/* <h1 className=" mt-8 text-2xl font-medium text-white">
                    Key Investors Leading the Round
                  </h1>
                  <p className="mt-3">
                    SCB Limited, a proprietary trading firm based in the
                    Bahamas, and Laser Digital, the digital asset arm of Nomura
                    Global, took the lead in the round with a combined
                    investment of $3.5 million. Additionally, several other
                    investors, including Bankless Ventures, Hypersphere, Draper
                    Dragon, DACM, and others, participated in the funding.
                    <br /> With total value locked (TVL) exceeding $850 million
                    and over 40,000 active restakers on the platform, the newly
                    acquired funds will be instrumental in improving the
                    platform’s capabilities, expanding to other ecosystems such
                    as Solana and Bitcoin, and driving further innovation in
                    restaking solutions.
                  </p>
                  <h1 className=" mt-5 text-2xl font-medium text-white">
                    Global Support and Confidence
                  </h1>
                  <p className="mt-3 text-zinc-400">
                    The fundraising round garnered support from global
                    investors, backed by several notable angel investors in the
                    crypto community. Individuals like Scott, Cofounder of
                    Gitcoin; Alex, CEO of Nansen; and Anthony, Cofounder of
                    Swissborg, contributed to the success of the round,
                    showcasing their confidence in Kelp DAO’s vision.
                  </p> */}
                </div>

                <div className="text-zinc-400 mt-6">
                  <h1 className="text-2xl font-medium text-white">
                    Quotes from Key Figures
                  </h1>

                  <div className="flex mt-5 gap-6 items-start">
                    <img src="/asset/Image1.svg" alt="" className="mt-2" />
                    <p>
                      Dheeraj Borra, Co-founder of Kelp DAO, expressed his
                      excitement about the fundraising results, emphasizing the
                      platform’s customer-centric solutions and its future
                      expansion. The Co-founders, Amitej Gajjala and Dheeraj
                      Borra, conveyed their gratitude to investors for
                      supporting Kelp DAO in scaling new heights in restaking
                      solutions.
                    </p>
                  </div>
                  <div className="flex mt-5 gap-6 items-start">
                    <img src="/asset/Image.svg" alt="" className="mt-2" />
                    <p>
                      Jez Mohideen, CEO of Laser Digital, voiced his eagerness
                      to support Kelp DAO and its team in creating innovative
                      restaking infrastructure solutions, highlighting the
                      potential of the project.
                    </p>
                  </div>
                  <div className="flex mt-5 gap-6 items-start">
                    <img src="/asset/Image.svg" alt="" className="mt-2" />
                    <p>
                      Jack Platts, Co-founder of Hypersphere Ventures, commended
                      Kelp DAO’s team and focus on user experience, anticipating
                      the platform’s contribution to enhancing yields and
                      optionality for ETH stakers through restaking.
                    </p>
                  </div>
                </div>

                <div className="text-[#ADADAD] mt-4 ">
                  <h1 className="text-white text-2xl">
                    About Kelp DAO, Laser Digital, and SCB Limited
                  </h1>
                  <p className="mt-4">
                    Kelp DAO, a leading liquid restaking protocol with over $850
                    million in assets under management, continues to drive
                    innovation in the restaking landscape. Laser Digital,
                    supported by Nomura, focuses on delivering scalable
                    opportunities in trading, asset management, and ventures.
                    SCB Limited, a Bahamian-based proprietary trading firm,
                    actively participates in the digital asset ecosystem.
                  </p>
                </div>

                <div className="mt-8 flex  gap-4">
                  <img
                    src={author?.profileImage}
                    alt={author?.name}
                    className="w-24 lg:h-24 md:h-24 h-36 object-cover shrink-0 rounded-full aspect-square" 
                  />
                  <div>
                    <h1 className="text-sm text-white">{author?.name}</h1>
                    <p className="text-[#ADADAD] text-xs">
                      {author?.bio}
                    </p>
                    <div className="flex gap-3 text-white mt-1">
                      <img src="/asset/Link.svg" alt="" className="h-4 w-4" />
                      <img src="/asset/Icon.svg" alt="" className="h-4 w-4" />
                      <img src="/asset/Icon1.svg" alt="" className="h-4 w-4" />
                      <img src="/asset/Icon2.svg" alt="" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* left */}
            <div className="flex flex-col ml-5 lg:w-[31%] md:w-[35%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-10">
                <div className="flex gap-5 justify-between  text-sm font-medium leading-3 whitespace-nowrap rounded  text-neutral-400">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2.5 bg-black px-2 border border-solid border-neutral-700 rounded"
                  />
                </div>

                <div className="flex gap-4 self-start mt-11 text-2xl font-medium leading-none text-neutral-400 max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/00672332f0a70e8f2e5eee0362b321a21348722ea774f435f2673dd5e456c931?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 aspect-square w-[34px]"
                  />
                  <div className="my-auto basis-auto">Latest News</div>
                </div>

                <div className="flex gap-5 justify-between mt-6 ">
                  <div className="flex flex-col my-auto">
                    <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300">
                      Sony And Startale Team Up For L2 Rollup: Soneium
                    </div>
                    <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                      November 29, 2019
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9459e7d506efdb3140dd6248f8ba8561a53184789984314a10faccb3fd6230d1?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="h-20 w-16 object-cover"
                  />
                </div>

                <div className="flex gap-5 justify-between mt-7">
                  <div className="flex flex-col my-auto">
                    <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300 max-md:pr-5">
                      Telegram Founder Faces French Arrest; Crypto Leaders React
                    </div>
                    <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                      November 29, 2019
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://s3-alpha-sig.figma.com/img/86d1/f753/dd0598df14bfba95cc49375f892a91a3?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MGkwxEi~qO~mZnyzDEy66psRNg-OlxexiftK9uWaPT6GLtztvZh3gCMPejd59271IuqpLRbvHAEg1Xhqry4s4cdwdBT7Y4nhrGUDdutn3Titx4oEAAbOQ3UVJ6VUxxXfNQwx25IEwmvaLFCqf4xL-J8l0f2G61HYOsTixCkOAcdrEYYj8B4UpPIYfq7HavKRkV5ngHydEH~eAXKyDebWu4Q5yj-7ixw4xvOH7vpAHdm7DJ6qtMyEmldB3ViNNoxiaSjo5Y6qZEU3DRQ6UiuOk8PmFmRWHuop-a3PrNWeHeitWUP-Ul2NErhXWr0IbDIhanLrlrFNS0~MhalL7rVwcg__"
                    className="h-20 w-16 object-cover"
                  />
                </div>

                <div className="flex gap-5 justify-between mt-7">
                  <div className="flex flex-col my-auto">
                    <div className="py-1 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300 max-md:pr-5">
                      Telegram Founder Faces French Arrest; Crypto Leaders React
                    </div>
                    <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                      November 29, 2019
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/574f32d9a6208c3bb3b561da6586b3b60675071208b7df652f0aeb960293a553?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="h-20 w-16 object-cover"
                  />
                </div>

                <div className="flex gap-5 justify-between mt-6">
                  <div className="flex flex-col my-auto">
                    <div className="py-1.5 text-sm font-medium leading-5 bg-white bg-opacity-0 text-zinc-300">
                      Noel Gallagher says Liam’s tweets are
                      <br />
                      the reason Oasis won’t reunite
                    </div>
                    <div className="self-start mt-3 text-xs font-bold leading-none text-neutral-500">
                      November 29, 2019
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/de70fbd4f652fe66f20a36964dc04cd99bae120a46170407259dc5469ae96ff3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="h-20 w-16 object-cover"
                  />
                </div>

                <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
                  <h1 className="text-white text-xl">Advertisement</h1>
                </div>

                <div className="flex gap-5 justify-between self-end mt-16 max-w-full w-[272px] max-md:mt-10">
                  <div className="self-end mt-6 text-xs font-semibold leading-loose text-neutral-400">
                    3687<span className="font-bold"> Followers</span>
                  </div>
                  <button className="px-4 py-1 text-neutral-400 border border-neutral-700">
                    Follow
                  </button>
                </div>

                <div className="flex mt-8 ">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc234f2c47ecd7e18bf5228f7212155b98ede16a7160cf72846e003374c8e8dd?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eecf81631eb4d8fda9b745204ccd53a2e7224dd7a0aeae481bc5e724c5860e3?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-square w-[114px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/421478f9ce9bae6ac7ee788ed9e9a3dd369542593aabafbae4590c7f9364dcba?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]"
                  />
                </div>

                <div className="flex ">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2184a7f10aa26f2ed3ea6cfc4f098f736051d9983a7d28230d77cb9fc2f56a59?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9fe7cba642da802033d61be4ac132d471652dd9b5a42901acab73283952516c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/00bc708736c96daf25d7e21d81fe1906dbaa080ae25f5916f3e76ada3e1f9a71?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                  />
                </div>

                <div className="flex">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d9aa79b9f774b0bbbbb129e711af8ac189215c24e6c6379be5661eb075855e69?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/757702c97778c1de08173be210ca813717222d4b9e9f56e6d208825c56eb8aff?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]"
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1501003b8c1f186ed25673b6bb8978823d74d7cdf042117eec3722579cc458a7?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                    className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
                  />
                </div>

                <h1 className="self-start mt-14 text-base font-medium leading-loose text-zinc-300 max-md:mt-10 max-md:ml-1.5">
                  @username
                </h1>
              </div>
            </div>
            {/* left */}
          </div>
        </div>

        {/* border section */}
        <div className="flex shrink-0 mt-8 max-w-full h-px border-t border-white border-opacity-10 w-[1192px]" />

        <div className="flex flex-wrap gap-5 justify-between mt-16 max-w-full font-medium w-[1192px] max-md:mt-10">
          <div className="flex flex-col items-start">
            <p className="text-xs leading-none text-neutral-400">
              Previous article
            </p>
            <div className="self-stretch mt-3.5 text-sm text-white">
              26 last-minute holiday gifts that are still thoughtful and unique
            </div>
            <div className="flex gap-5 mt-12 text-2xl leading-none text-neutral-400 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb9cf020b2969f82bd4b5a2659680163bdf927096fca254f7827b76e667f139d?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                className="object-contain shrink-0 aspect-square w-[39px]"
              />
              <div className="my-auto basis-auto">Related articles</div>
            </div>
          </div>
          <div className="flex flex-col self-start lg:text-right md:text-left text-left max-md:max-w-full">
            <p className="lg:self-end md:self-end self-start text-xs leading-none text-neutral-400">
              Next article
            </p>
            <div className="mt-3 text-sm text-white max-md:max-w-full">
              Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a single
              day
            </div>
          </div>
        </div>

        <div className="mt-5 max-w-full w-[1192px]">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
            {Data.map( ( card ) => (
              <div key={card.id} className=" flex flex-col gap-5  ">
                <img loading="lazy" src={card.imgSrc} className="w-full h-40 object-cover" alt={card.title} />
                <h1 className="text-xl text-white font-semibold"> {card.title} </h1>
                <div className="mt-1 flex gap-3 items-center">
                  <button className="bg-[#DF841C] py-0.5 px-3"> {card.category} </button>
                  <p className="text-sm text-neutral-400">{card.date}</p>
                </div>
              </div>
            ) )}
          </div>
        </div>

        <div className="flex shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" />

        <div className="mt-20 max-w-full w-[1192px] max-md:mt-10 ">

          {card && <DiscussionEmbedComponent article={card} />}
        </div>


        {/* <div className="flex items-center gap-2 mt-6 text-xs font-medium  text-neutral-500">
          <input
            type="checkbox"
            id="checkbox"
            className="w-4 h-4  bg-gray-100 border-gray-300 rounded cursor-pointer "
          />
          <p className="flex-auto">
            Save my name, email, and website in this browser for the next time I
            comment.
          </p>
        </div> */}
        {/* 
        <button className="px-4 py-4 cursor-pointer mt-6 text-sm font-medium leading-3 hover:bg-neutral-900 text-center text-white rounded bg-neutral-800">
          Post Comment
        </button> */}
        <div className="flex  shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" />
        <Footer />
      </div>
    </div>
  );
};

export default CardDetails;
