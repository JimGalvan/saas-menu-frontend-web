import { BaseEntity } from '@/types';

export type MenuItem = {
  url: string;
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  menu: string;
  category: string;
  categoryName: string;
} & BaseEntity;
