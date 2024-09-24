"use client";
import {getAdminAuthor} from "@/app/redux/feature/admin/api";
import {getAuthor} from "@/app/redux/feature/contributor/api";
import {getPostById} from "@/app/redux/feature/posts/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import DiscussionEmbedComponent from "@/components/DiscussionEmbed";
import Footer from "@/components/Footer";
import HtmlContent from "@/components/HtmlContent";
import {formatDateTime} from "@/utils/DateFormat";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
import {IoBookmarkOutline, IoSearchOutline} from "react-icons/io5";
import {GoSearch} from "react-icons/go";
import {CiLinkedin} from "react-icons/ci";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {IoLogoYoutube} from "react-icons/io";
import Navbar from "@/components/Navbar";
import { FaXTwitter } from "react-icons/fa6";
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
      "https://th.bing.com/th/id/OIP.z3sB2e7za5LbZUVMsQKlwwHaEK?rs=1&pid=ImgDetMain",
    title: "The Bankless Guide to Sonic",
    category: "Articles",
    date: "May 29, 2024",
    description: "Sonic Explained: A Beginner's Guide to Sonic (prev. Fantom)",
  },
  {
    id: 2,
    imgSrc:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/fwmsu8gp4vnh504yfbnl.jpg",
    title: "Judge Tosses Consensys Suit Against SEC",
    category: "News",
    date: "May 17, 2024",
    description:
      "Consensys was seeking regulatory clarity around its MetaMask wallet offerings and ETH's security status.",
  },
  {
    id: 3,
    imgSrc:
      "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
    title: "'Vitalik: An Ethereum Story' Documentary Debuts Onchain ",
    category: "News",
    date: "july 29, 2024",
    description:
      "The new documentary provides an intimate portrait of the Ethereum founder.",
  },
];

