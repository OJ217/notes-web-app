import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

export function dateIsBefore(date: Date | string) {
	const now = new Date();
	const candidateDate = typeof date === 'string' ? new Date(date) : date;
	return now < candidateDate;
}

export function isNotLastElement(arr: any[] | undefined, index: number): boolean {
	if (!arr) {
		return false;
	}

	return index < arr.length - 1;
}

export function formatDate(dateString: string) {
	const date = new Date(dateString);

	const day = String(date.getDate());
	const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
	const year = String(date.getFullYear());

	return `${day} ${monthName} ${year}`;
}

export function isNilString(val?: string) {
	return val === undefined || val === null || val.trim() === '';
}
