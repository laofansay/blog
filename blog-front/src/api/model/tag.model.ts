import dayjs from 'dayjs';

export interface ITag {
  id?: number;
  name?: string;
  icon?: string | null;
  linkUrl?: string | null;
  deleted?: boolean | null;
  createdTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ITag> = {
  deleted: false,
};
