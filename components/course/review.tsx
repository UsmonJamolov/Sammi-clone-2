import { Dot, Star } from 'lucide-react';
import MoreButton from './more-button';
import { getReviewsData } from '@/actions/public.action';

interface ReviewProps {
	slug: string;
}

const Review = async ({ slug }: ReviewProps) => {
	const result = await getReviewsData(slug, 8);

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<div className='flex items-center gap-1'>
				<div className='flex items-center gap-1'>
					<Star className='size-4 text-yellow-600 fill-yellow-600' />
					<span>{result.rating} Rating</span>
				</div>
				<Dot />
				<div className='font-medium'>{result.reviewsCount} Reviews</div>
			</div>

			<MoreButton reviewsCount={result.reviewsCount} reviews={result.data} />
		</div>
	);
};

export default Review;