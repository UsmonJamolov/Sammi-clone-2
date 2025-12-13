import { getSections } from '@/actions/admin.action';
import { CourseType } from '@/types/app.type';
import CreateSectionModal from './create-section.modal';
import { Separator } from '@/components/ui/separator';
import SectionList from './section-list';

interface Props {
	courseData: CourseType;
}

const Sections = async ({ courseData }: Props) => {
	const { data } = await getSections(courseData._id);

	return (
		<div className='bg-sidebar p-6 rounded-md border'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Sections</h1>
				<CreateSectionModal />
			</div>

			<Separator className='my-4' />

			{data.length === 0 && (
				<p className='text-center py-10 text-muted-foreground'>No sections found</p>
			)}
			<SectionList sections={data} />
		</div>
	);
};

export default Sections;