const CardDetails = () => {
  const {id} = useParams<{id: string;}>();
  const dispatch = useAppDispatch();
  const card = useAppSelector( ( state: any ) => state.post.currentPost );
  const author = useAppSelector(
    ( state: any ) => state.contributor?.author || state.superAdmin?.author
  );

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
    <div>
      {/* <Navbar/> */}
      <div className=" lg:ml-52 flex overflow-hidden flex-col items-center pb-6 bg-black  md:px-12 ">
        <div className="flex ">
          <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full md:pr-8">
            <div className="flex flex-col w-[85%] m-auto">
              <h1 className="mt-8 lg:text-4xl md:text-2xl text-2xl font-medium text-neutral-300 max-md:mt-10 max-md:max-w-full">
                {card?.title}
              </h1>

              <div className=" flex justify-between items-center py-8">
                <div className="flex gap-2.5 items-center text-sm font-bold leading-none ">
                  <img
                    loading="lazy"
                    srcSet={author?.profileImage}
                    // src="https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg"
                    className=" rounded-full object-cover h-12 w-12 "
                  />
                  <div className="flex flex-col gap-y-2 grow shrink-0 my-auto basis-0 w-fit">
                    <div className="flex gap-2.5 self-start">
                      <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
                        Press Release
                      </div>
              
                    </div>

                    <div className=" text-white text-opacity-50">
                      {card?.authorName} | {formatDateTime( card?.createdAt )}
                    </div>
                  </div>
                </div>

                <div className="h-7 w-7 bg-[#1C1C1D] hover:bg-[#232324] flex justify-center items-center  rounded-full">
                  <IoBookmarkOutline className="h-4 w-4 cursor-pointer text-neutral-400" />
                </div>
              </div>

              <div className="flex overflow-hidden relative flex-col flex-wrap gap-1.5 items-start pt-96 pr-20 w-full min-h-[450px] max-md:pt-24 max-md:pr-5 max-md:max-w-full rounded-lg">
                {card?.postType?.toLowerCase() === "video post" ? (
                  <video
                    src={card?.previewImageUrl}
                    controls
                    className="object-cover absolute inset-0 size-full"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={card?.previewImageUrl}
                    alt={card?.title}
                    className="object-cover absolute inset-0 size-full"
                  />
                )}
              </div>

              <div className="mt-5 text-base leading-7 text-zinc-400 max-md:mr-2 max-md:max-w-full">
                <h1 className=" text-2xl font-medium text-white ">
                  {card?.title}
                </h1>

                <div className="mt-5 ">
                  <HtmlContent htmlContent={card?.description || ""} />
                </div>
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
                    Borra, conveyed their gratitude to investors for supporting
                    Kelp DAO in scaling new heights in restaking solutions.
                  </p>
                </div>
                <div className="flex mt-5 gap-6 items-start">
                  <img src="/asset/Image.svg" alt="" className="mt-2" />
                  <p>
                    Jez Mohideen, CEO of Laser Digital, voiced his eagerness to
                    support Kelp DAO and its team in creating innovative
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
                  opportunities in trading, asset management, and ventures. SCB
                  Limited, a Bahamian-based proprietary trading firm, actively
                  participates in the digital asset ecosystem.
                </p>
              </div> 

            </div>
          </div>

          {/* left */}
          <div className="flex flex-col ml-5 lg:w-[30%] md:w-[35%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-10 py-4">
            <div className="relative border border-[#28272D] rounded flex justify-between">
          <input
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={( e ) => setSearchQuery( e.target.value )}
            className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
          />
          <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </div>

              <div className="  flex items-center justify-between py-6">
                <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg">
                  Join for free
                </button>
                <p className="text-lg hover:underline">Sighn In</p>
              </div>

              <div className="mt-5">
                <p className="text-[#999999] mb-2">In this article</p>
                <div className="flex gap-3">
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">What to Expect</button>
                  <button className="py-1.5 px-4 border border-[#17161B] bg-[#0A090F] rounded text-[#999999]">Polkadot</button>
                </div>
              </div>

              <div className="h-60 w-full border border-[#17161B] mt-6 bg-[#0A090F] rounded flex justify-center">
                   <h1 className="uppercase text-lg font-semibold text-[#CCCCCC] p-4">Friend & Sponsor</h1>
              </div>

              {/* <div className="flex gap-5 justify-between mt-6 ">
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
              </div> */}

              <div className=" h-[32rem] sticky top-0 rounded-lg mt-8  flex justify-center items-center bg-[#0A090F]">
                <div className="flex flex-col gap-8 px-12 ">
                  <div className=" flex items-center justify-center">
                    <img
                      src="/asset/Block-logo.svg"
                      alt=""
                      className="w-38 h-14 object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-semibold  text-center">
                    Level up on crypto, daily
                  </h1>

                  <div className="flex flex-col gap-4">
                    <p className="text-[#ADADAD] text-center">
                      oin the world’s most popular crypto community with daily
                      alpha, news, & analysis, all free.
                    </p>
                    <input
                      type="text"
                      placeholder="Email address"
                      className="py-4 px-5 rounded-3xl bg-black border border-neutral-700"
                    />
                    <button className="py-4 px-12 bg-red-600 hover:bg-red-500 rounded-3xl">
                      Join for free
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="flex gap-5 justify-between mt-7">
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
              </div> */}

              {/* <div className="flex gap-5 justify-between mt-7">
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
              </div> */}

              {/* <div className="flex gap-5 justify-between mt-6">
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
              </div> */}

              {/* <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
                <h1 className="text-white text-xl">Advertisement</h1>
              </div> */}

              {/* <div className="flex gap-5 justify-between self-end mt-16 max-w-full w-[272px] max-md:mt-10">
                <div className="self-end mt-6 text-xs font-semibold leading-loose text-neutral-400">
                  3687<span className="font-bold"> Followers</span>
                </div>
                <button className="px-4 py-1 text-neutral-400 border border-neutral-700">
                  Follow
                </button>
              </div> */}

              {/* <div className="flex mt-8 ">
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
              </div> */}

              {/* <div className="flex ">
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
              </div> */}

              {/* <div className="flex">
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
              </h1> */}
            </div>
          </div>
          {/* left */}
        </div>

        {/* border section */}
        {/* <div className="flex shrink-0 mt-8 max-w-full h-px border-t border-white border-opacity-10 w-[1192px]" /> */}

        {/* <div className="flex flex-wrap gap-5 justify-between mt-16 max-w-full font-medium w-[1192px] max-md:mt-10">
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
        </div> */}

        {/* <div className="flex shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" /> */}

        {/* Comment section */}
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
      </div>

      <div className="mt-5 lg:ml-52 bg-[#0A090F] rounded-lg">
        {/* <div className="py-10 border-b border-neutral-800">
          <div className="flex flex-col gap-5">
            <img
              src={author?.profileImage}
              
              alt=""
              className="h-14 w-14 rounded-full object-cover"
            />

            <h1>Written by {author?.name || "Unknown"}</h1>

            <div className="flex gap-5 items-center">
              <div className="flex gap-2">
                <p>{author?.posts?.length} Articles</p>
                
              </div>

              <div className="flex gap-1">
                <div className="w-10 cursor-pointer h-10 bg-[#4e4e50] rounded-full flex justify-center items-center">
                  <FaLinkedin className="w-5 h-5" />
                </div>

                <div className="w-10 h-10 cursor-pointer bg-[#4e4e50] rounded-full flex justify-center items-center">
                  <FaTwitter className="w-5 h-5" />
                </div>
              </div>
            </div>

            <p className="w-[60%] text-[#ADADAD]">
              {author?.bio} {" "}
              
            </p>
          </div>
        </div> */}

        {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-4 py-10 ">
          {Data.map( ( card ) => (
            <div
              key={card.id}
              className=" flex flex-col gap-3 rounded-lg pb-8 bg-[#1C1C1D]  "
            >
              <img
                loading="lazy"
                src={card.imgSrc}
                className="w-full h-48 object-cover rounded-t-lg"
                alt={card.title}
              />

              <div className="px-10 flex flex-col gap-2 ">
                <p className="text-center text-sm text-[#ADADAD] mt-2">
                  {card.category}
                </p>

                <h1 className="text-xl hover:text-red-500 text-center text-[#ADADAD] h-14 pt-2font-semibold">
                  {card.title}
                </h1>

                <p className="text-sm text-center text-neutral-500 line-clamp-2 ">
                  {card.description}
                </p>

                <div className="flex gap-2 mt-2 justify-center">
                  <p className="text-sm text-[#ADADAD] "> 1 day ago.</p>
                  <span className="flex gap-2 items-center">
                    <FiHeart className="text-neutral-400 h-5 w-5" />3
                  </span>
                </div>
              </div>
            </div>
          ) )}
        </div> */}

