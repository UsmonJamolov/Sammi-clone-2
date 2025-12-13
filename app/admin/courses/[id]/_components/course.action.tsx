'use client';

import { Button } from '@/components/ui/button';
import { IoMdArrowDropleft } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteCourse, updateCourse } from '@/actions/admin.action';
import { useParams, useRouter } from 'next/navigation';
import { CourseType } from '@/types/app.type';

interface CourseActionProps {
	courseData: CourseType;
}

const CourseAction = ({ courseData }: CourseActionProps) => {
	const [loading, setLoading] = useState(false);

	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const onUpdate = async () => {
		const confirm = window.confirm('Are you sure you want to update this course?');
		if (!confirm) return;

		setLoading(true);
		try {
			await updateCourse(id, { isPublished: !courseData.isPublished });
			toast.success('Course updated successfully');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		const confirm = window.confirm('Are you sure you want to delete this course?');
		if (!confirm) return;

		setLoading(true);
		try {
			await deleteCourse(id);
			toast.success('Course deleted successfully');
			router.push('/admin/courses');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center'>
			<Button
				variant={'outline'}
				className='rounded-r-none'
				disabled={loading}
				onClick={() => router.back()}
			>
				<IoMdArrowDropleft />
				<span>Back</span>
			</Button>
			<Button className='rounded-none' variant={'secondary'} disabled={loading} onClick={onUpdate}>
				{courseData.isPublished ? 'Published' : 'Draft'}
			</Button>
			<Button
				variant={'destructive'}
				className='rounded-l-none'
				onClick={onDelete}
				disabled={loading}
			>
				<span>Delete</span>
				<CiTrash />
			</Button>
		</div>
	);
};

export default CourseAction;
