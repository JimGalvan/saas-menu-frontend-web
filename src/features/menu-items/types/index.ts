import {BaseEntity} from '@/types';

export type MenuItem = {
    url: string;
    name: string;
    description: string | null;
    price: string;
    image: string | null;
    menu: string;
    menuName: string;
    category: string;
    categoryName: string;
    createdAt: string;
    modifiedAt: string;
} & BaseEntity;