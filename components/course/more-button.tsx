'use client';

import { ReviewType } from '@/types/app.type';
import { Button } from '../ui/button';
import { MdArrowDropDown } from 'react-icons/md';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { getReviewsData } from '@/actions/public.action';
import Spinner from '../shared/spinner';
import ReviewCard from '../cards/review.card';

interface MoreButtonProps {
	reviewsCount: number;
	reviews: ReviewType[];
}

const MoreButton = ({ reviewsCount, reviews }: MoreButtonProps) => {
	const [allReviews, setAllReviews] = useState<ReviewType[]>(reviews);
	const [limit, setLimit] = useState(14);
	const [loading, setLoading] = useState(false);

	const { slug } = useParams<{ slug: string }>();

	const handleLoadMore = async () => {
		setLoading(true);

		try {
			const result = await getReviewsData(slug, limit);
			setAllReviews(result.data);
			setLimit(limit + 6);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-4'>
				{allReviews.map((review: ReviewType) => (
					<ReviewCard key={review._id} review={review} />
				))}
			</div>

			{reviewsCount <= reviews.length ? null : (
				<div className='flex justify-center items-center mt-4'>
					<Button
						className='group rounded-full'
						size={'lg'}
						onClick={handleLoadMore}
						disabled={loading}
					>
						<span>Load More</span>
						{loading ? (
							<Spinner />
						) : (
							<MdArrowDropDown className='transition-transform group-hover:translate-y-1' />
						)}
					</Button>
				</div>
			)}
		</>
	);
};

export default MoreButton;
