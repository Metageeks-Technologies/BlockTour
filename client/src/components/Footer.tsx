"use client";
import instance from '@/utils/axios';
import axios from 'axios';
import React, {useState} from 'react';

const Footer = () => {
  const [email, setEmail] = useState( "" );

  const CreateSubscriber = async () => {
    try {

      const response = await instance.post( '/subscriber/subscribers', {email} );
      console.log( response );
      // provide alerts from response.data
      alert( `${response.data.message}` );
    } catch ( error: any ) {
      console.error( error );
      alert( 'There is some error in creating subscriber' );
    }
  };

  return (
    <>
      <div className="flex gap-5 justify-between self-center mt-20 max-w-full text-sm font-medium leading-loose text-center text-amber-500 whitespace-nowrap w-[474px] max-md:mt-10">
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ad6b8570d7c921930dbc0cc70d9733ededf86d1002e6487b9fc5507227dd598?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
            className="object-contain shrink-0 aspect-square w-[39px]"
          />
          <div className="my-auto">Facebook</div>
        </div>
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8a3447ac464bd5142f1f7f33a782a3ad736e84498bf6fe3be558aaa93c1d0bb?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
            className="object-contain shrink-0 aspect-square w-[39px]"
          />
          <div className="my-auto">Instagram</div>
        </div>
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ac29a936edd2c55b630ccc22736c5edcadf571d748184fd8d9559e8912cd5e8?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
            className="object-contain shrink-0 aspect-square w-[39px]"
          />
          <div className="my-auto">RSS</div>
        </div>
        <div className="flex gap-3.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d51864e5bb648571c66bda404a4a16bb607d98ba9eda665dd7b6de50c748711?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
            className="object-contain shrink-0 aspect-square w-[39px]"
          />
          <div className="my-auto">Twitter</div>
        </div>
      </div>
      <div className="mt-11 max-w-full w-[1192px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start text-sm font-medium leading-5 text-neutral-400 max-md:mt-10">
              <div className="text-2xl leading-none text-neutral-500">
                Popular articles
              </div>
              <div className="self-stretch py-1.5 mt-6 bg-white bg-opacity-0 max-md:mr-0.5">
                Smart CCTV networks are driving an AI-powered apartheid
                <br />
                in South Africa
              </div>
              <div className="mt-2.5 text-xs font-bold leading-none text-zinc-500">
                June 29, 2019
              </div>
              <div className="self-stretch py-1 mt-4 bg-white bg-opacity-0">
                Apple may be making major changes to some of its iPhone
                <br />
                sizes next year
              </div>
              <div className="mt-2.5 text-xs font-bold leading-none text-zinc-500">
                June 29, 2019
              </div>
              <div className="self-stretch py-1 mt-4 bg-white bg-opacity-0 max-md:mr-1.5">
                Elon says 250,000 people have already preordered Tesla’s
                <br />
                new Cybertruck
              </div>
              <div className="mt-2.5 text-xs font-bold leading-none text-zinc-500">
                June 29, 2019
              </div>
              <div className="py-1 mt-4 bg-white bg-opacity-0">
                Artists used deepfake tech to tell alternate moon landing
                <br />
                history
              </div>
              <div className="mt-2.5 text-xs font-bold leading-none text-zinc-500">
                June 29, 2019
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start text-sm font-medium leading-none text-neutral-400 max-md:mt-10">
              <div className="text-2xl leading-none text-neutral-500">
                Featured
              </div>
              <div className="self-stretch py-1 mt-7 leading-5 bg-white bg-opacity-0 max-md:mr-1">
                Tesla’s Cybertruck fiasco cost Elon Musk $768 million in a
                <br />
                single day
              </div>
              <div className="mt-2.5 text-xs font-bold text-zinc-500">
                August 29, 2019
              </div>
              <div className="py-1 mt-4 leading-snug bg-white bg-opacity-0">
                These striking photos capture the future of human flight
              </div>
              <div className="mt-2.5 text-xs font-bold text-zinc-500">
                October 29, 2019
              </div>
              <div className="self-stretch py-1 mt-4 leading-5 bg-white bg-opacity-0">
                What’s the point of ‘Charlie’s Angels’ without Sam Rockwell
                <br />
                dancing?
              </div>
              <div className="mt-2.5 text-xs font-bold text-zinc-500">
                October 29, 2019
              </div>
              <div className="py-1.5 mt-4 max-w-full leading-5 bg-white bg-opacity-0 w-[311px]">
                Exploring the origins of punk across America with Kid
                <br />
                Karate and Bushmills
              </div>
              <div className="mt-2.5 text-xs font-bold text-zinc-500">
                November 29, 2019
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start text-sm font-medium text-neutral-500 max-md:mt-10">
              <div className="text-2xl leading-none">Newsletter</div>
              <div className="mt-7 leading-5 text-neutral-400">
                Subscribe to get the latest news, offers and special
                <br />
                announcements.
              </div>

              <label
                htmlFor="email"
                className=""
              >
                Your email address
              </label>

              <input
                type="email"
                placeholder="Your email address"
                id="email"
                value={email}
                className="self-stretch px-3.5 py-4 mt-7 rounded border border-solid border-neutral-700 text-neutral-400 max-md:pr-5 bg-black"
                onChange={( e ) => setEmail( e.target.value )}
              />

              <div className="self-stretch px-16 py-4 mt-3.5 leading-3 text-center text-white whitespace-nowrap rounded bg-neutral-800 max-md:px-5" onClick={CreateSubscriber} >
                Subscribe
              </div>
              <div className="mt-3.5 text-xs leading-loose">
                By subscribing, you're accepting to receive promotions.
              </div>
              <div className="mt-3.5 text-xs leading-5">
                <span className="text-white">Mail at:</span>
                <br />
                <span className="text-stone-300">support@blocktour.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 mt-20 max-w-full h-px border-t border-white border-opacity-10 w-[1192px] max-md:mt-10" />
      <div className="flex flex-wrap gap-5 justify-between mt-4 pb-4 max-w-full text-sm font-medium leading-relaxed text-neutral-500 w-[1192px]">
        <div>© Copyright - 2024 Block Tour. All rights reserved.</div>
        <div className="flex gap-4 items-center text-center whitespace-nowrap">
          <div className="grow self-stretch text-amber-500">Home</div>
          <div className="self-stretch my-auto">Tech</div>
          <div className="self-stretch my-auto">Politics</div>
          <div className="self-stretch my-auto">Entertainment</div>
          <div className="self-stretch my-auto">Finance</div>
          <div className="self-stretch my-auto">Music</div>
          <div className="self-stretch my-auto">Life</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
