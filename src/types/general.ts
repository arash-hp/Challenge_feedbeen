import { Theme, SxProps as MUISxProps } from '@mui/material';

type SxProps = MUISxProps<Theme>;
export type SxRecord<T extends string> = Record<T, SxProps>;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
