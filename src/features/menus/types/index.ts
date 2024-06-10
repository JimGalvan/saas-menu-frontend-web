import {BaseEntity} from '@/types';

export type Menu = {
    url: string;
    title: string;
    description: string | null;
    isActive: boolean;
    categories: string[];
} & BaseEntity;

export type CreateMenuDTO = {
    data: {
        title: string;
        description: string;
        isActive: boolean;
        logo: File | null;
    }
};