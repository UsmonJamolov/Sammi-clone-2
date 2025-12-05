import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from '@/components/ui/sidebar';
import { Progress } from '@/components/ui/progress';
import { getProjectCurriculum } from '@/actions/course.action';
import LessonList, { LessonListSkeleton } from './lesson-list';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseSidebarProps {
	slug: string;
}

const CourseSidebar = async ({ slug }: CourseSidebarProps) => {
	const result = await getProjectCurriculum(slug);

	return (
		<Sidebar variant='floating' collapsible='offcanvas'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='font-space-grotesk'>
						{result.data.course.title}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<LessonList lessons={result.data.lessons} />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className='flex items-center justify-center'>
				<Progress value={result.data.progress} />
				<div className='font-space-grotesk'>{result.data.progress}% Completed</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default CourseSidebar;

export const DashboardSidebarSkeleton = () => {
	return (
		<Sidebar variant='floating' collapsible='offcanvas'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='font-geist_mono'>
						<Skeleton className='w-36 h-4' />
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<LessonListSkeleton />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='flex items-center justify-center'>
				<Skeleton className='w-full h-6 rounded-full' />
				<Skeleton className='w-24 h-4 text-center' />
			</SidebarFooter>
		</Sidebar>
	);
};