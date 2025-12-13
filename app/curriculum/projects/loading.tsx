import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardNavbarSkeleton } from '../_components/navbar';
import { DashboardSidebarSkeleton } from './[slug]/_components/sidebar';
import { LessonPageSkeleton } from './[slug]/[lessonId]/page';

const Loading = () => {
	const sidebarStyle = {
		'--sidebar-width': '20rem',
		'--sidebar-width-mobile': '20rem',
	} as React.CSSProperties;

	return (
		<SidebarProvider style={sidebarStyle}>
			<DashboardSidebarSkeleton />
			<main className='w-full mx-2'>
				<DashboardNavbarSkeleton />
				<div className='mt-2 container mb-12'>
					<LessonPageSkeleton />
				</div>
			</main>
		</SidebarProvider>
	);
};

export default Loading;
