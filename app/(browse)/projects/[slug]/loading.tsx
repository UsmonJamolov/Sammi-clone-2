import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SkeletonCurriculum } from './_components/curriculum';

const Loading = () => {
	return (
		<>
			<div className='p-4 lg:p-8 bg-sidebar border rounded-lg grid grid-cols-5 gap-x-4 items-center'>
				<div className='col-span-5 lg:col-span-3 space-y-4'>
					<Skeleton className='block lg:hidden relative h-52 w-full' />
					<Skeleton className='w-1/2 h-8' />
					<div className='space-y-1'>
						<Skeleton className='w-full h-3' />
						<Skeleton className='w-full h-3' />
						<Skeleton className='w-1/2 h-3' />
					</div>

					<div className='flex items-center gap-x-6 flex-wrap'>
						<div className='flex items-center gap-x-2'>
							<Skeleton className='w-5 h-5' />
							<Skeleton className='w-24 h-3' />
						</div>

						<div className='flex items-center gap-x-2'>
							<Skeleton className='w-5 h-5' />
							<Skeleton className='w-20 h-3' />
						</div>

						<div className='flex items-center gap-x-2'>
							<Skeleton className='w-5 h-5' />
							<Skeleton className='w-28 h-3' />
						</div>
					</div>

					<div className='flex items-center gap-x-6 mt-4 flex-wrap'>
						<Skeleton className='w-1/3 h-3' />
						<div className='flex items-center gap-x-1'>
							<Skeleton className='size-5' />
							<div className='flex items-center gap-x-1'>
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} className='text-secondary animate-pulse size-5' />
								))}
							</div>
							<div className='text-secondary flex items-center'>
								(<Skeleton className='w-8 h-3' />)
							</div>
						</div>
					</div>
				</div>

				<Skeleton className='hidden lg:block col-span-2 relative h-64 w-full rounded-lg'></Skeleton>
			</div>

			<div className='flex mt-6 w-full items-start gap-x-4'>
				<div className='w-full lg:w-2/3'>
					<div className='bg-sidebar p-4 border rounded-lg'>
						<Skeleton className='w-1/2 h-8' />

						<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
							{Array.from({ length: 4 }).map((_, i) => (
								<div className={'flex gap-2 items-center'} key={i}>
									<Skeleton className='w-5 h-5' />
									<Skeleton className='w-3/4 h-3' />
								</div>
							))}
						</div>
					</div>

					<SkeletonCurriculum />

					<div className='bg-sidebar p-4 border rounded-lg mt-6'>
						<Skeleton className='w-1/2 h-8' />

						<div className='mt-2'>
							{Array.from({ length: 4 }).map((_, i) => (
								<div className='mt-1 flex items-center gap-x-2' key={i}>
									<Skeleton className='w-5 h-5 rounded-full' />
									<Skeleton className='w-3/4 h-3' />
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='hidden lg:block w-1/3 sticky top-24'>
					<div className='p-4 bg-sidebar rounded-lg border'>
						<Skeleton className='w-full h-8' />

						<div className='flex items-end gap-x-2 mt-2'>
							<Skeleton className='w-20 h-3' />
							<Skeleton className='w-20 h-3' />
						</div>
						<Separator className='my-2' />
						<Skeleton className='w-full h-10 rounded-full' />
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading;