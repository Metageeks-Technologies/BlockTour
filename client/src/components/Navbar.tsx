"use client";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {IoMenu} from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const user = useAppSelector( ( state ) => state.contributor.currentUser );
  const dispatch = useAppDispatch();
  useEffect( () => {
    if ( Cookies.get( "UserToken" ) && !user ) {
      getCurrentUser( dispatch );
    }
  }, [] );

  const handleCategoryClick = ( category: string ) => {
    router.push( `/article?category=${category}` );
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center gap-5">
        {/* Logo */}
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d88c4a716ba9fc6d19f3233c293e1e90da54bbf8c89120323784061079cc9216?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184&width=2000 2000w"
          className="object-contain shrink-0 aspect-[1.66] w-[101px] cursor-pointer"
          alt="Logo"
        />

        {/* Links - Hidden on tablet and smaller devices */}
        <ul className="hidden lg:flex cursor-pointer flex-wrap gap-10 items-center text-base font-medium leading-tight text-center text-white">
          <li className="hover:text-amber-600 leading-[75px]" onClick={() => router.push( '/' )}>Home</li>
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'Crypto' )}>Crypto</li>
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'Blockchain' )}>Blockchain</li>
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'NFT' )}>NFT</li>
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'Web3' )}>Web3</li>
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'Press Release' )}>Press Release</li>
           {user ?
            <li className="hover:text-amber-600 my-auto" onClick={() => router.push( "/dashboard" )}>Dashboard</li> :
            <li className="hover:text-amber-600 leading-[75px]" onClick={() => router.push( "/auth/user/login" )}>  Sign in </li>
          }
        </ul>

        {/* Social Icons - Always visible */}
        <div className="flex items-center gap-8 my-auto cursor-pointer text-black">
          <div className="flex items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/863d331eefa993b31b8aed224ade35e698451eb9e531bb98438ad4e8a4696a65?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 aspect-square w-[43px]"
              alt="Icon 1"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ab764a4c5c85468612bb76154a6adbea87eabf588ffb5e70f6791fc892d2c54?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 aspect-[0.98] w-[42px]"
              alt="Icon 2"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8846ea92b5c844b974e62a7c282808454ee6ab4f992a9d991027152d2e7bd9d2?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 aspect-[0.88] w-[38px]"
              alt="Icon 3"
            />
          </div>
          <div className="flex lg:hidden items-center">
            <IoMenu className="h-10 w-10 text-white" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
