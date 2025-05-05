import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-32 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg z-50 transition-all duration-300 hover:shadow-xl">
        <div className="h-full flex items-center md:hidden justify-between flex-1">
          <Link href="/" className="flex flex-center items-center">
            <Image src="/logo1.png" alt="" width={80} height={20} />
            <div className="text-2xl tracking-wide">老范SAY</div>
          </Link>
          <div className="flex items-center gap-4">
            <NavIcons />
            <div className="relative z-50">
              <Menu />
            </div>
          </div>
        </div>
        {/* bigger screens */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* left  */}
          <div className="w-2/3">
            <Link href="/" className="flex  flex-center items-center gap-2">
              <Image src="/logo1.png" alt="" width={80} height={20} />
              <div className="text-2xl tracking-wide"> </div>
              <div className="text-2xl tracking-wide">老范SAY</div>
            </Link>
            <div className="hidden xl:flex gap-4">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                首页
              </Link>
              <Link
                href="/list"
                className="px-3 py-1.5 rounded-md hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
              >
                博客
              </Link>
              <Link
                href="art"
                className="px-3 py-1.5 rounded-md hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
              >
                作品
              </Link>
              <Link
                href="/about"
                className="px-3 py-1.5 rounded-md hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200"
              >
                关于
              </Link>
            </div>
          </div>
          {/* right */}
          <div className="w-1/3 flex items-center justify-between gap-8">
            <SearchBar />
            <NavIcons />
          </div>
        </div>
      </div>
      <div className="h-20 bg-gradient-to-r from-blue-50 to-purple-50"></div>{" "}
      {/* 占位符 */}
    </>
  );
};

export default Navbar;
