'use client';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { createCourseSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const CreateCourseModal = () => {
	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof createCourseSchema>) {
		console.log(values);
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size={'sm'}>Create Course</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create course</AlertDialogTitle>
					<AlertDialogDescription>
						Fill in the details below to create a new course. You can always edit these details
						later.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Title</Label>
										<FormControl>
											<Input placeholder='Next.js 15' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='slug'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Slug</Label>
										<FormControl>
											<Input placeholder='nextjs' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='level'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Level</Label>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select a category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='BEGINNER'>Beginner</SelectItem>
												<SelectItem value='INTERMEDIATE'>Intermediate</SelectItem>
												<SelectItem value='ADVANCED'>Advanced</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Category</Label>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select a category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='FRONT-END'>Front-End</SelectItem>
												<SelectItem value='BACK-END'>Back-End</SelectItem>
												<SelectItem value='FULL-STACK'>Full-Stack</SelectItem>
												<SelectItem value='MOBILE'>Mobile</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end pt-4 gap-x-2'>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<Button type='submit'>Submit</Button>
						</div>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreateCourseModal;