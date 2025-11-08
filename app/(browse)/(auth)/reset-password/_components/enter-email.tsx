import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useResetPassword } from '../store/use-reset-password';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { enterEmailSchema } from '@/lib/validation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropright } from 'react-icons/io';

const EnterEmail = () => {
	const { setStep, setEmail } = useResetPassword();

	const form = useForm<z.infer<typeof enterEmailSchema>>({
		resolver: zodResolver(enterEmailSchema),
		defaultValues: { email: 'john@gmail.com' },
	});

	function onSubmit(values: z.infer<typeof enterEmailSchema>) {
		setStep('verify-email');
		setEmail(values.email);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
	);
};

export default EnterEmail;