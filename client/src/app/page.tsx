"use client"
import Trending from "@/components/Home/Tranding";
import NFT from "@/components/Home/NFT";
import Blockchain from "@/components/Home/Blockchain";
import Politics from "@/components/Home/Politics";
import Tech from "@/components/Home/Tech";
import Latest from "@/components/Home/Latest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {getAllPosts} from "./redux/feature/posts/api";
import {getAllCategories} from "./redux/feature/category/api";
import BlogMarquee from "@/components/Marquee";

export default function Home () {
  const dispatch = useAppDispatch();
  const posts = useAppSelector( ( state ) => state.post.posts )
  console.log("Posts:-",posts)
  useEffect( () => {
    getAllPosts( dispatch )
    getAllCategories( dispatch )
},[])

  return (
    <div>
      <BlogMarquee/>
    <div className="flex overflow-hidden flex-col bg-black max-md:pb-24">
      <div className="flex overflow-hidden relative flex-col items-center lg:px-20 md:px-4 px-4  w-full min-h-[740px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/01403631944b1bcbc322ff2f03db5ac88eb06ca6eba01bd90af98c3f5332b22a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col items-start max-w-full w-[1220px]">
          <Navbar />
          {/* for mobile responsive pending */}
          <div className="py-2 mt-96 lg:block md:block hidden  max-w-full text-4xl font-medium text-white bg-white bg-opacity-0 leading-[53px] w-[763px] max-md:mt-10 max-md:max-w-full">
            <h1>Kelp DAO Raises $9 Million in Private Sale for Restaking Innovations</h1>
            <div className="flex gap-2.5 mt-6 text-sm font-bold leading-none">
              <div className="px-1.5 py-1 bg-amber-600 text-stone-950"> Press Release </div>
              <div className="my-auto text-white text-opacity-50"> May 22, 2024 </div>
            </div>
            <div className="mt-7 text-base font-medium leading-6 text-white text-opacity-50 max-md:max-w-full"> In a recent press release from Dubai, UAE, on May 22nd, 2024, Kelp
              DAO, a prominent liquid restaking platform, revealed the successful closure of a $9 million private sale round. </div>
          </div>
          {/* <div className="flex gap-2.5 mt-6 text-sm font-bold leading-none">
            <div className="px-1.5 py-1 bg-amber-600 text-stone-950">
              Press Release
            </div>
            <div className="my-auto text-white text-opacity-50">
              May 22, 2024
            </div>
          </div> */}
          {/* <div className="mt-7 text-base font-medium leading-6 text-white text-opacity-50 max-md:max-w-full">
            In a recent press release from Dubai, UAE, on May 22nd, 2024, Kelp
            DAO, a prominent liquid restaking platform, revealed the successful
            closure of a $9 million private sale round. 
          </div> */}
          <div className="flex shrink-0 self-stretch mt-20 w-full h-px border border-solid border-white border-opacity-10 max-md:mt-10" />
        </div>
      </div>


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

        <div className="mt-16 max-w-full w-full ">
          <Blockchain />
        </div>

        {/* this section done */}

        <div className="flex shrink-0 mt-24 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" />
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
