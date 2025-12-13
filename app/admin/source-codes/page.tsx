import { Separator } from '@/components/ui/separator';
import CreateSourceCodeModal from './_components/create-source-code.modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getSourceCodes } from '@/actions/admin.action';
import SourceCodeCard from './_components/source-code.card';

const Page = async () => {
	const { data } = await getSourceCodes();

	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold font-space-grotesk'>Source codes</h1>
				<CreateSourceCodeModal>
					<Button size={'sm'}>
						<span>Add</span>
						<Plus />
					</Button>
				</CreateSourceCodeModal>
			</div>
			<Separator className='my-4' />

			{data.length === 0 && <p className='text-sm text-muted-foreground'>No source codes yet</p>}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{data.map(sourceCode => (
					<SourceCodeCard sourceCode={sourceCode} key={sourceCode._id} />
				))}
			</div>
		</div>
	);
};

export default Page;
