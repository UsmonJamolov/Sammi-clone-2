'use client';

import { createCourse } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const CreateCourseModal = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: { category: '', level: '', slug: '', title: '' },
	});

	async function onSubmit(values: z.infer<typeof createCourseSchema>) {
		setLoading(true);
		try {
			await createCourse({ ...values, type: 'project' });
			toast.success('Project created successfully');
			form.reset();
			setOpen(false);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size={'sm'}>Create Project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create project</AlertDialogTitle>
					<AlertDialogDescription>
						Fill in the details below to create a new project. You can always edit these details
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
											<Input placeholder='Next.js 15' disabled={loading} {...field} />
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
											<Input placeholder='nextjs' disabled={loading} {...field} />
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
										<Select
											onValueChange={field.onChange}
											disabled={loading}
											defaultValue={field.value}
										>
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
										<Select
											onValueChange={field.onChange}
											disabled={loading}
											defaultValue={field.value}
										>
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
							<Button type='submit' disabled={loading}>
								<span>Submit</span>
								{loading && <Spinner />}
							</Button>
						</div>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreateCourseModal;