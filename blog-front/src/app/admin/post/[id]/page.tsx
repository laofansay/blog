// @ts-nocheck
"use client";
import { IBlog } from "@/api/model/blog.model";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useParams } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import {
  Select,
  SelectItem,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { BlogStatus } from "@/api/model/enumerations/blog-status.model";

import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { GrView } from "react-icons/gr";

import {
  getEntity,
  createEntity,
  updateEntity,
  reset,
} from "@/api/shared/reducers/blog.reducers";
import { getEntities as getCategories } from "@/api/shared/reducers/category.reducer";
import { getEntities as getTags } from "@/api/shared/reducers/tag.reducer";

const UpdatePost = ({ params }) => {
  const { id } = params;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const blog = useAppSelector((state) => state.blog.entity);
  const loading = useAppSelector((state) => state.blog.loading);
  const errorMessage = useAppSelector((state) => state.blog.errorMessage);
  const updateSuccess = useAppSelector((state) => state.blog.updateSuccess);

  const categorList = useAppSelector((state) => state.category.entities);
  const tagsList = useAppSelector((state) => state.tag.entities);

  const [title, setTitle] = useState(blog.title);
  const [shortDescription, setShortDescription] = useState(
    blog.shortDescription || ""
  );
  const [seoTitle, setSeoTitle] = useState(blog.seoTitle || "");
  const [imageUrl, setImageUrl] = useState(blog.imageUrl || "");
  const [imageAlt, setImageAlt] = useState(blog.imageAlt || "");
  const [category, setCategory] = useState(blog?.category?.id || "");
  const [topic, setTopic] = useState(blog.topic || "");
  const [url, setUrl] = useState(blog.url || "");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getCategories({}));
    dispatch(getTags({}));
  }, [dispatch, id]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("操作成功");
      router.push("/admin/post"); // 假设成功后跳转到博客列表页
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [updateSuccess, errorMessage, dispatch, router]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setShortDescription(blog.shortDescription || "");
      setSeoTitle(blog.seoTitle || "");
      setImageUrl(blog.imageUrl || "");
      setImageAlt(blog.imageAlt || "");
      setCategory(blog?.category?.id.toString() || "");
      setTopic(blog.topic || "");
      setUrl(blog.url || "");
      if (blog && blog.tags) {
        const tagsArray = blog.tags.split(",").map((tag) => tag.trim());
        // Filter tagsArray to include only those tags present in tagsList
        const validTags = tagsArray.filter(
          (tag) => tagsList.some((listTag) => listTag.name === tag) // Assuming tagsList has `name` property for tag names
        );

        setTags(validTags);
      }
    }
  }, [blog]);

  // 直接发布的方法
  const handlePublish = (status: BlogStatus) => {
    const entity = {
      ...blog,
      title,
      shortDescription,
      seoTitle,
      imageUrl,
      imageAlt,
      category: categorList.find((it) => it.id.toString() === category),
      topic,
      tags: tags.join(","),
      url,
      status,
    } as IBlog;
    dispatch(updateEntity(entity));
  };

  const handleCanal = () => {
    router.push("/admin/post"); // 假设成功后跳转到博客列表页
  };
  const handleView = () => {
    router.push("/posts/${blog.id}");
  };

  const [seletCategory, setSeletCategory] = React.useState<Selection>(["1"]);

  return (
    <div className=" bg-blue-100   rounded-md mx-20">
      <div className="flex flex-1 items-center justify-end bg-gray-700 rounded-md p-2 gap-2">
        <div className="text-sm  text-white ">
          状态：
          <span
            className={`text-sm  ${
              blog.status === BlogStatus.DRAFT
                ? " text-yellow-400"
                : blog.status === BlogStatus.PUBLISH
                ? " text-green-400"
                : " text-red-400"
            }`}
          >
            {blog.status === BlogStatus.DRAFT
              ? "草稿"
              : blog.status === BlogStatus.PUBLISH
              ? "已发布"
              : "已归档"}
          </span>
        </div>
        <a className="px-2" onClick={handleView}>
          <GrFormView size={24} className=" text-white" />
        </a>
        <Button size="sm" onClick={handleCanal}>
          取消
        </Button>
        <Dropdown>
          <DropdownTrigger size="sm" color="primary">
            <Button>
              保存
              <FaAngleDown />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => handlePublish(key)}
          >
            <DropdownItem key={BlogStatus.DRAFT}>存草稿</DropdownItem>
            <DropdownItem key={BlogStatus.PUBLISH}>发布</DropdownItem>
            <DropdownItem key={BlogStatus.ARCHIVED}>停用</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="rounded-md p-6">
        <div className="w-100 flex justify-center text-center">
          <h1 className="text-xl  font-bold ">修改博客</h1>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
        </div>

        <form className="">
          {/* blog title */}
          <div className="w-100 flex flex-col flex-left mb-2 gap-2">
            <Input
              type="text"
              label="标题"
              size="lg"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              labelPlacement="outside"
              placeholder="请输入标题"
              defaultValue={title}
              className="max-w-sx"
            />
          </div>

          <div className="w-100 flex flex-col flex-left mb-2 gap-2">
            <Input
              type="text"
              label="副标题"
              size="lg"
              name="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              labelPlacement="outside"
              placeholder="请输入副标题"
              defaultValue={shortDescription}
              className="max-w-sx"
            />
          </div>

          {/* blog slug */}
          <div className="w-100 flex flex-col flex-left mb-2">
            <Input
              type="text"
              label="封面图"
              size="lg"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              labelPlacement="outside"
              placeholder="请选择副封面图"
              defaultValue={imageUrl}
              className="max-w-sx"
            />
          </div>
          <div className="w-100 flex flex-col flex-left mb-2">
            <Input
              type="text"
              label="封面图说明"
              size="lg"
              name="imageAlt"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              labelPlacement="outside"
              placeholder="封面图说明"
              defaultValue={imageUrl}
              className="max-w-sx"
            />
          </div>

          {/* blog slug */}
          <div className="w-100 flex flex-col flex-left mb-2">
            <Input
              type="text"
              label="slug"
              size="lg"
              name="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              labelPlacement="outside"
              placeholder="slug"
              defaultValue={url}
              className="max-w-sx"
            />
          </div>

          <div className="w-full flex flex-col md:flex-row mb-2 justify-between gap-2">
            {/* blog  category */}
            <Select
              labelPlacement="outside"
              items={categorList}
              label="分类"
              name="category"
              placeholder="请选择一个分类"
              className="max-w-xs"
              selectedKeys={category ? [category] : []}
              onChange={(e) => setCategory(e.target.value)}
            >
              {(cate) => <SelectItem key={cate.id}>{cate.name}</SelectItem>}
            </Select>

            {/* blog  tag */}
            <Select
              labelPlacement="outside"
              items={tagsList}
              label="标签"
              name="tags"
              placeholder="请选择一个标签"
              className="w-full max-w-xl"
              selectionMode="multiple"
              selectedKeys={new Set(tags)}
              onSelectionChange={(keys) => setTags(Array.from(keys))}
            >
              {(tag) => <SelectItem key={tag.name}>{tag.name}</SelectItem>}
            </Select>
          </div>

          {/* markdown desription content */}
          <div className="desription w-100 flex flex-col flex-left mb-2">
            <label htmlFor="desription">blog content</label>
            <MarkdownEditor
              value={topic}
              onChange={(ev) => setTopic(ev.text)}
              style={{ width: "100%", height: "400px" }}
              renderHTML={(text) => (
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, classname, children, ...props }) => {
                      const match = /language-(\w+)/.exec(classname || "");
                      if (inline) {
                        return <code>{children}</code>;
                      } else if (match) {
                        return;
                        <div className="name" style={{ position: "relative" }}>
                          <pre
                            sytle={{
                              pading: "0",
                              borderRabius: "5px",
                              overflowX: "auto",
                              whiteSpace: "pre-warp",
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            copy code
                          </button>
                        </div>;
                      } else {
                        return <code {...props}>{children}</code>;
                      }
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
