import dayjs from 'dayjs';

export interface ITag {
  id?: number;
  name?: string;
  code?: string;
  icon?: string | null;
  status?: number | null;
  createdTime?: dayjs.Dayjs | null;
  updatedTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ITag> = {
  status: 0,
};
