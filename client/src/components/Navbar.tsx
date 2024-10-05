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
    <nav className="w-full  text-white py-4 px-4 md:px-6 lg:px-8">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => router.push( '/' )}
          loading="lazy"
          src="/asset/Block-logo.svg"
          className="object-contain h-12 cursor-pointer"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6">
          <li className="hover:text-amber-600" onClick={() => router.push( '/' )}>Home</li>
          <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Crypto' )}>Crypto</li>
          <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Blockchain' )}>Blockchain</li>
          <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'NFT' )}>NFT</li>
          <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Web3' )}>Web3</li>
          <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Press Releases' )}>Press Releases</li>
        </ul>

        {/* Desktop Social Icons and Sign In/Dashboard */}
        <div className="hidden lg:flex items-center space-x-4">
          <SocialIcons />
          <AuthButton user={user} router={router} onClick={toggleMenu} />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <IoClose className="h-8 w-8" /> : <IoMenu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4 text-white" onClick={toggleMenu}>
            <IoClose className="h-8 w-8" />
          </button>
          <ul className="flex flex-col items-center space-y-6 text-xl">
            <li className="hover:text-amber-600" onClick={() => {router.push( '/' ); toggleMenu();}}>Home</li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Crypto' )}>Crypto</li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Blockchain' )}>Blockchain</li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'NFT' )}>NFT</li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Web3' )}>Web3</li>
            <li className="hover:text-amber-600" onClick={() => handleCategoryClick( 'Press Releases' )}>Press Releases</li>
            <AuthButton user={user} router={router} onClick={toggleMenu} />
          </ul>
          <div className="mt-8">
            <SocialIcons />
          </div>
        </div>
      )}
    </nav>
  );
};

const SocialIcons = () => (
  <div className="flex space-x-4">
    <SocialIcon href="https://www.linkedin.com/company/blocktourmedia" icon={FaLinkedin} />
    <SocialIcon href="https://x.com/blocktourmedia" icon={FaXTwitter} />
    <SocialIcon href="https://www.instagram.com/blocktourmedia/" icon={FaInstagram} />
  </div>
);

const SocialIcon = ( {href, icon: Icon} : {href: string, icon: React.ElementType} ) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-600">
    <Icon className="w-6 h-6" />
  </a>
);

const AuthButton = ( {user, router, onClick} : {user: any, router: any, onClick: () => void} ) => (
  <button
    className="text-amber-600 font-bold text-lg hover:text-amber-500"
    onClick={() => {
      router.push( user ? "/dashboard" : "/auth/user/login" );
      if ( onClick ) onClick();
    }}
  >
    {user ? "Dashboard" : "Sign in"}
  </button>
); 

export default Navbar;
