import { useEffect, useState, useRef, MutableRefObject } from 'react';

type IntersectionObserverOptions = {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
};

type UseIntersectionObserverReturn<T> = [MutableRefObject<T | null>, boolean];

export const useIntersectionObserver = <T extends Element>(options: IntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef<T | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		const currentTarget = targetRef.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [options]);

	return [targetRef, isIntersecting];
};
