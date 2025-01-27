import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const dateIsBefore = (date: Date | string) => {
	const now = new Date();
	const candidateDate = typeof date === 'string' ? new Date(date) : date;
	return now < candidateDate;
};
