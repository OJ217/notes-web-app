import TagsList from '@/components/features/tags-list';
import { useLayoutStore } from '@/stores/layout-store';

export default function TagsView() {
	const { isLarge } = useLayoutStore();

	if (!isLarge) {
		return (
			<div className='space-y-4'>
				<h1 className='text-2xl font-bold'>Tags</h1>
				<TagsList withDivider />
			</div>
		);
	}
}
