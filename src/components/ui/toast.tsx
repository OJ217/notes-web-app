import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme={'light'}
			position='top-right'
			style={{ fontFamily: 'inherit' }}
			toastOptions={{
				classNames: {
					toast: '!bg-background dark:!border-background-200 !shadow-lg !gap-3',
					title: '!text-foreground',
					description: '!text-foreground-100 !text-xs',
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
