import { useState, useEffect } from 'react';

export const useResponsiveLayout = (breakpoints = { medium: 768, large: 1024 }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const updateWindowWidth = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', updateWindowWidth);

		return () => {
			window.removeEventListener('resize', updateWindowWidth);
		};
	}, []);

	const isSmall = windowWidth < breakpoints.medium;
	const isMedium = windowWidth >= breakpoints.medium && windowWidth < breakpoints.large;
	const isLarge = windowWidth >= breakpoints.large;

	return {
		isSmall,
		isMedium,
		isLarge,
	};
};
