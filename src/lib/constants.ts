import { To } from 'react-router';

import { IconArchive, IconHome, IconSearch, IconSettings, IconTag } from '@/components/icons';
import { IconComponent } from '@/types';

export const BOTTOM_NAVIGATION_LINKS: { label: string; icon: IconComponent; link: To }[] = [
	{ label: 'Home', icon: IconHome, link: '/notes' },
	{ label: 'Search', icon: IconSearch, link: '/search' },
	{ label: 'Archived', icon: IconArchive, link: '/archives' },
	{ label: 'Tags', icon: IconTag, link: '/tags' },
	{ label: 'Settings', icon: IconSettings, link: '/settings' },
];
