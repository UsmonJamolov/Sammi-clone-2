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

const CourseSidebar = () => {
	return (
		<Sidebar variant='floating' collapsible='offcanvas'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='font-space-grotesk'>JavaScript</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SectionList />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className='flex items-center justify-center'>
				<Progress />
				<div className='font-space-grotesk'>10% Completed</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default CourseSidebar;