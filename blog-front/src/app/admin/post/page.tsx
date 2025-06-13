// @ts-nocheck
"use client";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Image,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { BlogStatus } from "@/api/model/enumerations/blog-status.model";

import { IBlog, defaultValue } from "@/api/model/blog.model";
import {
  getEntities,
  deleteEntity,
  reset,
} from "@/api/shared/reducers/admin/admin.blog.reducers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { FaEllipsisVertical } from "react-icons/fa6";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from "@/api/shared/util/pagination.constants";

import { overridePaginationStateWithQueryParams } from "@/api/shared/util/entity-utils";
import { getPaginationState } from "react-jhipster";
import { IoMdAddCircle } from "react-icons/io";

const PostListPage = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);

  const blogList = useAppSelector((state) => state.adminBlog.entities);
  const totalItems = useAppSelector((state) => state.adminBlog.totalItems);
  const isLoading = useAppSelector((state) => state.adminBlog.loading);
  const updateSuccess = useAppSelector((state) => state.adminBlog.updateSuccess);
  const errorMessage = useAppSelector((state) => state.adminBlog.errorMessage);

  const [blog, setBlog] = useState({});

  const pages = useMemo(() => {
    return totalItems ? Math.ceil(totalItems / pageSize) : 0;
  }, [totalItems, pageSize]);

  useEffect(() => {
    dispatch(
      getEntities({
        page: page,
        size: pageSize
      })
    );
    dispatch(reset());
  }, [page, pageSize, dispatch]);

  const handleRefresh = () => {
    dispatch(
      getEntities({
        page: page - 1,
        size: pageSize,
        sort: "id",
      })
    );
    toast.success("刷新成功");
  };
  const handleAddBlog = () => {
    return router.push("/admin/post/add");
  };

  const handleEditBlog = (id) => {
    return router.push(`/admin/post/${id}`);
  };

  const handleView = (id) => {
    router.push(`/posts/${id}`);
  };

  //remote one

  const { isOpen, onOpen, onClose } = useDisclosure();

  const confirmOpenDeleteDialog = (blog) => {
    //return router.push(`/admin/post/${id}`);
    setBlog(blog);
    onOpen();
  };
  const handleDeleteBlog = () => {
    dispatch(deleteEntity(blog.id));
  };

  useEffect(
    () => {
      if (updateSuccess) {
        toast.success("删除成功");
      } else if (errorMessage) {
        toast.error(errorMessage);
      }
      onClose();
      setPage(1);
    },
    [updateSuccess, errorMessage],
    onClose
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderCell = useCallback((blog: IBlog, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{blog.title}</p>
          </div>
        );
      case "shortDescription":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {blog.shortDescription}
            </p>
          </div>
        );

      case "imageUrl":
        return (
          <div className="relative group flex flex-col items-center">
            <div className="cursor-pointer ">
              <Image
                width={50}
                height={50}
                alt={blog.imageAlt}
                src={blog.imageUrl}
                className="rounded"
              />
            </div>
            <div className="absolute hidden group-hover:block top-10 left-10 z-10">
              <Image
                width={100}
                height={100}
                alt={blog.imageAlt}
                src={blog.imageUrl}
                className="rounded border border-gray-300 shadow-lg"
              />
            </div>
          </div>
        );
      case "topic":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize truncate-multiline">
              {blog.topic}
            </p>
          </div>
        );
      case "publishTime":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize truncate-multiline">
              {blog.publishTime}
            </p>
          </div>
        );
      case "tags":
        return (
          <div className="flex flex-col gap-1">
            {blog.tags.split(",").map((tag, index) => (
              <Chip key={index} className="text-sm  bg-gray-400" size="sm">
                {tag.trim()}
              </Chip>
            ))}
          </div>
        );
      case "status":
        return (
          <Chip
            className={`text-sm  ${
              blog.status === BlogStatus.DRAFT
                ? " bg-yellow-400"
                : blog.status === BlogStatus.PUBLISH
                ? " bg-green-400"
                : " bg-red-400"
            }`}
            size="sm"
          >
            {blog.status === BlogStatus.DRAFT
              ? "草稿"
              : blog.status === BlogStatus.PUBLISH
              ? "发布"
              : "归档"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FaEllipsisVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleView(blog.id)}>
                  预览
                </DropdownItem>
                <DropdownItem onClick={() => handleEditBlog(blog.id)}>
                  修改
                </DropdownItem>
                <DropdownItem onClick={() => confirmOpenDeleteDialog(blog)}>
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return "--";
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">Status</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                <DropdownItem className="capitalize">name</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">Columns</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                <DropdownItem className="capitalize">name</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onClick={handleAddBlog}>
              添加
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalItems}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option selected value="20">
                20
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContentPlacement="outside"
        color="primary"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onRowAction={(key) => handleEditBlog(key)}
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-between items-center p-4">
            <span className="text-sm text-default-500">
              共 {totalItems} 条记录
            </span>
            {totalItems > 0 && (
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                total={pages}
                page={page}
                onChange={handlePageChange}
                classNames={{
                  wrapper: "gap-2",
                  item: "w-8 h-8",
                  cursor: "bg-primary-500 text-white",
                  selected: "bg-primary-50",
                }}
              />
            )}
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="title" width="15%">
            标题
          </TableColumn>
          <TableColumn key="shortDescription" width="20%">
            简介
          </TableColumn>
          <TableColumn key="imageUrl" width="10%">
            图片
          </TableColumn>
          <TableColumn key="topic" width="20%">
            内容
          </TableColumn>
          <TableColumn key="tags" width="10%">
            标签
          </TableColumn>
          <TableColumn key="status" width="10%">
            状态
          </TableColumn>
          <TableColumn key="publishTime" width="10%">
            发布时间
          </TableColumn>
          <TableColumn key="actions"  className="flex items-center gap-2" >
            操作
            <IoMdAddCircle
              size={25}
              className="text-primary cursor-pointer"
              onClick={handleAddBlog}
            />
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onClick={handleRefresh}
              className="text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
            </Button>
            </TableColumn>
        </TableHeader>
        <TableBody items={blogList} loadingState={isLoading}>
          {(item) => (
            <TableRow key={item}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                确认删除
              </ModalHeader>
              <ModalBody>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={handleDeleteBlog}></Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default PostListPage;


