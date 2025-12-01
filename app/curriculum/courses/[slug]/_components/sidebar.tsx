import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from '@/components/ui/sidebar';
import SectionList from './section.list';
import { Progress } from '@/components/ui/progress';
import { getCourseCurriculum } from '@/actions/course.action';

interface CourseSidebarProps {
	slug: string;
}

const CourseSidebar = async ({ slug }: CourseSidebarProps) => {
	const result = await getCourseCurriculum(slug);

	return (
		<Sidebar variant='floating' collapsible='offcanvas'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='font-space-grotesk'>
						{result.data.course.title}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SectionList sections={result.data.sections} />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className='flex items-center justify-center'>
				<Progress />
				<div className='font-space-grotesk'>{result.data.progress}% Completed</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default CourseSidebar;