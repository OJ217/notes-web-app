import { useState } from 'react';
import { toast } from 'sonner';

import ThemeRadioGroup from '@/components/features/theme-radio-group';
import BackButton from '@/components/misc/back-button';
import { Button } from '@/components/ui/button';
import { FONT_THEME_OPTIONS } from '@/lib/constants';
import useThemeStore from '@/stores/theme-store';
import { FontTheme } from '@/types';

export default function FontThemeView() {
	const storedFontTheme = useThemeStore((state) => state.theme.fontTheme);
	const setFontTheme = useThemeStore((state) => state.setFontTheme);
	const [selectedFontTheme, setSelectedFontTheme] = useState<FontTheme>(storedFontTheme);

	const handleSetFontTheme = () => {
		setFontTheme(selectedFontTheme);

		toast.dismiss();
		toast.success('Font theme has been set');
	};

	return (
		<div className='space-y-5'>
			<div>
				<BackButton label='Settings' to='/settings' className='mb-3 lg:hidden' />

				<div className='space-y-1'>
					<h1 className='text-2xl font-bold'>Font Theme</h1>
					<p className='text-sm text-neutral-700'>Choose your font theme:</p>
				</div>
			</div>

			<ThemeRadioGroup value={selectedFontTheme} onChange={setSelectedFontTheme} options={FONT_THEME_OPTIONS} />

			<div className='flex justify-end'>
				<Button type='button' className='text-sm' disabled={storedFontTheme === selectedFontTheme} onClick={handleSetFontTheme}>
					Apply Changes
				</Button>
			</div>
		</div>
	);
}
