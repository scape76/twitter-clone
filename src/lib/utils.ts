import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserLiterals(name?: string | null) {
  return name
    ?.split(" ")
    .map((s) => s[0])
    .join("");
}

export function updateImageUrl(profileImgUrl: string, number: number): string {
  const parts = profileImgUrl.split("=");
  const newUrl = `${parts?.[0] ?? ""}=s${number}-c`;
  return newUrl;
}
