'use client';

import { Input } from '@/components/ui/input';
import { useStore } from './use-store';

const Filename = () => {
	const { filename, setFilename } = useStore();

	return (
		<Input
			className='h-16 bg-sidebar focus-visible:ring-0'
			placeholder='File Name'
			value={filename}
			onChange={e => setFilename(e.target.value)}
		/>
	);
};

export default Filename;