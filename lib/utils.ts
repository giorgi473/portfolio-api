import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string, width = 800) {
  if (!url.includes("res.cloudinary.com")) return url;
  
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;
  
  return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`;
}
