import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const GITHUB_IMAGE_BASE_URL = 'https://raw.githubusercontent.com/snakewolf-dev/snakewolf-media/main/images/';

export function getGitHubImageUrl(imageId: string | undefined | null): string {
  if (!imageId) {
    return '';
  }
  return `${GITHUB_IMAGE_BASE_URL}${imageId}`;
}
