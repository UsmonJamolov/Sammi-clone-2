import SourceCodeCard from '@/components/cards/source-code.card';
import { sourceCodes } from '@/lib/constants';

const SourceCodesPage = () => {
	return (
		<>
			<h1 className='text-2xl font-space-grotesk font-semibold'>Source Codes</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
				{sourceCodes.map(sourceCode => (
					<SourceCodeCard sourceCode={sourceCode} key={sourceCode._id} />
				))}
			</div>
		</>
	);
};

export default SourceCodesPage;