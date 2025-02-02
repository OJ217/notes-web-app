import { useEffect, useState } from 'react';

import { ColorThemeClass } from '@/types';

export const usePreferredColorScheme = () => {
	const [preferredColorScheme, setPreferredColorScheme] = useState<ColorThemeClass>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	useEffect(() => {
		const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

		const listener = (event: MediaQueryListEvent) => {
			setPreferredColorScheme(event.matches ? 'dark' : 'light');
		};

		mediaQueryList.addEventListener('change', listener);

		return () => {
			mediaQueryList.removeEventListener('change', listener);
		};
	}, []);

	return preferredColorScheme;
};
