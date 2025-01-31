import { IconPlus } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router';

export default function NewNoteCircularButton() {
	return (
		<Button asChild className='fixed right-4 bottom-[73px] size-12 rounded-full ring-offset-transparent md:bottom-[101px] md:size-16'>
			<Link to={'/notes/new'}>
				<IconPlus className='size-8' />
			</Link>
		</Button>
	);
}
