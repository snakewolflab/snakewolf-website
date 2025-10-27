import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const GITHUB_ASSETS_BASE_URL = 'https://raw.githubusercontent.com/snakewolflab/snakewolf-website/refs/heads/assets/';

export function getGitHubImageUrl(imageId: string | undefined | null, slug?: string | undefined | null): string {
  if (!imageId) {
    return '';
  }
  if (slug) {
    return `${GITHUB_ASSETS_BASE_URL}${slug}/${imageId}`;
  }
  return `${GITHUB_ASSETS_BASE_URL}${imageId}`;
}
