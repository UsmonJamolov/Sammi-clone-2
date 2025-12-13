'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LessonType } from '@/types/app.type';
import { BadgeCheck, CirclePause, CirclePlay } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface LessonListProps {
	lessons: LessonType[];
}

const LessonList = ({ lessons }: LessonListProps) => {
	const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();

	const renderLesson = (lesson: LessonType) => {
		return (
			<Link
				className={cn(
					'flex items-center gap-x-2 text-sm h-12 hover:bg-secondary px-2',
					lesson._id === lessonId && 'bg-secondary font-medium'
				)}
				key={lesson._id}
				href={`/curriculum/projects/${slug}/${lesson._id}`}
			>
				{lesson.isCompleted ? (
					<BadgeCheck size={16} className='text-primary' />
				) : lesson._id === lessonId ? (
					<CirclePause size={16} />
				) : (
					<CirclePlay size={16} />
				)}

				<span className='text-sm'>{lesson.title}</span>
			</Link>
		);
	};

	return <div className='flex flex-col gap-y-2'>{lessons.map(renderLesson)}</div>;
};

export default LessonList;

export const LessonListSkeleton = () => {
	const lessonSkeleton = (
		<div className={'flex justify-between items-center gap-x-2 border-b h-10 '}>
			<div className='w-full flex justify-start h-full px-2 cursor-pointer'>
				<div className='flex items-center gap-x-2 justify-between'>
					<div className='flex-1'>
						<CirclePlay size={16} className='animate-pulse' />
					</div>
					<div className='w-full'>
						<Skeleton className={`w-24 h-4`} />
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className='flex flex-col'>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i}>{lessonSkeleton}</div>
			))}
		</div>
	);
};
