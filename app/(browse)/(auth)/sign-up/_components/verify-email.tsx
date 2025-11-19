import { useForm } from 'react-hook-form';
import { useSignUp } from '../store/use-sign-up';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropright } from 'react-icons/io';
import { useState } from 'react';
import { axiosClient } from '@/lib/http';
import ErrorAlert from '@/components/shared/error-alert';
import Spinner from '@/components/shared/spinner';
import { CheckCircle, RotateCcw } from 'lucide-react';

const VerifyEmail = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isExpired, setIsExpired] = useState(true);
	const [message, setMessage] = useState('');

	const { user, setStep } = useSignUp();

	const form = useForm<z.infer<typeof verifyEmailSchema>>({
		resolver: zodResolver(verifyEmailSchema),
		defaultValues: { code: '123456' },
	});

	async function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
		setLoading(true);
		try {
			const { data } = await axiosClient.post('/api/otp/verify', {
				email: user?.email,
				otp: values.code,
			});
			if (data.success) {
				setStep('password-field');
			}
		} catch (e) {
			const result = e as Error;
			setError(result.message);
			setIsExpired(true);
			setTimeout(() => {
				setError('');
			}, 4000);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}

	async function handleResend() {
		setLoading(true);
		try {
			const { data } = await axiosClient.post('/api/otp/send', { email: user?.email });
			if (data.success) {
				setIsExpired(false);
				setMessage('A new code has been sent to your email.');
				setTimeout(() => {
					setMessage('');
				}, 4000);
			}
		} catch (e) {
			const result = e as Error;
			setError(result.message);
			setTimeout(() => {
				setError('');
			}, 4000);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4 mt-6'>
					{error && <ErrorAlert message={error} />}

					{message && (
						<div className='w-full border border-primary/50 border-dashed bg-primary/10 rounded-lg p-4'>
							<div className='flex items-center gap-2 text-sm'>
								<CheckCircle className='text-primary' />
								<p className='font-space-grotesk font-semibold'>{message}</p>
							</div>
						</div>
					)}

					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<Label>One-Time Password</Label>
								<FormControl>
									<InputOTP maxLength={6} disabled={loading} {...field}>
										<InputOTPGroup className='w-full'>
											<InputOTPSlot index={0} className='w-full' />
											<InputOTPSlot index={1} className='w-full' />
											<InputOTPSlot index={2} className='w-full' />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup className='w-full'>
											<InputOTPSlot index={3} className='w-full' />
											<InputOTPSlot index={4} className='w-full' />
											<InputOTPSlot index={5} className='w-full' />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{isExpired && (
						<div className='flex justify-end'>
							<Button
								variant={'link'}
								size={'sm'}
								type='button'
								onClick={handleResend}
								disabled={loading}
							>
								<span>Resend Code</span>
								{loading ? <Spinner /> : <RotateCcw className='size-4' />}
							</Button>
						</div>
					)}

					<Button type='submit' className='w-full group' disabled={loading}>
						<span>Confirm</span>
						{loading ? (
							<Spinner />
						) : (
							<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
						)}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default VerifyEmail;