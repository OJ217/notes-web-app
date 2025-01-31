import { useCallback, useRef } from 'react';

type Callback = (...args: any[]) => void;

export const useDebouncedCallback = <T extends Callback>(callback: T, delay: number): ((...args: Parameters<T>) => void) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
};
