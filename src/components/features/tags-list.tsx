import React from 'react';

import LinkCard from '@/components/features/link-card';
import { IconTag } from '@/components/icons';
import Divider from '@/components/ui/divider';
import { cn, isNotLastElement } from '@/lib/utils';
import { useUserTagsQuery } from '@/services/user-service';

export default function TagsList({ className, withDivider = false }: { className?: string; withDivider?: boolean }) {
	const { data: tags, isPending, isError } = useUserTagsQuery();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error has occured</div>;
	}

	return (
		<div className={cn('space-y-2', className)}>
			{tags.map(({ tag }, index) => (
				<React.Fragment key={tag}>
					<LinkCard link={`/tags/${tag}`} label={tag} icon={IconTag} />
					{withDivider && isNotLastElement(tags, index) && <Divider />}
				</React.Fragment>
			))}
		</div>
	);
}
