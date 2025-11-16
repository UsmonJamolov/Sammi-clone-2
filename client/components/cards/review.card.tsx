import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface ReviewCardProps {
	firstName: string;
	lastName: string;
	rating: number;
	comment: string;
}

const ReviewCard = ({ firstName, lastName, rating, comment }: ReviewCardProps) => {
	return (
		<div className='border-t border-t-secondary'>
			<div className='mt-4 flex gap-2'>
				<Avatar>
					<AvatarFallback>
						{firstName[0]}
						{lastName[0]}
					</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div className='font-space-grotesk font-semibold'>
						{firstName} {lastName}
					</div>

					<div className='flex items-center gap-1'>
						{Array.from({ length: rating }).map((_, index) => (
							<Star key={index} className='size-4 text-yellow-600 fill-yellow-600' />
						))}
						<p className='text-xs text-muted-foreground'>12 days ago</p>
					</div>
				</div>
			</div>

			<div className='mt-2 text-sm line-clamp-6'>{comment}</div>
		</div>
	);
};

export default ReviewCard;