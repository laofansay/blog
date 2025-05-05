"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { Tooltip } from "@nextui-org/react";
import { hasAnyAuthority } from "@/api/config/private-route";
import { AUTHORITIES } from "@/api/config/constants";

const NavIcons = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef < HTMLDivElement > (null);
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
    router.push("/login");
  };
  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className="flex felx-center gap-4 xl:gap-6  relative " ref={menuRef}>
      <Tooltip
        color="default"
        content={"menu"}
      >
        <span
          className={`
                        text-sm cursor-pointer
                        inline-block rounded-full 
                        shadow-md hover:shadow-lg
                        transition-all duration-300 ease-in-out
                        transform hover:scale-110 hover:-translate-y-1
                        active:scale-95 active:shadow-inner
                        "text-primary" }
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
          <div
            className="cursor-pointer hover:shadow-lg hover:bg-gray-300 mx-[-15px] justify-center text-center"
            onClick={handleLogout}
          >
            "登录"
          </div>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
