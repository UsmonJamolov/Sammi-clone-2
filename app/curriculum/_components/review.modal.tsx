'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ReactStars from '@/components/shared/react-stars';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const ReviewModal = () => {
	const [rating, setRating] = useState(5);

	console.log(rating);

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button size={'sm'} variant={'ghost'}>
						<Star />
						<span>Review</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className='flex flex-col items-center justify-center'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-xl font-space-grotesk font-semibold'>
							Please rate your experience
						</AlertDialogTitle>
					</AlertDialogHeader>

					<Separator />

					<ReactStars size={40} value={rating} onChange={newRating => setRating(newRating)} />

					<form className='flex w-full flex-col gap-4'>
						<Textarea className='h-32 resize-none' placeholder='Write your review here...' />

						<div className='flex justify-end'>
							<Button type='submit' size={'lg'} className='rounded-full'>
								Submit Review
							</Button>
						</div>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ReviewModal;