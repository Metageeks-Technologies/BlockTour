import React from "react";
import {useAppSelector} from "@/app/redux/hooks";
import {useRouter} from "next/navigation";
import {formatDateTime} from "@/utils/DateFormat";
const Politics = () => {
  const router = useRouter();
  const posts = useAppSelector( ( state: any ) => state.post.posts );
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" && post.category.includes( "Politics" ) || post.category.includes( "politics" ) ).reverse().slice( 0, 4 );

  return (
    <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {publishedPosts.map( ( post: any, index: number ) => (
        <div key={post._id} className="flex flex-col max-md:ml-0 max-md:w-full cursor-pointer" onClick={() => router.push( `/detail-page/${post._id}` )}>
          <div className="flex relative flex-col w-full aspect-[0.974]">
            {post.previewImageUrl ? (
              <img
                loading="lazy"
                src={post.previewImageUrl}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="py-3 rounded-xl bg-stone-950  ">
              <h1 className="text-xl font-medium leading-7 mb-3">{post.title}</h1>
              <div className="flex gap-3">
                <button className="px-2 whitespace-nowrap bg-amber-600 text-stone-950">
                  {post.category}
                </button>
                <p className="my-auto text-neutral-500">{formatDateTime( post.createdAt )}</p>
              </div>
            </div>
          </div>
        </div>
      ) )}
      {publishedPosts.length === 0 && (
        <>
          {[...Array( 3 )].map( ( _, index ) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-64 w-full"></div>
              <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ) )}
        </>
      )}
    </div>
  );
};

export default Politics;
