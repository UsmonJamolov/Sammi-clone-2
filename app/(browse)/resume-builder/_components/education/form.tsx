import { Dispatch, SetStateAction, useEffect } from 'react';
import { Education } from '../resume.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationSchema } from '@/lib/validation';
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

interface EducationFormProps {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	selectedExperience: string | null;
	defaultVal: Education | undefined;
}

const EducationForm = ({
	isOpened,
	setIsOpened,
	selectedExperience,
	defaultVal,
}: EducationFormProps) => {
	const form = useForm<Education>({
		resolver: zodResolver(educationSchema),
		defaultValues: defaultVal,
	});

	const educations = useResume(state => state.educations);

	const onCreate = useResume(state => state.setEducations);
	const onEdit = useResume(state => state.updateEducation);

	useEffect(() => {
		form.reset(defaultVal);
	}, [defaultVal, form]);

	function onSubmit(data: Education) {
		if (selectedExperience) {
			onEdit(data.eduId, { ...data });
		} else {
			onCreate({ ...data, eduId: crypto.randomUUID(), position: educations.length + 1 });
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
								onSubmit={e => {
									e.preventDefault();
									onSubmit(form.getValues());
								}}
								className='space-y-2.5 w-full md:px-1 mb-2 md:mb-1 md:max-h-[80vh]'
							>
								<FormField
									control={form.control}
									name='institutionName'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<FormLabel className='font-geist_mono'>Institution Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='Harvard University'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='flex flex-col sm:flex-row sm:justify-between w-full gap-4'>
									<FormField
										control={form.control}
										name='degree'
										render={({ field }) => (
											<FormItem className='w-full space-y-0'>
												<FormLabel className='font-geist_mono'>Degree</FormLabel>
												<FormControl>
													<Input
														{...field}
														className='text-base bg-sidebar'
														placeholder='Bakalavr darajasi'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='fieldOfStudy'
										render={({ field }) => (
											<FormItem className='w-full space-y-0'>
												<FormLabel className='font-geist_mono'>Field of Study</FormLabel>
												<FormControl>
													<Input
														{...field}
														className='text-base bg-sidebar'
														placeholder='Kompyuter fanlari'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='flex flex-col sm:flex-row sm:justify-between w-full gap-4'>
									<FormField
										control={form.control}
										name='startDate'
										render={({ field }) => (
											<FormItem className='w-full space-y-0'>
												<FormLabel className='font-geist_mono'>Start Date</FormLabel>
												<FormControl>
													<Input className='text-base bg-sidebar' type='date' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='endDate'
										render={({ field }) => (
											<FormItem className='w-full space-y-0'>
												<FormLabel className='font-geist_mono items-center'>
													<span>End Date</span>
													<Hint label="If you're still studying, leave it empty">
														<Info className='size-3 ml-2 animate-pulse' />
													</Hint>
												</FormLabel>
												<FormControl>
													<Input className='text-base bg-sidebar' type='date' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem className='space-y-1'>
											<FormLabel className='font-geist_mono'>Description</FormLabel>
											<FormControl>
												<TextEditor value={field.value!} fieldName={field.name} />
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

export default EducationForm;
