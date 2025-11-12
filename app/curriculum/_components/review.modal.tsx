import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const ReviewModal = () => {
	return (
		<>
			<Button size={'sm'} variant={'ghost'}>
				<Star />
				<span>Review</span>
			</Button>
		</>
	);
};

export default ReviewModal;