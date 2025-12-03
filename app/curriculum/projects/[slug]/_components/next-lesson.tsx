'use client';

import { completeProjectLesson } from '@/actions/course.action';
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
			const result = await completeProjectLesson(slug, lessonId);
			if (result.data.end) {
				toast.success('Congratulations! You have completed the project.');
				return router.push(`/dashboard`);
			}
			router.push(`/curriculum/projects/${slug}/${result.data.nextLessonId}`);
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