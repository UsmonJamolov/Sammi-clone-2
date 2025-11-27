import { getHomePageData } from '@/actions/public.action';
import CourseCard from '@/components/cards/course.card';
import SourceCodeCard from '@/components/cards/source-code.card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const HomePage = async () => {
	const {data} = await getHomePageData()
	
	return (
		<>
			<div className='grid grid-cols-5 gap-x-4 items-center border rounded-lg p-8 max-md:p-4 bg-gradient-to-br from-sidebar to-primary/40'>
				<div className='col-span-3 max-md:col-span-5'>
					<h1 className='text-3xl font-space-grotesk font-semibold'>
						Welcome to <span className='text-primary'>Sammi</span>
					</h1>
					<p className='text-muted-foreground leading-5 text-sm'>
						Sammi - teach you how to code, one step at a time. Learn to code with interactive
						lessons, coding challenges, and real-world projects. Start your coding journey today!
					</p>
					<div className='flex gap-4 mt-4'>
						<Button asChild className='rounded-full' size={'lg'}>
							<Link href={'/courses'}>Explore Courses</Link>
						</Button>
						<Button asChild variant={'secondary'} className='rounded-full' size={'lg'}>
							<Link href={'/projects'}>View Projects</Link>
						</Button>
					</div>
				</div>
				<div className='col-span-2 max-md:col-span-5'>
					<Sparkles size={200} className='mx-auto max-lg:hidden' />
				</div>
			</div>

			<div className='mt-4'>
				<Button asChild variant={'link'} className='text-xl'>
					<Link href={'/courses'}>Courses</Link>
				</Button>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
					{data.courses.map(course => (
						<Link href={`/courses/${course.slug}`} key={course.slug}>
							<CourseCard course={course} />
						</Link>
					))}
				</div>
			</div>

			<div className='mt-4'>
				<Button asChild variant={'link'} className='text-xl'>
					<Link href={'/projects'}>Projects</Link>
				</Button>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
					{data.projects.map(project => (
						<Link href={`/projects/${project.slug}`} key={project.slug}>
							<CourseCard course={project} />
						</Link>
					))}
				</div>
			</div>

			<div className='mt-4'>
				<Button asChild variant={'link'} className='text-xl'>
					<Link href={'/source-codes'}>Source codes</Link>
				</Button>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
					{data.sourceCodes.map(sourceCode => (
						<SourceCodeCard sourceCode={sourceCode} key={sourceCode._id} />
					))}
				</div>
			</div>
		</>
	);
};

export default HomePage;