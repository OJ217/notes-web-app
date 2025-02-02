import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn('flex items-center justify-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
		className={cn('disabled:cursor-not-allowed', className)}
		{...props}
	/>
));
InputOTP.displayName = 'InputOTP';

const InputOTPSlot = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'> & { index: number }>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				'with-transition relative flex aspect-square w-full max-w-12 items-center justify-center rounded-md border border-neutral-300 shadow-sm',
				isActive && 'z-10 ring-[1.5px] ring-neutral-800',
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = 'InputOTPSlot';

export { InputOTP, InputOTPSlot };
