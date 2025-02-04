import * as React from 'react';

import { IconHide, IconShow } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { IconComponent } from '@/types';

const inputVariants = cva('', {
	variants: {
		variant: {
			default: cn(
				'block h-10 w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition-colors duration-300 ease-in-out focus-visible:ring-[1.5px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'placeholder:text-foreground-50 not-focus-within:hover:bg-background-300 focus-visible:border-background-50 focus-visible:ring-background-200 disabled:bg-background-300 border-background-100',
			),
			unstyled: 'p-0 transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 placeholder:text-foreground-50',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
	rightSection?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant = 'default', ...props }, ref) => {
	return <input type={type} className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps & { icon: IconComponent }>(({ className, icon: IconComponent, ...props }, ref) => {
	const [inputFocused, setInputFocused] = React.useState<boolean>(false);

	return (
		<div
			className={cn(
				'with-transition flex h-10 w-full items-center gap-3 rounded-lg border px-4 text-sm shadow-sm focus-within:outline-none aria-disabled:cursor-not-allowed',
				'placeholder:text-foreground-50 border-background-100 not-focus-within:hover:bg-background-300 aria-disabled:bg-background-300',
				{ 'focus-within:border-background-50 focus-within:ring-background-200 focus-within:ring-[1.5px]': inputFocused },
				className,
			)}
		>
			<IconComponent className='text-foreground-50 size-5 shrink-0' />
			<input
				ref={ref}
				{...props}
				onBlur={() => setInputFocused(false)}
				onFocus={() => setInputFocused(true)}
				className={cn(inputVariants({ variant: 'unstyled' }), 'h-full flex-grow text-sm')}
			/>
		</div>
	);
});
InputWithIcon.displayName = 'InputWithIcon';

const PasswordInput = React.forwardRef<HTMLInputElement, Exclude<InputProps, 'type'>>(({ className, ...props }, ref) => {
	const [type, setType] = React.useState<'password' | 'text'>('password');
	const [inputFocused, setInputFocused] = React.useState<boolean>(false);

	return (
		<div
			aria-disabled={props.disabled}
			className={cn(
				'flex h-10 w-full items-center rounded-lg border pr-2 pl-4 text-sm shadow-sm transition-colors duration-300 ease-in-out focus-within:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
				'placeholder:text-foreground-50 border-background-100 not-focus-within:hover:bg-background-300 aria-disabled:bg-background-300',
				{ 'focus-within:border-background-50 focus-within:ring-background-200 focus-within:ring-[1.5px]': inputFocused },
				className,
			)}
		>
			<input type={type} ref={ref} {...props} onBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='placeholder:text-foreground-50 h-full w-full outline-none' />
			<Button
				type='button'
				variant={'icon'}
				size={'icon'}
				className='text-foreground-50 shrink-0'
				disabled={props.disabled}
				onClick={() => {
					setType(type === 'password' ? 'text' : 'password');
				}}
			>
				{type === 'password' ? <IconShow className='size-5' /> : <IconHide className='size-5' />}
			</Button>
		</div>
	);
});
PasswordInput.displayName = 'PasswordInput';

export { Input, InputWithIcon, PasswordInput };
