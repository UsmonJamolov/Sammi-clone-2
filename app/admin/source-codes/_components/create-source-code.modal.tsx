'use client';

import { createSourceCode, updateSourceCode } from '@/actions/admin.action';
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
import { sourceCodeSchema } from '@/lib/validation';
import { SourceCodeType } from '@/types/app.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface Props {
	children: React.ReactNode;
	editId?: string;
	editData?: SourceCodeType;
}

const CreateSourceCodeModal = ({ children, editId, editData }: Props) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof sourceCodeSchema>>({
		resolver: zodResolver(sourceCodeSchema),
		defaultValues: { title: '', url: '' },
	});

	async function onSubmit(values: z.infer<typeof sourceCodeSchema>) {
		setLoading(true);
		try {
			if (editId) {
				await updateSourceCode(editId, values);
			} else {
				await createSourceCode(values);
			}
			toast.success('Source code created successfully');
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
		if (editId) {
			form.setValue('title', editData?.title || '');
			form.setValue('url', editData?.url || '');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editData, editId]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{editId ? 'Edit' : 'Create'} source code</AlertDialogTitle>
					<AlertDialogDescription>
						Fill in the details below to {editId ? 'edit source code' : 'create a new source code'}.
						You can always edit these details later.
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
										<Input placeholder='Google clone' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='url'
							render={({ field }) => (
								<FormItem className='gap-1'>
									<Label>Repository URL</Label>
									<FormControl>
										<Input placeholder='https://example.com' disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end pt-4 gap-x-2'>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<Button type='submit' disabled={loading}>
								<span>{editId ? 'Save changes' : 'Create'}</span>
								{loading && <Spinner />}
							</Button>
						</div>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreateSourceCodeModal;