import { cookies } from "next/headers";

export function getRandomFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

export const setStorageValue = (key: string, value: string) => {
  if (typeof window === "undefined") {
    return false;
  }
  localStorage.setItem(key, value);
  return true;
};

export const getStorageValue = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};


