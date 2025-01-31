import React from 'react';

import LinkCard from '@/components/features/link-card';
import Divider from '@/components/ui/divider';
import { isNotLastElement } from '@/lib/utils';
import { useUserTagsQuery } from '@/services/user-service';
import { IconTag } from '@/components/icons';

export default function TagsView() {
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Tags</h1>
			<TagsList />
		</div>
	);
}

function TagsList() {
	const { data: tags, isPending, isError } = useUserTagsQuery();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	return (
		<div className='space-y-2'>
			{tags.map(({ tag }, index) => (
				<React.Fragment key={tag}>
					<LinkCard link={`/tags/${tag}`} label={tag} icon={IconTag} />
					{isNotLastElement(tags, index) && <Divider />}
				</React.Fragment>
			))}
		</div>
	);
}
