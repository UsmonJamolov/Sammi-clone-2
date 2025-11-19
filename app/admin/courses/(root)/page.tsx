import CreateCourseModal from './_components/create-course.modal';

const Page = () => {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Courses</h1>
				<CreateCourseModal />
			</div>
		</div>
	);
};

export default Page;