import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { IconSpinner } from '@/components/icons';

const buttonVariants = cva(
	'inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-lg font-medium transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-[1.5px] ring-offset-3 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-blue-500 text-white shadow hover:bg-blue-700 focus-visible:ring-blue-700/50',
				destructive: 'bg-red-500 text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline: 'border border-neutral-300 bg-white shadow-sm hover:bg-neutral-100 focus-visible:ring-neutral-200 focus-visible:bg-neutral-100',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'bg-transparent',
				icon: 'bg-transparent focus-visible:ring-neutral-300 rounded-md',
				link: 'text-primary underline-offset-4 hover:underline',
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
			{loading && <IconSpinner className='animate-spinner size-4' />}
			{props.children}
		</Comp>
	);
});
Button.displayName = 'Button';

export { Button };
