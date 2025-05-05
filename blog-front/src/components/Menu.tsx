"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={40}
        height={40}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="fixed bg-white/95 backdrop-blur-sm text-gray-800 left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 text-xl z-50 shadow-xl transition-all duration-300 ease-in-out">
          <Link
            href="/"
            className="w-full px-6 py-3 text-center hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            首页
          </Link>
          <Link
            href="/list"
            className="w-full px-6 py-3 text-center hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            博客
          </Link>
          <Link
            href="/art"
            className="w-full px-6 py-3 text-center hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            art
          </Link>
          <Link
            href="/about"
            className="w-full px-6 py-3 text-center hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            关于
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
