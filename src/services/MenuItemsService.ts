import axios from 'axios';

const API_URL = 'http://localhost:8000/api/items/';

export const MenuItemsService = {
    list: () => axios.get(API_URL),
    get: (id: string) => axios.get(`${API_URL}/${id}`),
    create: (data: any) => axios.post(API_URL, data),
    update: (id: string, data: any) => axios.put(`${API_URL}/${id}`, data),
    delete: (id: string) => axios.delete(`${API_URL}/${id}`),
};

export default MenuItemsService;