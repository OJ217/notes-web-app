import { IconLogout } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLogout } from '@/hooks';

export default function LogoutDialog({ children }: { children: React.ReactNode }) {
	const { logout } = useLogout();

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row gap-4'>
					<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100'>
						<IconLogout className='size-6' />
					</div>
					<div className='space-y-2'>
						<DialogTitle>Logout</DialogTitle>
						<DialogDescription>Are you sure you want to logout?</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className='space-x-4'>
					<DialogClose asChild>
						<Button type='button' variant={'secondary'} className='text-sm'>
							Cancel
						</Button>
					</DialogClose>
					<Button type='button' variant={'destructive'} onClick={logout} className='text-sm'>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
