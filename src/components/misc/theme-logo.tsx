import { cn } from '@/lib/utils';
import useThemeStore from '@/stores/theme-store';

export default function ThemeLogo({ className }: { className?: string }) {
	const colorThemeClass = useThemeStore((state) => state.theme.colorThemeClass);

	return <img src={colorThemeClass === 'light' ? '/logo.svg' : '/logo-dark.svg'} width={95} height={28} className={cn(className, 'text-red-500')} />;
}
