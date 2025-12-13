import { ScrollArea } from '@/components/ui/scroll-area';
import Resume from './_components/resume';
import { Separator } from '@/components/ui/separator';
import ProfileForm from './_components/profile.form';
import Experience from './_components/experience';
import Project from './_components/project';
import Education from './_components/education';
import Skills from './_components/skills';
import Language from './_components/language';

const Page = () => {
	return (
		<div className='flex'>
			<ScrollArea className='w-[40%] max-md:w-full h-[80vh]'>
				<div className='space-y-4 p-4 mb-20 md:mb-0 w-full'>
					<ProfileForm />
					<Separator />
					<Experience />
					<Separator />
					<Project />
					<Separator />
					<Education />
					<Separator />
					<Skills />
					<Separator />
					<Language />
				</div>
			</ScrollArea>

			<div className='w-[60%] h-[80vh] group max-md:hidden'>
				<Resume />
			</div>
		</div>
	);
};

export default Page;
