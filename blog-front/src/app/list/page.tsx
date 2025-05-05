"use client";
import CardList from "@/components/CardList";
import { IBlog, defaultValue } from "@/api/model/blog.model";
import { getEntities, reset } from "@/api/shared/reducers/blog.reducers";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";

function ListContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || ""; // 获取 category 参数的值
  const tag = searchParams.get("tag") || ""; // 获取 category 参数的值

  const blogList = useAppSelector((state) => state.blog.entities) as IBlog[];

  const totalPages = useAppSelector((state) => state.blog.totalItems || 10);
  const [currentPage, setCurrentPage] = React.useState(1);

  // 构建 query 对象
  const query = [
    category ? `category.name=${category}` : "",
    tag ? `tag=${tag}` : "",
  ]
    .filter((param) => param !== "")
    .join("&");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchAllEntities = () => {
    dispatch(
      getEntities({
        query,
        page: currentPage - 1,
        size: 10,
        sort: "id,desc",
      })
    ); // 使用 unwrap 获取实际数据或抛出错误
    dispatch(reset()); // 在获取新数据之前重置状态
  };

  useEffect(() => {
    fetchAllEntities();
  }, [query, currentPage, dispatch]);

  return (
    <div className=" bg-gray-100 text-slate-700">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32">
        <div className="flex flex-1 justify-between items-baseline">
          <h1 className="text-2xl pt-4 ">最新博文</h1>
          <div className="flex">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <CardList data={blogList} />
      </div>
    </div>
  );
}

const ListPage = () => {
  // 这是页面组件
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListContent />
    </Suspense>
  );
};
export default ListPage;
