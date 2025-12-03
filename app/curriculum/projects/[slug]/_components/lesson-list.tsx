'use client';

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