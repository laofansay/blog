"use client";

import React from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Card from "./Card";
import { IBlog } from "@/api/model/blog.model";

interface PostListProps {
  posts: IBlog[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex md:flex-row relative z-10">
      <div className="bg-gray-200 rounded-md my-2 mb-8 w-2/3 ml-2">
        <div className="flex flex-col">
          {posts?.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
