import { passwordFieldSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useSignUp } from '../store/use-sign-up';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropright } from 'react-icons/io';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { axiosClient } from '@/lib/http';
import ErrorAlert from '@/components/shared/error-alert';
import Spinner from '@/components/shared/spinner';

const PasswordField = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { setStep, user } = useSignUp();

	const form = useForm<z.infer<typeof passwordFieldSchema>>({
		resolver: zodResolver(passwordFieldSchema),
		defaultValues: { password: 'Success123!', confirmPassword: 'Success123!' },
	});

	async function onSubmit(values: z.infer<typeof passwordFieldSchema>) {
		setLoading(true);
		try {
			const payload = {
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
				password: values.password,
			};
			const { data } = await axiosClient.post('/api/auth/register', payload);
			if (data.success) {
				setStep('done');
			}
		} catch (e) {
			const result = e as Error;
			setError(result.message);
			setTimeout(() => {
				setError('');
			}, 4000);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					{error && <ErrorAlert message={error} />}

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
											disabled={loading}
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
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<Label>Confirm Password</Label>
								<FormControl className='relative'>
									<div>
										<Input
											placeholder='****'
											type={showConfirmPassword ? 'text' : 'password'}
											disabled={loading}
											{...field}
										/>
										{showConfirmPassword ? (
											<EyeOff
												className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer'
												onClick={() => setShowConfirmPassword(false)}
												role='button'
											/>
										) : (
											<Eye
												className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer'
												onClick={() => setShowConfirmPassword(true)}
												role='button'
											/>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full group' disabled={loading}>
						<span>Create account</span>
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

export default PasswordField;
