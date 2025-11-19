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

const Overview = () => {
	const [edit, setEdit] = useState(false);

	const form = useForm<z.infer<typeof overviewSchema>>({
		resolver: zodResolver(overviewSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof overviewSchema>) {
		console.log(values);
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
						<p className='text-muted-foreground'>Webpack</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Slug</h2>
						<p className='text-muted-foreground'>webpack</p>
					</div>

					<div className='flex flex-col space-y-0 col-span-2'>
						<h2 className='text-lg font-medium'>Excerpt</h2>
						<p className='text-muted-foreground'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus laboriosam placeat
							iure? Facilis veniam impedit, provident voluptatum est atque necessitatibus.
						</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Category</h2>
						<p className='text-muted-foreground'>Fron-end</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Level</h2>
						<p className='text-muted-foreground'>Beginner</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Course for whom</h2>
						<p className='text-muted-foreground'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, magnam?
						</p>
					</div>

					<div className='flex flex-col space-y-0'>
						<h2 className='text-lg font-medium'>Wehat students will learn</h2>
						<p className='text-muted-foreground'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, deleniti?
						</p>
					</div>

					<div className='flex flex-col space-y-0 col-span-2'>
						<h2 className='text-lg font-medium'>Keywords</h2>
						<p className='text-muted-foreground line-clamp-4'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque odio blanditiis ipsam,
							assumenda, quod officia exercitationem dolor quisquam nesciunt unde delectus non
							veritatis? Illo neque voluptas, in assumenda, voluptate commodi ex, ad dolores quae
							cum odio perferendis iure? Facilis, eos?Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Accusantium, atque magnam maxime beatae totam recusandae voluptates
							ratione distinctio id, dicta dolore possimus aspernatur ea placeat nostrum dolor in
							rerum numquam velit impedit natus? Sunt, aspernatur quod voluptates maxime dolore
							sapiente!
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
								name='excerpt'
								render={({ field }) => (
									<FormItem className='gap-1 col-span-2'>
										<Label>Excerpt</Label>
										<FormControl>
											<Textarea
												placeholder='Nextjs course about Webpack'
												className='resize-none h-24'
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
							<FormField
								control={form.control}
								name='excerpt'
								render={({ field }) => (
									<FormItem className='gap-1 col-span-2'>
										<Label>Keywords</Label>
										<FormControl>
											<Textarea
												placeholder='Nextjs course, React course, Webpack course'
												className='h-24'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='button' variant={'secondary'} size={'lg'} onClick={toggleEdit}>
								<span>Discard Changes</span>
								<VscDiscard />
							</Button>

							<Button type='submit' size={'lg'}>
								<span>Save Changes</span>
								<Save />
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default Overview;