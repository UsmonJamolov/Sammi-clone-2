import { CourseType } from '@/types/app.type';
import { CalendarDays, List, User } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import ReactStars from '../shared/react-stars';

interface HeaderProps {
	courseData: CourseType;
}

const Header = ({ courseData }: HeaderProps) => {
	return (
		<div className='p-4 lg:p-8 border rounded-lg grid grid-cols-5 gap-x-4 items-center bg-gradient-to-br from-sidebar to-primary/50'>
			<div className='col-span-3 space-y-4 max-md:col-span-5'>
				<div className='h-52 md:hidden w-full relative rounded-lg'>
					<Image
						src={courseData.previewImage}
						alt={courseData.title}
						fill
						className='object-cover rounded-lg'
					/>
				</div>
				<h1 className='text-3xl font-space-grotesk font-semibold'>{courseData.title}</h1>
				<p className='text-sm text-muted-foreground leading-4'>{courseData.excerpt}</p>

				<div className='flex items-center gap-x-6 flex-wrap'>
					<div className='flex items-center gap-x-2'>
						<User className='size-5' />
						<span>{courseData.enrollmentCount} students</span>
					</div>
					<div className='flex items-center gap-x-2'>
						<CalendarDays className='size-5' />
						<span>{format(courseData.createdAt, 'yyyy, d-MMM')}</span>
					</div>
					<div className='flex items-center gap-x-2'>
						<List className='size-5' />
						<span>{courseData.lessonCount} lessons</span>
					</div>
				</div>

				<div className='flex items-center gap-x-6 flex-wrap'>
					<div>
						Duration: <span className='font-medium'>{courseData.duration}</span>
					</div>
					<div className='flex items-center gap-x-1'>
						<span className='text-yellow-600 font-semibold'>{courseData.rating}</span>
						<ReactStars readOnly value={courseData.rating} size={14} />
						<span>({courseData.reviewsCount})</span>
					</div>
				</div>
			</div>
			<div className='col-span-2 relative h-64 w-full rounded-lg max-md:hidden'>
				<Image
					src={courseData.previewImage}
					alt={courseData.title}
					fill
					className='object-cover rounded-lg'
				/>
			</div>
		</div>
	);
};

export default Header;
