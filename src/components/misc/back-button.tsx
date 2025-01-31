import { To, useNavigate } from 'react-router';

import { IconArrowLeft } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useNavigateBack } from '@/hooks';

export default function BackButton({ label = 'Go Back', to, ...props }: Omit<React.ComponentProps<'button'>, 'onClick'> & { label?: string; to?: To }) {
	const navigate = useNavigate();
	const navigateBack = useNavigateBack();

	return (
		<Button type='button' onClick={() => (to ? navigate(to) : navigateBack())} {...props} className='text-xs text-neutral-600 hover:text-neutral-950 md:text-sm' variant={'ghost'}>
			<IconArrowLeft className='size-4' />
			<span>{label}</span>
		</Button>
	);
}
