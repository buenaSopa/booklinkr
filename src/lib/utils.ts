import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformString(input: string): string {
	const words = input.trim().split(/\s+/);
	const transformedString = words.join('+');

	return transformedString;
}

