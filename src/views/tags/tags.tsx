import TagsList from '@/components/features/tags-list';

export default function TagsView() {
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Tags</h1>
			<TagsList withDivider />
		</div>
	);
}
