import {BaseEntity} from '@/types';

export type Menu = {
    url: string;
    title: string;
    description: string | null;
    isActive: boolean;
    categories: string[];
} & BaseEntity;

