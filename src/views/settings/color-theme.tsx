import { useState } from 'react';
import { toast } from 'sonner';

import ThemeRadioGroup from '@/components/features/theme-radio-group';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { COLOR_THEME_OPTIONS } from '@/lib/constants';
import useThemeStore from '@/stores/theme-store';
import { ColorTheme } from '@/types';

export default function ColorThemeView() {
	const storedColorTheme = useThemeStore((state) => state.theme.colorTheme);
	const setColorTheme = useThemeStore((state) => state.setColorTheme);
	const [selectedColorTheme, setSelectedColorTheme] = useState<ColorTheme>(storedColorTheme);

	const handleSetColorTheme = () => {
		setColorTheme(selectedColorTheme);

		toast.dismiss();
		toast.success('Color theme has been set');
	};

	return (
		<div className='space-y-5'>
			<div>
				<BackButton label='Settings' className='mb-3 lg:hidden' />

				<div className='space-y-1'>
					<h1 className='text-2xl font-bold'>Color Theme</h1>
					<p className='text-foreground-200 text-sm'>Choose your color theme:</p>
				</div>
			</div>

			<ThemeRadioGroup value={selectedColorTheme} onChange={setSelectedColorTheme} options={COLOR_THEME_OPTIONS} />

			<div className='flex justify-end'>
				<Button type='button' className='text-sm' disabled={storedColorTheme === selectedColorTheme} onClick={handleSetColorTheme}>
					Apply Changes
				</Button>
			</div>
		</div>
	);
}
