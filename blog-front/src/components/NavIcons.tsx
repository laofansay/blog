"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { Tooltip } from "@nextui-org/react";
import useInitializeAuth from "@/store/UseInitializeAuth";


const NavIcons = () => {
  const { isAuthenticated, isAdmin } = useInitializeAuth(); // ✅ 解构使用
  const isLoggedIn =isAuthenticated

  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //const account = useSelector((state: RootState) => state.authentication.account)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  const handleLogout = () => {
    if (isLoggedIn) {
      router.push("/logout");
    }
  };

  return (
    <div className="flex felx-center gap-4 xl:gap-6  relative " ref={menuRef}>
      <Tooltip
        color="default"
        content={isProfileOpen && isLoggedIn ? "menu" : "login"}
      >
        <span
          className={`
                        text-sm cursor-pointer
                        inline-block rounded-full 
                        shadow-md hover:shadow-lg
                        transition-all duration-300 ease-in-out
                        transform hover:scale-110 hover:-translate-y-1
                        active:scale-95 active:shadow-inner
                        ${isLoggedIn ? "text-primary" : "text-blue"}
  `}
        >
          <CgProfile onClick={handleProfile} size={30} />
        </span>
      </Tooltip>
      {isProfileOpen && (
        <div className="rounded-md absolute w-24 p-4  top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 gap-1 space-y-1">
          <div className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center">
            <Link href="/author">个人简历</Link>
          </div>
          {isAdmin && (
            <>
              <div className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center">
                <Link href="/admin/post">文章管理</Link>
              </div>
              <div className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center">
                <Link href="/admin/category">分类管理</Link>
              </div>
              <div className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center">
                <Link href="/admin/tag">标签管理</Link>
              </div>
            </>
          )}
          <div
            className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center"
            onClick={handleLogout}
          >
            {isLoggedIn ? "退出" : "登录"}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
