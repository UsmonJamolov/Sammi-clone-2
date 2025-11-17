'use client';

import ErrorAlert from '@/components/shared/error-alert';
import Reveal from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { axiosClient } from '@/lib/http';
import { signInSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdArrowDropright } from 'react-icons/io';
import z from 'zod';

const SignInForm = () => {
	const [needsPassword, setNeedsPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	const schema = useMemo(() => signInSchema(needsPassword), [needsPassword]);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { email: '', password: '' },
	});

	const handleCheckEmail = async () => {
		setError('');

		const isValid = await form.trigger('email');
		if (!isValid) return;

		try {
			const { data } = await axiosClient.post('/api/auth/verify-email', {
				email: form.getValues('email'),
			});
			if (data.success) {
				setNeedsPassword(true);
			}
		} catch (error) {
			const result = error as Error;
			setError(result.message);
			setTimeout(() => {
				setError('');
			}, 2000);
		}
	};

	const onSubmit = async (values: z.infer<typeof schema>) => {
		const { email, password } = values;
		if (!email || !password) return;

		try {
			const { data } = await axiosClient.post('/api/auth/login', values);
			if (data.success) {
				signIn('credentials', { userId: data.user._id, callbackUrl: '/dashboard' });
			}
		} catch (error) {
			const result = error as Error;
			setError(result.message);
			setTimeout(() => {
				setError('');
			}, 2000);
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					{error && <ErrorAlert message={error} />}

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<Label>Email address</Label>
								<FormControl>
									<Input
										placeholder='john.doe@example.com'
										onKeyDown={e => {
											if (e.key === 'Enter') {
												handleCheckEmail();
											}
										}}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{!needsPassword && (
						<Button type='button' className='w-full group' onClick={handleCheckEmail}>
							<span>Continue</span>
							<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
						</Button>
					)}

					{needsPassword && (
						<Reveal>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<Label>Password</Label>
										<FormControl className='relative'>
											<div>
												<Input
													placeholder='****'
													type={showPassword ? 'text' : 'password'}
													{...field}
												/>
												{showPassword ? (
													<EyeOff
														className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer'
														onClick={() => setShowPassword(false)}
														role='button'
													/>
												) : (
													<Eye
														className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer'
														onClick={() => setShowPassword(true)}
														role='button'
													/>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full group mt-4'>
								<span>Continue</span>
								<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Reveal>
					)}
				</form>
			</Form>
		</>
	);
};

export default SignInForm;