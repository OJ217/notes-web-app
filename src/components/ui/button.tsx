import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import LoadingSpinner from '@/components/misc/loading-spinner';

const buttonVariants = cva(
	'inline-flex ring-offset-transparent items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-lg font-medium with-transition text-sm focus-visible:outline-none focus-visible:ring-[1.5px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-blue-500 text-white shadow hover:bg-blue-700 focus-visible:ring-blue-700/50',
				destructive: 'bg-red-500 hover:bg-red-500/80 text-white shadow-sm focus-visible:ring-red-500/80',
				outline: 'border border-background-100 bg-background shadow-sm hover:bg-background-300 focus-visible:ring-background-200 focus-visible:bg-background-300',
				secondary: 'bg-background-300 text-foreground-100 shadow-sm hover:bg-background-200 focus-visible:ring-background-200',
				ghost: 'bg-transparent border-none rounded focus-visible:ring-background-100',
				icon: 'bg-transparent focus-visible:ring-background-100 rounded-md',
				link: 'underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-3',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'size-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
		compoundVariants: [
			{
				variant: 'ghost',
				className: 'h-auto p-0 ring-offset-1',
			},
			{
				variant: 'link',
				className: 'h-auto p-0 rounded-sm ring-foreground-100/50',
			},
		],
	},
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, fullWidth = false, loading = false, disabled, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			ref={ref}
			className={cn(buttonVariants({ variant, size, className }), {
				'w-full': fullWidth,
			})}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? <LoadingSpinner /> : props.children}
		</Comp>
	);
});
Button.displayName = 'Button';

export { Button };
