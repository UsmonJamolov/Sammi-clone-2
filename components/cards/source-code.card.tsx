import { Github } from 'lucide-react';

interface SourceCodeCardProps {
	sourceCode: SourceCodeType;
}

const SourceCodeCard = ({ sourceCode }: SourceCodeCardProps) => {
	return (
		<div className='p-4 rounded-lg flex justify-between items-center bg-gradient-to-br from-card to-primary/50'>
			<h2 className='text-xl font-space-grotesk font-semibold line-clamp-1 truncate'>
				{sourceCode.title}
			</h2>

			<Github />
		</div>
	);
};

export default SourceCodeCard;