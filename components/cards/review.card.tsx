import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ReviewType } from '@/types/app.type';
import ReactStars from '../shared/react-stars';
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
	review: ReviewType;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
	return (
		<div className='border-t border-t-secondary'>
			<div className='mt-4 flex gap-2'>
				<Avatar>
					<AvatarFallback>
						{review.user.firstName[0]}
						{review.user.lastName[0]}
					</AvatarFallback>
					<AvatarImage src={review.user.avatar} />
				</Avatar>

				<div className='flex flex-col'>
					<div className='font-space-grotesk font-semibold'>
						{review.user.firstName} {review.user.lastName}
					</div>

					<div className='flex items-center gap-1'>
						<ReactStars readOnly value={review.rating} size={14} />
						<p className='text-xs text-muted-foreground'>
							{formatDistanceToNow(new Date(review.createdAt))} ago
						</p>
					</div>
				</div>
			</div>

			<div className='mt-2 text-sm line-clamp-6'>{review.comment}</div>
		</div>
	);
};

export default ReviewCard;