import * as React from 'react';

import { IconHide, IconShow } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { IconComponent } from '@/types';

const inputVariants = cva('', {
	variants: {
		variant: {
			default:
				'block h-10 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm shadow-sm ring-offset-3 transition-colors duration-300 ease-in-out placeholder:text-neutral-500 not-focus-within:hover:bg-neutral-100 focus-visible:border-neutral-400 focus-visible:ring-[1.5px] focus-visible:ring-neutral-200 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 md:text-sm',
			unstyled: 'p-0 transition-opacity duration-300 ease-in-out outline-none disabled:opacity-50 placeholder:text-neutral-500',
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
				'with-transition flex h-10 w-full items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-4 text-sm shadow-sm ring-offset-3 focus-within:outline-none not-focus-within:hover:bg-neutral-100 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:opacity-50',
				{ 'focus-within:border-neutral-400 focus-within:ring-[1.5px] focus-within:ring-neutral-200': inputFocused },
				className,
			)}
		>
			<IconComponent className='size-5 shrink-0 text-neutral-500' />
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
				'flex h-10 w-full items-center rounded-lg border border-neutral-300 bg-white pr-2 pl-4 text-sm shadow-sm ring-offset-3 transition-colors duration-300 ease-in-out focus-within:outline-none not-focus-within:hover:bg-neutral-100 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:opacity-50 md:text-sm',
				{ 'focus-within:border-neutral-400 focus-within:ring-[1.5px] focus-within:ring-neutral-200': inputFocused },
				className,
			)}
		>
			<input type={type} ref={ref} {...props} onBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='h-full w-full outline-none placeholder:text-neutral-500' />
			<Button
				type='button'
				variant={'icon'}
				size={'icon'}
				className='shrink-0 text-neutral-500'
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
