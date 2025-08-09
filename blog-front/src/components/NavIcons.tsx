
// @ts-nocheck
"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { Tooltip } from "@nextui-org/react";
<<<<<<< HEAD
import useInitializeAuth from "@/store/UseInitializeAuth";
=======
import useInitializeAuth from '@/store/UseInitializeAuth';
import { hasAnyAuthority } from '@/api/config/private-route';
import { AUTHORITIES } from '@/api/config/constants';
>>>>>>> e26d386 (ok)


const NavIcons = () => {
  const { isAuthenticated, isAdmin } = useInitializeAuth(); // ✅ 解构使用
  const isLoggedIn =isAuthenticated

<<<<<<< HEAD
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

=======
  useInitializeAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const isLoggedIn = useSelector((state: RootState) => state.authentication.isAuthenticated);
  const isAdmin = useSelector((state: RootState) => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
>>>>>>> e26d386 (ok)
  //const account = useSelector((state: RootState) => state.authentication.account)
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
<<<<<<< HEAD
    <div className="flex felx-center gap-4 xl:gap-6  relative " ref={menuRef}>
      <Tooltip
        color="default"
        content={isProfileOpen && isLoggedIn ? "menu" : "login"}
      >
        <span
          className={`
=======
    <div className="flex felx-center gap-4 xl:gap-6  relative "
      ref={menuRef}
    >
      <Tooltip color="default" content={isProfileOpen && isLoggedIn ? 'menu' : 'login'}>
        <span className={`
>>>>>>> e26d386 (ok)
                        text-sm cursor-pointer
                        inline-block rounded-full 
                        shadow-md hover:shadow-lg
                        transition-all duration-300 ease-in-out
                        transform hover:scale-110 hover:-translate-y-1
                        active:scale-95 active:shadow-inner
<<<<<<< HEAD
                        ${isLoggedIn ? "text-primary" : "text-blue"}
  `}
        >
=======
                        ${isLoggedIn
            ? 'text-primary'
            : 'text-blue'}
  `}>
>>>>>>> e26d386 (ok)
          <CgProfile onClick={handleProfile} size={30} />
        </span>
      </Tooltip>
      {
        isProfileOpen && (
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
            <div className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center"
              onClick={handleLogout}
            >
              {isLoggedIn ? "退出" : "登录"}
            </div>
          </div>
<<<<<<< HEAD
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
=======
        )
      }
    </div >
  )
}
>>>>>>> e26d386 (ok)

export default NavIcons