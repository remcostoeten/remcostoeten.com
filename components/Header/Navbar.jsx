import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '../svg-elements/logo/RemcoStoetenLogoIcon';
import Toggle from './Toggle';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  return (
    <><nav className={`fixed w-full ${isScrolled ? '' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 transition 500ms ease-in-out">
                  <div className="flex-shrink-0"> 
                      <Link href="/" className="flex items-center">
                          <LogoIcon />
                      </Link>
                  </div>
                  <ul className={`flex ${isScrolled ? 'opacity-0' : 'opacity-1'}`}>
                          <li>
                              <Link href="/url-filtering-tool"
                                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-m font-medium">Extract URL tool
                              </Link>

                          </li>
                          <li>
                              <Link href="/tasks"
                                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-m font-medium">Kanban/To-do board
                              </Link>
                          </li>
                          <li>
                                <Link href="/product-page"                                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-m font-medium">

                                    Stripe payment
                                </Link>
                          </li>
                          <li>
                          <Link href="/webgl"                                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-m font-medium">
                                    Web GL
                                </Link>
                          </li>
                          {/* Create dropdown menu 1 layer deep with animation on open*/}



                            <li>
                                <Link href="/contact" 
                                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-m font-medium">Contact
                                </Link>
                            </li>
                      </ul>


              <button
                  onClick={toggleMenu}
                  className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${isScrolled ? 'block' : 'hidden'}`}
                  aria-expanded={isMenuOpen ? 'true' : 'false'}
              >
                  <span className="sr-only">Open main menu</span>
                  <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </div>
      <div className={`${isScrolled ? ' opacity-1 transition transition duration-500 ease-in-out' : 'transition duration-500 ease-in-out opacity-0'} `}>
              <Toggle />
          </div>
    </div>
 </nav></>
    );
};

export default Navbar;
