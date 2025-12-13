'use client';

import { createSection } from '@/actions/admin.action';
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
import { sectionSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const CreateSectionModal = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { id: courseId } = useParams<{ id: string }>();

	const form = useForm<z.infer<typeof sectionSchema>>({
		resolver: zodResolver(sectionSchema),
		defaultValues: { title: '' },
	});

	async function onSubmit(values: z.infer<typeof sectionSchema>) {
		setLoading(true);
		try {
			await createSection({ course: courseId, title: values.title });
			toast.success('Section created successfully');
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
				<Button size={'sm'}>
					<span>Add</span>
					<Plus />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create section</AlertDialogTitle>
					<AlertDialogDescription>
						Fill in the details below to create a new section. You can always edit these details
						later.
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

export default CreateSectionModal;
