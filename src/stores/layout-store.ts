import { create } from 'zustand';

type LayoutStoreState = {
	windowWidth: number;
	isSmall: boolean;
	isMedium: boolean;
	isLarge: boolean;
};

const breakpoints = { medium: 768, large: 1024 } as const;

export const useLayoutStore = create<LayoutStoreState>((set) => {
	const updateWindowWidth = (width: number) => {
		set({
			windowWidth: width,
			isSmall: width < breakpoints.medium,
			isMedium: width >= breakpoints.medium && width < breakpoints.large,
			isLarge: width >= breakpoints.large,
		});
	};

	updateWindowWidth(window.innerWidth);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => updateWindowWidth(window.innerWidth));
	}

	return {
		windowWidth: window.innerWidth,
		isSmall: window.innerWidth < breakpoints.medium,
		isMedium: window.innerWidth >= breakpoints.medium && window.innerWidth < breakpoints.large,
		isLarge: window.innerWidth >= breakpoints.large,
	};
});
