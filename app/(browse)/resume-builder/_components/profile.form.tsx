'use client';

import { useForm } from 'react-hook-form';
import SectionHeading from './section-heading';
import { useResume } from './use-resume.store';
import { Profile } from './resume.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/validation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import useFormField from './use-form-field';

const ProfileForm = () => {
	const { profile } = useResume();

	const form = useForm<Profile>({
		resolver: zodResolver(profileSchema),
		defaultValues: profile,
	});

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='General' icon='publication' />

			<Form {...form}>
				<form className='grid gap-y-2 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full mt-4'>
					<ProfileFormField
						name='name'
						control={form.control}
						placeholder='Omar Osman'
						label='Full Name'
					/>
					<ProfileFormField
						name='email'
						control={form.control}
						placeholder='example@gmail.com'
						label='Email Address'
					/>
					<ProfileFormField
						name='phone'
						control={form.control}
						placeholder='+998(97)123-45-67'
						label='Mobile Number'
					/>
					<ProfileFormField
						name='linkedin'
						control={form.control}
						placeholder='linkedin.com/username'
						label='LinkedIn'
					/>
					<ProfileFormField
						name='github'
						control={form.control}
						placeholder='github.com/username'
						label='GitHub'
					/>
					<ProfileFormField
						name='website'
						control={form.control}
						placeholder='example.com'
						label='Portfolio'
					/>
					<ProfileFormField
						name='address'
						control={form.control}
						placeholder='Tashkent, Uzbekistan'
						label='Address'
					/>
					<ProfileFormField
						name='role'
						control={form.control}
						placeholder='Software Engineer'
						label='Job Title'
					/>
					<ProfileFormField
						name='summary'
						control={form.control}
						placeholder="O'zingiz haqingizda qisqacha"
						inputType='textarea'
						className='col-span-1 sm:col-span-2 md:mb-0 md:col-span-1 lg:col-span-2'
						label='Summary (About Yourself)'
					/>
				</form>
			</Form>
		</section>
	);
};

export default ProfileForm;

interface ProfileFormFieldProps {
	name: keyof Profile;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	placeholder: string;
	inputType?: 'textarea' | 'text';
	className?: string;
	label: string;
}

const ProfileFormField = (props: ProfileFormFieldProps) => {
	const { name, control, placeholder, inputType, className, label } = props;

	const { field, error } = useFormField({ name, control });

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem className={`${className} gap-0.5`}>
					<FormLabel className='font-geist_mono text-sm'>{label}</FormLabel>
					<FormControl>
						{
							{
								textarea: (
									<Textarea
										{...field}
										placeholder={placeholder}
										className='h-32 resize-none bg-sidebar'
									/>
								),
								text: (
									<Input
										{...field}
										placeholder={placeholder}
										type='text'
										className='w-full rounded-lg bg-sidebar'
									/>
								),
							}[inputType || 'text']
						}
					</FormControl>
					<FormMessage>{error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
};
