import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeProfileSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { IoMdArrowDropright } from 'react-icons/io';
import { useSignUp } from '../store/use-sign-up';

const CompleteProfile = () => {
	const { setStep, setUser } = useSignUp();

	const form = useForm<z.infer<typeof completeProfileSchema>>({
		resolver: zodResolver(completeProfileSchema),
		defaultValues: { email: 'john@gmail.com', firstName: 'John', lastName: 'Doe' },
	});

	function onSubmit(values: z.infer<typeof completeProfileSchema>) {
		setStep('verify-email');
		setUser(values);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<Label>First Name</Label>
									<FormControl>
										<Input placeholder='John' {...field} />
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
										<Input placeholder='Doe' {...field} />
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
									<Input placeholder='john.doe@example.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full group'>
						<span>Continue</span>
						<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
					</Button>
				</form>
			</Form>
		</>
	);
};

export default CompleteProfile;