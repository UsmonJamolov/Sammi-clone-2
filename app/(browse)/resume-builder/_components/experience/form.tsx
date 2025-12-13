import { Dispatch, SetStateAction, useEffect } from 'react';
import { Experience } from '../resume.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceSchema } from '@/lib/validation';
import { useResume } from '../use-resume.store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Hint from '@/components/shared/hint';
import { Info } from 'lucide-react';
import TextEditor from '@/components/shared/text-editor';
import { Button } from '@/components/ui/button';

interface ExperienceFormProps {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	selectedExperience: string | null;
	defaultVal: Experience | undefined;
}

const ExperienceForm = ({
	defaultVal,
	isOpened,
	selectedExperience,
	setIsOpened,
}: ExperienceFormProps) => {
	const form = useForm<Experience>({
		resolver: zodResolver(experienceSchema),
		defaultValues: defaultVal,
	});

	const experiences = useResume(state => state.experiences);

	const onCreate = useResume(state => state.setExperiences);
	const onEdit = useResume(state => state.updateExperience);

	useEffect(() => {
		form.reset(defaultVal);
	}, [defaultVal, form]);

	function onSubmit(data: Experience) {
		if (selectedExperience) {
			onEdit(data.expId, { ...data });
		} else {
			onCreate({ ...data, expId: crypto.randomUUID(), position: experiences.length + 1 });
		}
		setIsOpened(false);
	}

	return (
		<div className='max-w-[550px]'>
			<Dialog open={isOpened} onOpenChange={val => setIsOpened(val)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Experience</DialogTitle>
					</DialogHeader>

					<div className='px-4 md:px-0 max-h-screen overflow-y-scroll'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='w-full md:px-1 mb-2 md:mb-1 grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-4 md:max-h-[80vh]'
							>
								<FormField
									control={form.control}
									name='company'
									render={({ field }) => (
										<FormItem className='col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Company Name</FormLabel>
											<FormControl>
												<Input {...field} className='text-base bg-sidebar' placeholder='Sammi' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='role'
									render={({ field }) => (
										<FormItem className='w-full col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Role</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='Frontend Developer'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='location'
									render={({ field }) => (
										<FormItem className='col-span-2 space-y-0'>
											<FormLabel className='font-geist_mono'>Location</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Toshkent' className='text-base bg-sidebar' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='startDate'
									render={({ field }) => (
										<FormItem className='w-full col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Start Date</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder=''
													type='date'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='endDate'
									render={({ field }) => (
										<FormItem className='w-full col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono items-center'>
												<span>End Date</span>
												<Hint label="If you're currently working here, leave it empty">
													<Info className='size-3 ml-2 animate-pulse' />
												</Hint>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder=''
													className='text-base bg-sidebar'
													type='date'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem className='col-span-2 space-y-0'>
											<FormLabel className='font-geist_mono'>Description</FormLabel>
											<FormControl>
												<TextEditor value={field.value!} fieldName='description' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' className='w-full rounded-full col-span-2' size={'lg'}>
									Save
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ExperienceForm;
