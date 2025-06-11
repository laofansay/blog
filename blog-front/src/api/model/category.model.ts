import dayjs from 'dayjs';

export interface ICategory {
  id?: number;
  name?: string;
  icon?: string | null;
  rank?: number | null;
  status?: number | null;
  orderNum?: number | null;
  createdTime?: dayjs.Dayjs | null; 
  updatedTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ICategory> = {
  status: 0,
};
