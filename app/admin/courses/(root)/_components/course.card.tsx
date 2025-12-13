import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CourseType } from '@/types/app.type';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
	course: CourseType;
}

const CourseCard = ({ course }: CourseCardProps) => {
	return (
		<div className='p-0 rounded-lg bg-card'>
			<div className='relative h-52 w-full bg-sidebar rounded-lg'>
				{course.previewImage && (
					<Image
						src={course.previewImage}
						alt={course.title}
						fill
						className='rounded-t-lg object-cover'
					/>
				)}

				{!course.previewImage && (
					<div className='flex items-center justify-center h-full w-full text-9xl font-bold text-muted-foreground'>
						{course.title.charAt(0)}
					</div>
				)}

				<div className='absolute left-2 top-2 flex gap-x-1'>
					<Badge variant={'outline'}>{course.level}</Badge>
					<Badge variant={'secondary'}>{course.category}</Badge>
				</div>
			</div>
			<Separator />
			<div className='flex items-center justify-between p-2'>
				<h2 className='text-xl font-space-grotesk font-bold'>{course.title}</h2>
				<Button size={'sm'} variant={'secondary'} asChild>
					<Link href={`/admin/courses/${course._id}?tab=overview`}>Edit</Link>
				</Button>
			</div>
		</div>
	);
};

export default CourseCard;
