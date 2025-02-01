import { Link, Outlet } from 'react-router';

import BottomNavigationBar from '@/components/features/bottom-navigation-bar';
import LinkCard from '@/components/features/link-card';
import TagsList from '@/components/features/tags-list';
import PrivateRoute from '@/components/hoc/private-route';
import { IconArchive, IconHome, IconSearch, IconSettings } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { InputWithIcon } from '@/components/ui/input';
import { useResponsiveLayout } from '@/hooks';

export default function MainLayout() {
	const { isLarge } = useResponsiveLayout();

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
			<header className='bg-neutral-100 px-4 py-3 md:px-8 md:py-4'>
				<img src='/logo.svg' width={95} height={28} />
			</header>
			<main className='overflow-y-scroll scroll-smooth rounded-t-2xl bg-white px-4 py-5 md:px-8 md:py-6'>{children}</main>
			<BottomNavigationBar />
		</div>
	);
}

function MainDesktopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid h-screen grid-cols-[240px_1fr]'>
			<aside className='flex h-screen flex-col gap-2 border-r border-r-neutral-200'>
				<div className='space-y-2 px-4 pt-6'>
					<div className='pb-5'>
						<img src='/logo.svg' width={95} height={28} />
					</div>

					<div className='space-y-2'>
						<LinkCard link={'/notes'} label={'All Notes'} icon={IconHome} />
						<LinkCard link={'/archives'} label={'Archived Notes'} icon={IconArchive} />
					</div>

					<Divider />

					<h3 className='px-2.5 text-sm font-medium text-neutral-500'>Tags</h3>
				</div>

				<TagsList className='grow space-y-2 overflow-y-auto px-4 pt-2 pb-6' />
			</aside>
			<div className='grid h-screen grid-rows-[auto_1fr]'>
				<header className='flex items-center justify-between gap-4 border-b border-b-neutral-200 px-8 py-5'>
					<h1 className='text-2xl font-bold'>All Notes</h1>
					<div className='flex items-center gap-4'>
						<InputWithIcon icon={IconSearch} placeholder='Search by title or content' className='w-[300px] bg-transparent' />
						<Button asChild size={'icon'} variant={'ghost'} className='with-transition size-9 text-neutral-500'>
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
