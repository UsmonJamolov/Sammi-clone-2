import CourseCard from '@/components/cards/course.card';
import { newProjects } from '@/lib/constants';
import Link from 'next/link';

const ProjectsPage = () => {
	return (
		<>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Projects</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
				{newProjects.map(project => (
					<Link href={`/projects/${project.slug}`} key={project.slug}>
						<CourseCard course={project} />
					</Link>
				))}
			</div>
		</>
	);
};

export default ProjectsPage;