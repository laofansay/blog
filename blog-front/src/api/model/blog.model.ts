import dayjs from "dayjs";
import { BlogStatus } from "@/api/model/enumerations/blog-status.model";
import { ICategory } from "./category.model";

export interface IBlog {
  id?: number;
  title?: string;
  subTitle?: string;
  summary?: string;
  tags?: string[] | null;
  url?: string | null;
  coverImage?: string;
  coverAlt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  content?: string;
  status?: number;
  categoryId?: number;
  authorId?: number;
  viewCount?: number;
  enableComment?: boolean | null;
  publishTime?: dayjs.Dayjs | null;
  createTime?: dayjs.Dayjs | null;
  updateTime?: dayjs.Dayjs | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IBlog> = {
  enableComment: false,
  title: "",
  status: 0,
  viewCount: 0
};
