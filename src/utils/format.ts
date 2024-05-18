import { default as dayjs } from 'dayjs';

export const formatDate = (date: number | string) => dayjs(date).format('MMMM D, YYYY h:mm A');

export function formatPrice(price: string): string {
    const priceNumber = Number(price);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNumber);
}