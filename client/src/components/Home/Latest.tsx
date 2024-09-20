import {useAppSelector} from "@/app/redux/hooks";
import {useRouter} from "next/navigation";
import React from "react";
import {IoArrowForward} from "react-icons/io5";


const Latest = () => {
  const posts = useAppSelector( ( state ) => state.post.posts );
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" ).reverse().slice( 0, 8 );
  const router = useRouter();
  return (
    <>
      <div className="lg:basis-[69%] md:basis-[60%] w-full ">

        <div className=" flex justify-between text-white">
          <div className="flex gap-3 items-center">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d506a806ee546f3b309a9abe5a4b631f14090186ee32bbf1cfef3f5ea71299fc?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" alt="" />
            <h1 className="text-2xl text-neutral-400">Latest Post</h1>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <h1 className="text-lg">See all</h1>
            <IoArrowForward className="h-6 w-6" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-8 mt-4">
          {publishedPosts?.map( ( card: any ) => (
            <div key={card._id} className=" flex flex-col gap-5  cursor-pointer" onClick={() => {
              router.push( `/detail-page/${card._id}` );
            }}>
              {card.postType?.toLowerCase() === "video post" ?
                <video src={card?.previewImageUrl} controls className="h-56 lg:w-80 md:w-full object-cover" />
                :
                <img loading="lazy" src={card?.previewImageUrl} alt={card?.title} className="h-56 lg:w-80 md:w-full object-cover" />
              }

              <h1 className="text-xl text-white font-semibold">{card.title}</h1>
              <div className="mt-1 flex gap-3 items-center">
                <button className="bg-[#DF841C] py-0.5 px-3">
                  {card.category.join( ", " )}
                </button>
                <p className="text-sm text-neutral-400">{card.date}</p>
              </div>
            </div>
          ) )}
        </div>
      </div>
      <div className="flex flex-col ml-5  lg:basis-[31%]  md:basis-[40%] max-md:ml-0 max-md:w-full ">
        <div className="flex flex-col w-full max-md:mt-10">
          <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
            <h1 className="text-white text-xl">Advertisement</h1>
          </div>
          <div className="flex gap-5 lg:flex-row md:flex-col justify-between mt-12 w-full max-md:mt-10">
            <div className="flex gap-3">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f625ed65683133103fe271b92910100f13a41a901bb36ac5b0876e0ae59d896b?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 aspect-square rounded-[60px] w-[60px]" />
              <div className="flex flex-col my-auto">
                <div className="text-base font-medium leading-loose text-zinc-300 max-md:mr-1">
                  @username
                </div>
                <div className="lg:mt-2.5 text-xs font-semibold leading-loose text-neutral-400">
                  3687<span className="font-bold"> Followers</span>
                </div>
              </div>
            </div>

            <button className="px-4 py-3 my-auto text-center text-sm font-medium leading-none whitespace-nowrap border border-solid border-neutral-700 text-zinc-500">
              Follow
            </button>
          </div>
          <div className="w-full">
            <div className="flex mt-4">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7a6912e0de89cf09a3a72c8f7e46791a8ce76a5cd7fe0207674f4b9f23b2b425?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]" />
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7c4fedddf818867b8236b84c6022295c8271a2b200cfae87fc7ed13a0a117f16?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-square w-[114px]" />
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a02f66409d1af377f7441ba9677a4507ff437152e0babbce6476572a7c1dba1a?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-[1.01] w-[115px]" />
            </div>

            <div className="flex">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b86246604d0a49b7285a9b0c735a39830b4e56b2ffdc640ea996e3372228c830?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-square w-[115px]" />
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/beea3c28f7ed8fc9e676788bfeb80325052425d5bba8e66801d390a5ce9d2865?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]" />
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8e0184a76aee3f0c4f94382abacbcab406db1244f05846082c4618b3352ac9db?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-square w-[115px]" />
            </div>
            <div className="flex">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6c45cdc796fa71a699c3eba9e5067b20ecbcfaea5924061e75f1df0061647b4?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184" className="object-contain shrink-0 max-w-full aspect-square w-[115px]" />
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8d17aaf5af126ba655eb55ea77368e2e268681d35069db64f962e9462f54383?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                className="object-contain shrink-0 max-w-full aspect-[0.99] w-[114px]"
              />
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c039e1913aeb74b4082eab8609100bc5a2787d48e4455b1740d304906cb65d52?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                className="object-contain shrink-0 max-w-full aspect-square w-[115px]"
              />
            </div>
          </div>

          <div className="self-start mt-14 text-2xl font-medium leading-none text-neutral-400 max-md:mt-10">
            Popular categories
          </div>
          <div className="flex gap-5 justify-between mt-7 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>Crypto</div>
            <div className="self-start">6</div>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>Blockchain</div>
            <div className="self-start">6</div>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>NFT</div>
            <div className="self-start">6</div>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>Web3</div>
            <div>6</div>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>Entertainment</div>
            <div>6</div>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-sm whitespace-nowrap text-zinc-300 max-md:mr-0.5">
            <div>Music</div>
            <div>6</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Latest;
