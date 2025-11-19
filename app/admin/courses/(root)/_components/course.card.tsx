import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const CourseCard = () => {
	return (
		<div className='p-0 rounded-lg bg-card'>
			<div className='relative h-52 w-full bg-sidebar rounded-lg'>
				<div className='absolute left-2 top-2 flex gap-x-1'>
					<Badge variant={'outline'}>Beginner</Badge>
					<Badge variant={'secondary'}>Front-End</Badge>
				</div>
			</div>
			<Separator />
			<div className='flex items-center justify-between p-2'>
				<h2 className='text-xl font-space-grotesk font-bold'>Webpack</h2>
				<Button size={'sm'} variant={'secondary'} asChild>
					<Link href={'/admin/courses/1'}>Edit</Link>
				</Button>
			</div>
		</div>
	);
};

export default CourseCard;