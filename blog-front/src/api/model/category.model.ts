import dayjs from 'dayjs';

export interface ICategory {
  id?: number;
  name?: string;
  icon?: string | null;
  rank?: number | null;
  deleted?: boolean | null;
  createdTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ICategory> = {
  deleted: false,
};
