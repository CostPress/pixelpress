import { apiGet } from './api';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export function getMenuItems() {
  return apiGet<MenuItem[]>('/api/menu');
}