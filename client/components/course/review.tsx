import { Dot, Star } from 'lucide-react';
import ReviewCard from '../cards/review.card';
import MoreButton from './more-button';

const Review = async () => {
	const data = [
		{
			firstName: 'John',
			lastName: 'Doe',
			rating: 5,
			comment: 'Great course! Learned a lot.',
		},
		{
			firstName: 'Jane',
			lastName: 'Smith',
			rating: 4,
			comment: 'Very informative and well-structured.',
		},
		{
			firstName: 'Alice',
			lastName: 'Johnson',
			rating: 5,
			comment: 'Excellent content and delivery!',
		},
		{
			firstName: 'Bob',
			lastName: 'Brown',
			rating: 3,
			comment: 'Good course but could use more examples.',
		},
	];

	return (
		<div className='p-4 lg:p-8 border rounded-lg bg-card mt-5'>
			<div className='flex items-center gap-1'>
				<div className='flex items-center gap-1'>
					<Star className='size-4 text-yellow-600 fill-yellow-600' />
					<span>5 Rating</span>
				</div>
				<Dot />
				<div className='font-medium'>100 Reviews</div>
			</div>

			<div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-4'>
				{data.map(review => (
					<ReviewCard
						key={review.comment}
						firstName={review.firstName}
						lastName={review.lastName}
						rating={review.rating}
						comment={review.comment}
					/>
				))}
			</div>
			<MoreButton />
		</div>
	);
};

export default Review;