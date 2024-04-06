// src/hooks/useItemList.ts
import { useQuery } from '@tanstack/react-query';
import { MenuItemsService } from '../services/MenuItemsService.ts';

const useItemList = () => {
    const { data, isLoading, error } = useQuery(
        {queryKey:['items'], queryFn:MenuItemsService.list}
    );

    return {
        items: data?.data,
        isLoading,
        error,
    };
};

export default useItemList;