<div className="bg-[#0A090F] w-full border-b border-[#1F1D24]">
      <div className="w-[90%] m-auto  flex justify-between py-10 text-[#FFFCFC99]">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold ">Get connected</h1>

            <div className="flex gap-3">
              <div className="w-10 cursor-pointer h-10 border border-[#666666] rounded-full flex justify-center items-center">
                <FaLinkedin className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaXTwitter className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaFacebookSquare className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <IoLogoYoutube className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="">
          <h1 className="text-3xl pb-2 font-semibold text-[#FFFFFF]">Receive your daily crypto update</h1>
              <div className="flex items-center gap-4">
                
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-[#1F1C2C] border border-[#474457] text-white py-3.5 px-5 rounded-lg  w-full sm:w-96 focus:outline-none"
                />
              
                <button className="bg-orange-500 text-white px-10 py-3.5 rounded-lg hover:bg-orange-600 transition">
                  Join for Free
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-center mt-4">
                <input type="checkbox" id="agree" className="mr-2" />
                <label htmlFor="agree" className="text-gray-400 text-sm">
                  By joining, I agree to the Blockbar{" "}
                  <a href="#" className="underline text-gray-300">
                    Terms and Privacy
                  </a>{" "}
                  statements.
                </label>
              </div>
            </div>

        </div>
        </div>
      
        <Footer/>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default CardDetails;
