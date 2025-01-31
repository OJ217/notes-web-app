import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme={'light'}
			className='toaster group'
			position='top-right'
			style={{ fontFamily: 'inherit' }}
			toastOptions={{
				classNames: {
					toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
					error: '[&_svg]:text-red-500',
					success: '[&_svg]:text-green-500',
					warning: '[&_svg]:text-amber-500',
					info: '[&_svg]:text-blue-500',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
