import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeProfileSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IoMdArrowDropright } from 'react-icons/io';
import { useSignUp } from '../store/use-sign-up';
import { useState } from 'react';
import { axiosClient } from '@/lib/http';
import ErrorAlert from '@/components/shared/error-alert';
import Spinner from '@/components/shared/spinner';

const CompleteProfile = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { setStep, setUser } = useSignUp();

	const form = useForm<z.infer<typeof completeProfileSchema>>({
		resolver: zodResolver(completeProfileSchema),
		defaultValues: { email: 'sammibadriddinov@gmail.com', firstName: 'John', lastName: 'Doe' },
	});

	async function onSubmit(values: z.infer<typeof completeProfileSchema>) {
		setLoading(true);
		try {
			const { data } = await axiosClient.post('/api/otp/send', { email: values.email });
			if (data.success) {
				setStep('verify-email');
				setUser(values);
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					{error && <ErrorAlert message={error} />}

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<Label>First Name</Label>
									<FormControl>
										<Input placeholder='John' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<Label>Last Name</Label>
									<FormControl>
										<Input placeholder='Doe' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<Label>Email address</Label>
								<FormControl>
									<Input placeholder='john.doe@example.com' disabled={loading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full group' disabled={loading}>
						<span>Continue</span>
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

export default CompleteProfile;
