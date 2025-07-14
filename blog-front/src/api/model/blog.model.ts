import dayjs from "dayjs";
import { BlogStatus } from "@/api/model/enumerations/blog-status.model";
import { ICategory } from "./category.model";

export interface IBlog {
  id?: number;
  title?: string;
  subTitle?: string;
  summary?: string;
  tags?: string[] | [];
  url?: string | null;
  coverImage?: string;
  coverAlt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  content?: string;
  status?: BlogStatus;
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
  status: BlogStatus.DRAFT,
  viewCount: 0
};
