import { Link, Outlet } from 'react-router';

import BottomNavigationBar from '@/components/features/bottom-navigation-bar';
import LinkCard from '@/components/features/link-card';
import SearchInput from '@/components/features/search-input';
import TagsList from '@/components/features/tags-list';
import PrivateRoute from '@/components/hoc/private-route';
import { IconArchive, IconHome, IconSettings } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { useHeaderTitle } from '@/hooks';
import { useLayoutStore } from '@/stores/layout-store';
import ThemeLogo from '@/components/misc/theme-logo';

export default function MainLayout() {
	const { isLarge } = useLayoutStore();

	return (
		<PrivateRoute>
			{isLarge ? (
				<MainDesktopLayout>
					<Outlet />
				</MainDesktopLayout>
			) : (
				<MainMobileLayout>
					<Outlet />
				</MainMobileLayout>
			)}
		</PrivateRoute>
	);
}

function MainMobileLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid h-screen grid-rows-[auto_1fr_auto]'>
			<header className='bg-background-300 px-4 py-3 md:px-8 md:py-4'>
				<Button asChild variant={'link'}>
					<Link to={'/notes'} className='inline-block'>
						<ThemeLogo />
					</Link>
				</Button>
			</header>
			<main className='bg-background overflow-y-scroll scroll-smooth rounded-t-2xl px-4 py-5 md:px-8 md:py-6'>{children}</main>
			<BottomNavigationBar />
		</div>
	);
}

function MainDesktopLayout({ children }: { children: React.ReactNode }) {
	const headerTitle = useHeaderTitle();

	return (
		<div className='grid h-screen grid-cols-[240px_1fr]'>
			<aside className='border-r-background-200 flex h-screen flex-col gap-2 border-r'>
				<div className='space-y-2 px-4 pt-6'>
					<div className='pb-5'>
						<Button asChild variant={'link'}>
							<Link to={'/notes'}>
								<ThemeLogo />
							</Link>
						</Button>
					</div>

					<div className='space-y-2'>
						<LinkCard link={'/notes'} label={'All Notes'} icon={IconHome} />
						<LinkCard link={'/archives'} label={'Archived Notes'} icon={IconArchive} />
					</div>

					<Divider />

					<h3 className='text-foreground-50 px-2.5 text-sm font-medium'>Tags</h3>
				</div>
				<TagsList className='grow space-y-2 overflow-y-auto px-4 pt-2 pb-6' />
			</aside>
			<div className='grid h-screen grid-rows-[auto_1fr]'>
				<header className='border-b-background-200 flex items-center justify-between gap-4 border-b px-8 py-5'>
					<h1 className='text-2xl font-bold'>{headerTitle}</h1>
					<div className='flex items-center gap-4'>
						<SearchInput className='w-[300px] bg-transparent' />

						<Button asChild size={'icon'} variant={'ghost'} className='with-transition text-foreground-50 size-9'>
							<Link to={'/settings'}>
								<IconSettings className='size' />
							</Link>
						</Button>
					</div>
				</header>
				<main className='min-h-0'>{children}</main>
			</div>
		</div>
	);
}
