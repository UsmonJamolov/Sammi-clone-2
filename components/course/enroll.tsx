'use client';

import { IoMdArrowDropright } from 'react-icons/io';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { enrollment } from '@/actions/course.action';
import Spinner from '../shared/spinner';

const Enroll = () => {
	const [loading, setLoading] = useState(false);

	const { slug } = useParams<{ slug: string }>();
	const router = useRouter();

	const onEnroll = async () => {
		try {
			setLoading(true);
			await enrollment(slug);
			toast.success('Enrolled successfully');
			router.push(`/curriculum/projects/${slug}`);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-4 lg:p-8 bg-card border w-full rounded-lg'>
			<h1 className='text-3xl font-space-grotesk font-semibold'>Price</h1>

			<div className='flex items-end gap-x-2 mt-2'>
				<h2 className='text-2xl'>Free</h2>
				<p className='text-sm text-muted-foreground line-through'>10.00 USD</p>
			</div>

			<Separator />

			<Button
				className='w-full mt-4 rounded-full group'
				size={'lg'}
				onClick={onEnroll}
				disabled={loading}
			>
				<span>Enroll Now</span>
				{loading ? (
					<Spinner />
				) : (
					<IoMdArrowDropright className='size-4 transition-transform group-hover:translate-x-1' />
				)}
			</Button>
		</div>
	);
};

export default Enroll;