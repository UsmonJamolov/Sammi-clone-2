'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ReactStars from '@/components/shared/react-stars';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ReviewType } from '@/types/app.type';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { createReview, getReview } from '@/actions/course.action';
import Spinner from '@/components/shared/spinner';

const ReviewModal = () => {
	const [review, setReview] = useState<ReviewType | null>(null);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(5);
	const [open, setOpen] = useState(false);
	const [comment, setComment] = useState('');

	const { slug } = useParams<{ slug: string }>();

	const onOpenModal = async () => {
		if (review) return setOpen(true);

		try {
			setLoading(true);
			const result = await getReview(slug);
			setReview(result.data);
			if (result.data) {
				setRating(result.data.rating);
				setComment(result.data.comment);
			}
			setOpen(true);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	async function handleSubmit() {
		if (!comment) return toast.error('Please write a comment');
		setLoading(true);
		try {
			const result = await createReview(slug, rating, comment);
			setReview(result.data);
			toast.success('Review submitted successfully');
			setOpen(false);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Button size={'sm'} variant={'ghost'} onClick={onOpenModal}>
				{loading ? <Spinner /> : <Star />}
				<span>Review</span>
			</Button>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent className='flex flex-col items-center justify-center'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-xl font-space-grotesk font-semibold'>
							{rating === 5
								? 'Awesome! 😍'
								: rating === 4
								? 'Great! 😊'
								: rating === 3
								? 'Good! 🙂'
								: rating === 2
								? 'Bad! 😕'
								: 'Awful! 😠'}
						</AlertDialogTitle>
					</AlertDialogHeader>

					<Separator />

					<ReactStars size={40} value={rating} onChange={newRating => setRating(newRating)} />

					<div className='flex w-full flex-col gap-4'>
						<Textarea
							className='h-32 resize-none'
							placeholder='Write your review here...'
							value={comment}
							onChange={e => setComment(e.target.value)}
						/>

						<div className='flex justify-end'>
							<Button
								size={'lg'}
								className='rounded-full'
								onClick={handleSubmit}
								disabled={loading}
							>
								{review ? 'Update Review' : 'Submit Review'}
								{loading && <Spinner />}
							</Button>
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ReviewModal;