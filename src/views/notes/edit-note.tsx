import { IconArchive, IconArrowLeft, IconDelete, IconTag } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';

export default function EditNote() {
	return (
		<div className='flex h-full flex-col gap-3'>
			<div className='flex items-center justify-between gap-4'>
				<Button className='text-neutral-600 hover:text-neutral-950' variant={'ghost'}>
					<IconArrowLeft className='size-4' />
					<span className='text-sm'>Go Back</span>
				</Button>
				<div className='flex items-center gap-4'>
					<Button variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<IconDelete />
					</Button>
					<Button variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<IconArchive />
					</Button>
					<Button variant={'ghost'} className='text-neutral-600 hover:text-neutral-950'>
						<span className='text-sm'>Cancel</span>
					</Button>
					<Button className='text-blue-500 hover:text-blue-700 focus-visible:ring-blue-700/50' variant={'ghost'}>
						<span className='text-sm'>Save Note</span>
					</Button>
				</div>
			</div>

			<Divider />

			<h1 className='text-2xl font-bold'>React Performance Optimization</h1>

			<div className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-1 text-sm text-neutral-700'>
				<div className='flex items-center gap-2'>
					<IconTag className='size-4' />
					<p>Tags</p>
				</div>

				<p>Dev, React</p>

				<div className='flex items-center gap-2'>
					<IconTag className='size-4' />
					<p>Last edited</p>
				</div>

				<p>29 Oct 2024</p>
			</div>

			<Divider />

			<textarea className='flex-grow resize-none outline-none' />
		</div>
	);
}
