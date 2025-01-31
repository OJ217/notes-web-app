import { To, useNavigate } from 'react-router';

import { IconArrowLeft } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function BackButton({ to, ...props }: React.ComponentProps<'button'> & { to: To }) {
	const navigate = useNavigate();

	return (
		<Button type='button' onClick={() => navigate(to)} {...props} className='text-neutral-600 hover:text-neutral-950' variant={'ghost'}>
			<IconArrowLeft className='size-4' />
			<span className='text-sm'>Go Back</span>
		</Button>
	);
}
