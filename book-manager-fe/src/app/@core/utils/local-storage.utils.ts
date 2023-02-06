import { StorageItem } from './storage.enums';

export const getItem = (itemName: string): unknown | null => {
  const item = sessionStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: string, value: unknown): void => {
  sessionStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  sessionStorage.removeItem(itemName);
};
