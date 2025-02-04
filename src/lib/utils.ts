import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const wait = (duration: number) => {
	return new Promise((resolve) => setTimeout(resolve, duration));
};

export const dateIsBefore = (date: Date | string) => {
	const now = new Date();
	const candidateDate = typeof date === 'string' ? new Date(date) : date;
	return now < candidateDate;
};

export const isNotLastElement = (arr: any[] | undefined, index: number) => {
	if (!arr) {
		return false;
	}

	return index < arr.length - 1;
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const day = String(date.getDate());
	const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
	const year = String(date.getFullYear());

	return `${day} ${monthName} ${year}`;
};

export const isNilString = (val?: string) => {
	return val === undefined || val === null || val.trim() === '';
};

export const debounce = <T extends (...args: any[]) => any>(callback: T, delay: number): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
	let timeoutId: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>): Promise<ReturnType<T>> => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		return new Promise<ReturnType<T>>((resolve) => {
			timeoutId = setTimeout(() => {
				resolve(callback(...args));
			}, delay);
		});
	};
};

export const capitalize = (str: string) => {
	str = str.trim();

	if (str === '') return '';

	return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
