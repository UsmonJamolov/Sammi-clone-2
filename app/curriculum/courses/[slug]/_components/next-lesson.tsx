'use client';

import { completeLesson } from '@/actions/course.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const NextLesson = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();

	const handleNextLesson = async () => {
		setLoading(true);
		try {
			const result = await completeLesson(slug, lessonId);
			if (result.data.end) {
				toast.success('Congratulations! You have completed the course.');
				return router.push(`/dashboard`);
			}
			router.push(
				`/curriculum/courses/${slug}/${result.data.nextLessonId}?s=${result.data.nextSectionId}`
			);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button size={'sm'} onClick={handleNextLesson} disabled={loading} variant='outline'>
			Next Lesson
			{loading && <Spinner />}
		</Button>
	);
};

export default NextLesson;