'use client';

import 'react-quill-new/dist/quill.snow.css';
import { createProjectLesson, updateLesson } from '@/actions/admin.action';
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
import { Separator } from '@/components/ui/separator';
import { lessonSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import dynamic from 'next/dynamic';
import { LessonType } from '@/types/app.type';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface CreateLessonModalProps {
	children: React.ReactNode;
	lessonId?: string;
	lessonData?: LessonType;
}

const CreateLessonModal = ({ children, lessonId, lessonData }: CreateLessonModalProps) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { id: courseId } = useParams<{ id: string }>();

	const form = useForm<z.infer<typeof lessonSchema>>({
		resolver: zodResolver(lessonSchema),
		defaultValues: { title: '', content: '', hours: '0', minutes: '0', videoId: '' },
	});

	async function onSubmit(values: z.infer<typeof lessonSchema>) {
		setLoading(true);
		try {
			if (lessonId) {
				await updateLesson(lessonId, { course: courseId, ...values });
			} else {
				await createProjectLesson({ course: courseId, ...values });
			}
			toast.success('Lesson created successfully');
			form.reset();
			setOpen(false);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (lessonData) {
			form.setValue('title', lessonData.title);
			form.setValue('content', lessonData.content);
			form.setValue('videoId', lessonData.videoId);
			form.setValue('hours', lessonData.hours.toString());
			form.setValue('minutes', lessonData.minutes.toString());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessonData, lessonId]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{lessonId ? 'Edit' : 'Create'} lesson</AlertDialogTitle>
					<AlertDialogDescription>
						Fill in the details below to {lessonId ? 'edit lesson' : 'create a new lesson'}. You can
						always edit these details later.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='gap-1'>
									<Label>Title</Label>
									<FormControl>
										<Input placeholder='Foundation' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='videoId'
							render={({ field }) => (
								<FormItem className='gap-1'>
									<Label>Video ID</Label>
									<FormControl>
										<Input placeholder='abc123' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem className='gap-1'>
									<Label>Content</Label>
									<FormControl>
										<ReactQuill
											theme='snow'
											modules={{
												toolbar: [
													['bold', 'italic', 'underline', 'strike', 'blockquote'],
													[{ list: 'ordered' }, { list: 'bullet' }],
													['link', 'image', 'video'],
													['clean'],
												],
											}}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-2 gap-4 mt-12'>
							<FormField
								control={form.control}
								name='hours'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Hours</Label>
										<FormControl>
											<Input placeholder='0' disabled={loading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='minutes'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>Minutes</Label>
										<FormControl>
											<Input placeholder='0' disabled={loading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end pt-4 gap-x-2'>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<Button type='submit' disabled={loading}>
								<span>{lessonId ? 'Update' : 'Create'}</span>
								{loading && <Spinner />}
							</Button>
						</div>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreateLessonModal;
