'use client';

import { resetCourseProgress } from '@/actions/course.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getCourseType } from '@/lib/utils';
import { CourseType } from '@/types/app.type';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface CourseCardProps {
	course: CourseType;
}

const CourseCard = ({ course }: CourseCardProps) => {
	const [loading, setLoading] = useState(false);

	const handleReset = async () => {
		const isConfirmed = window.confirm('Are you sure you want to reset your progress?');
		if (!isConfirmed) return;

		try {
			setLoading(true);
			await resetCourseProgress(course._id);
			toast.success('Course progress has been reset');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='border rounded-lg pb-2 bg-sidebar'>
			<Link href={`/${course.type}/${course._id}`}>
				<div className='relative aspect-video rounded-lg'>
					<Image fill src={course.previewImage} alt={course.title} className='object-cover' />
				</div>
			</Link>

			<div className='px-2 flex flex-col space-y-2'>
				<h1 className='text-lg font-semibold'>{course.title}</h1>

				<div>
					<Progress value={course.progress} />
					<p className='text-sm font-space-grotesk'>{course.progress}% completed</p>
				</div>

				{course.progress !== 100 && (
					<Button asChild>
						<Link href={`/curriculum/${getCourseType(course.type)}/${course.slug}`}>
							Continue Course
						</Link>
					</Button>
				)}

				{course.progress === 100 && (
					<Button variant={'outline'} disabled={loading} onClick={handleReset}>
						Reset Course
						{loading && <Spinner />}
					</Button>
				)}
			</div>
		</div>
	);
};

export default CourseCard;
