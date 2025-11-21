'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { overviewSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { VscDiscard } from 'react-icons/vsc';
import { CourseType } from '@/types/app.type';
import { toast } from 'sonner';
import { updateCourse } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';

interface Props {
	courseData: CourseType;
}

const Overview = ({ courseData }: Props) => {
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof overviewSchema>>({
		resolver: zodResolver(overviewSchema),
		defaultValues: courseData,
	});

	async function onSubmit(values: z.infer<typeof overviewSchema>) {
		setLoading(true);
		try {
			await updateCourse(courseData._id, values);
			toast.success('Course updated successfully');
			setEdit(false);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	}

	const toggleEdit = () => setEdit(prev => !prev);

	return (
		<div className='bg-sidebar p-6 rounded-md border'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Overview</h1>
				<Button size={'icon'} variant={'secondary'} className='rounded-full' onClick={toggleEdit}>
					{edit ? <X /> : <Pencil />}
				</Button>
			</div>

			<Separator className='my-4' />

			{!edit && (
				<div className='grid grid-cols-2 gap-4'>
					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Title</h2>
						<p className='text-muted-foreground'>{courseData.title}</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Slug</h2>
						<p className='text-muted-foreground'>{courseData.slug}</p>
					</div>

					<div className='flex flex-col space-y-0 col-span-2'>
						<h2 className='text-lg font-medium'>Excerpt</h2>
						<p className='text-muted-foreground'>
							{courseData.excerpt || 'No excerpt provided for this course.'}
						</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Category</h2>
						<p className='text-muted-foreground'>{courseData.category}</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Level</h2>
						<p className='text-muted-foreground'>{courseData.level}</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Course for whom</h2>
						<p className='text-muted-foreground'>
							{courseData.forWhom || 'No target audience provided for this course.'}
						</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>What students will learn</h2>
						<p className='text-muted-foreground'>
							{courseData.whatYouWillLearn ||
								'No information provided for what students will learn.'}
						</p>
					</div>

					<div className='flex flex-col space-y-0 col-span-2'>
						<h2 className='text-lg font-medium'>Keywords</h2>
						<p className='text-muted-foreground line-clamp-4'>
							{courseData.keywords || 'No keywords provided for this course.'}
						</p>
					</div>
				</div>
			)}

			{edit && (
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
								name='excerpt'
								render={({ field }) => (
									<FormItem className='gap-1 col-span-2'>
										<Label>Excerpt</Label>
										<FormControl>
											<Textarea
												placeholder='Nextjs course about Webpack'
												className='resize-none h-24'
												disabled={loading}
												{...field}
											/>
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
											defaultValue={field.value}
											disabled={loading}
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
											defaultValue={field.value}
											disabled={loading}
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
							<FormField
								control={form.control}
								name='forWhom'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>For Whom</Label>
										<FormControl>
											<Textarea
												placeholder='This course is for...'
												className='h-12 resize-none'
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='whatYouWillLearn'
								render={({ field }) => (
									<FormItem className='gap-1'>
										<Label>What Students Will Learn</Label>
										<FormControl>
											<Textarea
												placeholder='React, Nextjs, Webpack'
												className='h-12 resize-none'
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='keywords'
								render={({ field }) => (
									<FormItem className='gap-1 col-span-2'>
										<Label>Keywords</Label>
										<FormControl>
											<Textarea
												placeholder='Nextjs course, React course, Webpack course'
												className='h-24'
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type='button'
								variant={'secondary'}
								size={'lg'}
								onClick={toggleEdit}
								disabled={loading}
							>
								<span>Discard Changes</span>
								<VscDiscard />
							</Button>

							<Button type='submit' size={'lg'} disabled={loading}>
								<span>Save Changes</span>
								{loading ? <Spinner /> : <Save />}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default Overview;