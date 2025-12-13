import { getCourse } from '@/actions/admin.action';
import { Separator } from '@/components/ui/separator';
import { FolderKanban, ImageIcon, List, MessageSquareReply } from 'lucide-react';
import React from 'react';
import CourseAction from './_components/course.action';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Overview from './_components/overview';
import Thumbnail from './_components/thumbnail';
import Reviews from './_components/reviews';
import Lesson from './_components/lesson';

interface PageProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ tab: string }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
	const { id } = await params;
	const { tab } = await searchParams;

	const { data } = await getCourse(id);

	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-space-grotesk font-semibold'>{data.title}</h1>
				<CourseAction courseData={data} />
			</div>
			<Separator className='my-4' />
			<div className='grid grid-cols-5 gap-x-4'>
				<div className='col-span-1'>
					<div className='bg-sidebar border rounded-md p-2'>
						<h1 className='font-space-grotesk font-semibold text-lg'>Project Details</h1>
						<Separator className='my-2' />
						<div className='flex flex-col space-y-1'>
							{items.map(item => (
								<Button
									asChild
									key={item.title}
									variant={tab === item.title ? 'secondary' : 'ghost'}
									className='justify-start w-full'
								>
									<Link
										href={{
											pathname: `/admin/projects/${id}`,
											query: { tab: item.title },
										}}
									>
										<item.icon />
										<span className='capitalize'>{item.title}</span>
									</Link>
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className='col-span-4'>
					{tab === 'overview' && <Overview courseData={data} />}
					{tab === 'lessons' && <Lesson courseData={data} />}
					{tab === 'thumbnail' && <Thumbnail courseData={data} />}
					{tab === 'reviews' && <Reviews courseData={data} />}
				</div>
			</div>
		</div>
	);
};

export default Page;

const items = [
	{ title: 'overview', icon: FolderKanban },
	{ title: 'lessons', icon: List },
	{ title: 'thumbnail', icon: ImageIcon },
	{ title: 'reviews', icon: MessageSquareReply },
];
