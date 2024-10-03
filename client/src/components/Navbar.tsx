"use client";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {FaFacebookSquare, FaInstagram, FaLinkedin} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {IoClose, IoMenu} from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const user = useAppSelector( ( state ) => state.contributor.currentUser );
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  const handleCategoryClick = ( category: string ) => {
    const formattedCategory = category.toLowerCase().replace( /\s+/g, '-' );
    router.push( `/article?category=${formattedCategory}` );
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open and close states
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
          <li className="hover:text-amber-600 my-auto" onClick={() => handleCategoryClick( 'Press Releases' )}>Press Releases</li>
          
          {/* {user ?
            <li className="text-amber-600 font-bold my-auto" onClick={() => router.push( "/dashboard" )}>Dashboard</li> :
            <li className="text-amber-600 font-bold leading-[75px]" onClick={() => router.push( "/auth/user/login" )}>  Sign in </li>
          } */}
        </ul>

        {/* Social Icons - Always visible */}
        <div className="flex items-center gap-4 my-auto cursor-pointer text-black ">
          <div className="flex gap-3 items-end  ">

           <div className="mb-1">
          {user ?
            <p className="text-amber-600 font-bold text-lg my-auto" onClick={() => router.push( "/dashboard" )}>Dashboard</p> :
            <p className="text-amber-600 font-bold text-lg " onClick={() => router.push( "/auth/user/login" )}>  Sign in </p>
          }
          </div>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/blocktourmedia" target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaLinkedin className="w-4 h-4 text-white"  />
              </div>
            </a>

            {/* Twitter */}
            <a href="https://x.com/blocktourmedia" target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaXTwitter className="w-4 h-4 text-white"  />
              </div>
            </a>

            {/* Facebook */}
            {/* <a href="https://www.instagram.com/blocktourmedia/" target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaFacebookSquare className="w-4 h-4 text-white"  />
              </div>
            </a> */}

            {/* Instagram */}
            <a href="https://www.instagram.com/blocktourmedia/" target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 cursor-pointer border border-[#666666] rounded-full flex justify-center items-center">
                <FaInstagram className="w-4 h-4 text-white"  />
              </div>
            </a>
          </div>
         
          <div className="flex lg:hidden items-center sm:mr-1 mr-4" onClick={toggleMenu}>
            {isMenuOpen ? <IoClose className="h-8 w-8 text-white" /> : <IoMenu className="h-8 w-8 text-white" />}
          </div>
        </div>
        

        {isMenuOpen && (
          <ul className="lg:hidden flex flex-col items-center absolute top-[60px] left-0 w-full bg-black opacity-60 text-white gap-5 p-5">
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick("Crypto")}>
              Crypto
            </li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick("Blockchain")}>
              Blockchain
            </li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick("NFT")}>
              NFT
            </li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick("Web3")}>
              Web3
            </li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick("Press Releases")}>
              Press Releases
            </li>
          </ul>
        )}


      </nav>
    </>
  );
};

export default Navbar;
