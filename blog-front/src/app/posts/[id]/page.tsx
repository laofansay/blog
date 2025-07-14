// @ts-nocheck
"use client";
import ProfileCard from "@/components/ProfileCard";
import { getEntity } from "@/api/shared/reducers/app/app.blog.reducers";
import React, { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Image } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css"; // 引入 GitHub 样式
import remarkGfm from "remark-gfm";
import ProfileTags from "@/components/ProfileTags";
import ProfileCategory from "@/components/ProfileCategory";
import ProfileDate from "@/components/ProfileDate";
import { MdKeyboardReturn } from "react-icons/md";
import { useParams } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Posts = ({ params }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.blog.entity);

  useEffect(() => {
    dispatch(getEntity(params.id));
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // 如果没有历史记录，可以重定向到首页或其他页面
      router.push("/");
    }
  };
  return (
    <div className=" bg-gray-100 text-slate-700 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 ">
      <div className="flex justify-end pt-3 py-2">
        <div className="flex gap-2 mr-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onClick={handleBack}
          >
            <MdKeyboardReturn size={20} />
            返回
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-no-wrap relative z-10">
        <div className="bg-gray-100 my-2 mb-8 w-full md:w-1/4 mr-2 md:mr-0 hidden md:block">
          <ProfileCard />
          <ProfileCategory />
          <ProfileTags />
          {/* <ProfileDate /> */}
        </div>
        <div className="bg-gray-100  my-2 mb-8 w-full md:w-3/4 ml-2 md:ml-0 md:pl-2 md:pr-2 ">
          <div className=" bg-white  p-8  rounded-md">
            <div className="flex flex-col  items-center justify-center p-2 h-full ">
              <Image
                src={post.coverImage}
                alt={post.coverAlt || "Blog image"}
                width={400}
                height={200}
                className="rounded-[5px] object-cover"
              />
            </div>
            <div className="flex flex-col shadow-sm   p-4">
              <div className="mt-2 mb-2">
                <div className="inline-block mr-2  text-gray-400 hover:text-gray-800 transition-colors duration-300 text-xs leading-5 tracking-wider">
                  {" "}
                  {post.createTime}
                </div>
                <div className="inline-block mr-2 text-gray-400">|</div>
                <div className="inline-block mr-2 hover:underline  text-gray-400 hover:text-gray-800 transition-colors duration-300 text-xs leading-5 tracking-wider">
                  <Link
                    className="inline ml-2 transition-color duration-200 ease-in-out font-lato text-gray-600 text-sm leading-6 underline"
                    href={`/list?category=${post.category?.name}`}
                  >
                    {post.category?.name}
                  </Link>
                </div>
                <div className="inline-block mr-2 text-gray-400">|</div>

                {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-block mr-2 hover:underline text-gray-400 hover:text-gray-800 transition-colors duration-300 text-xs leading-5 tracking-wider"
                  >
                    <Link
                      className="inline ml-2 transition-color duration-200 ease-in-out font-lato text-gray-600 text-sm leading-6 underline"
                      href={`/list?tag=${tag}`}
                    >
                      {tag}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="block transition-opacity duration-200 ease-in-out text-gray-800 no-underline max-w-full p-4">
                <h1 className="text-6xl font-bold leading-tight mb-4">
                  {post.title}
                </h1>
                <h2 className="text-3xl text-gray-600 leading-relaxed mb-6">
                  {post.summary || post.subTitle}
                </h2>
              </div>
              <div className=" mt-2 mb-2">
                <div className="markdown-body p-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-3 py-2">
            <div className="flex gap-2 mr-2">
              <Button
                size="sm"
                variant="flat"
                color="secondary"
                onClick={handleBack}
              >
                <MdKeyboardReturn size={20} />
                返回
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
