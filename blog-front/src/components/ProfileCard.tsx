"use client";
import { Image } from "@nextui-org/react";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWeixin } from "react-icons/fa";
import { SiAlipay } from "react-icons/si";

import React, { useEffect, useState } from "react";
import { getList } from "@/api/shared/reducers/app/app.tag.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Link from "next/link";

const ProfileCard = ({}) => {
  const dispatch = useAppDispatch();
  const resuelt = useAppSelector((state) => state.blog.gradeList);
  const [showQR, setShowQR] = useState("");

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <div className="px-8 py-2 bg-white  rounded-md shadow-sm">
      <div className="text-center flex justify-center items-center  py-2 ">
        <Image
          src="/fan1.JPG"
          alt="head"
          className="w-60 h-60 rounded-full object-cover "
        />
      </div>
      <p className="py-2">
      这是一个基于Next.js和TypeScript开发的个人博客系统，采用现代化的UI设计和响应式布局，集成了文章管理、作者介绍、技术服务展示等功能，通过Tailwind CSS实现样式管理，并运用了Redux进行状态管理，同时结合了SEO优化和性能优化策略
      </p>
      <div className="grey-rule py-2">
        <hr />
      </div>
      <h2 className="small-heading py-2">精选文章:</h2>
      <div className="feature-posts-list w-dyn-list">
        <div role="list" className="w-dyn-items">
          {resuelt?.map((item) => (
            <div
              key={item.id}
              className="w-dyn-item py-2  text-gray-400 hover:text-gray-800 transition-colors duration-300"
            >
              <Link
                className="inline ml-2 transition-color duration-200 ease-in-out font-lato text-gray-600 text-sm leading-6 underline"
                href={`/posts/${item.id}`}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="grey-rule py-2">
        <hr />
      </div>
    </div>
  );
};

export default ProfileCard;
