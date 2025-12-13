'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SourceCodeType } from '@/types/app.type';
import { Github } from 'lucide-react';
import CreateSourceCodeModal from './create-source-code.modal';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteSourceCode } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';

interface SourceCodeCardProps {
	sourceCode: SourceCodeType;
}

const SourceCodeCard = ({ sourceCode }: SourceCodeCardProps) => {
	const [loading, setLoading] = useState(false);

	const onDelete = async () => {
		const isConfirmed = confirm('Are you sure you want to delete this source code?');
		if (!isConfirmed) return;

		setLoading(true);
		try {
			await deleteSourceCode(sourceCode._id);
			toast.success('Source code deleted successfully');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-4 rounded-lg bg-sidebar'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-space-grotesk font-semibold line-clamp-1 truncate'>
					{sourceCode.title}
				</h2>

				<Github />
			</div>
			<Separator className='my-4' />
			<div className='grid grid-cols-2 gap-2'>
				<CreateSourceCodeModal editData={sourceCode} editId={sourceCode._id}>
					<Button size={'sm'} variant={'secondary'} disabled={loading}>
						Edit
					</Button>
				</CreateSourceCodeModal>
				<Button size={'sm'} variant={'destructive'} disabled={loading} onClick={onDelete}>
					Delete
					{loading && <Spinner />}
				</Button>
			</div>
		</div>
	);
};

export default SourceCodeCard;
