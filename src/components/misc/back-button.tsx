import { IconArrowLeft } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useNavigateBack } from '@/hooks';
import { cn } from '@/lib/utils';

export default function BackButton({ label = 'Go Back', className, ...props }: Omit<React.ComponentProps<'button'>, 'onClick'> & { label?: string }) {
	const navigateBack = useNavigateBack();

	return (
		<Button type='button' onClick={navigateBack} {...props} className={cn('hover:text-foreground text-foreground-100 text-xs md:text-sm', className)} variant={'ghost'}>
			<IconArrowLeft className='size-4' />
			<span>{label}</span>
		</Button>
	);
}
