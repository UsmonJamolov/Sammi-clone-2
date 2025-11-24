import { Separator } from '@/components/ui/separator';
import { CourseType } from '@/types/app.type';

interface Props {
	courseData: CourseType;
}

const Reviews = ({  }: Props) => {
	return (
		<div className="bg-sidebar p-6 rounded-md border">
			<h1 className="text-2xl font-semibold font-space-grotesk">Thumbnail</h1>
			<Separator className='my-6' />
		</div>
	)
};

export default Reviews;
