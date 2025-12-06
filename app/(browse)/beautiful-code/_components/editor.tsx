'use client';

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { useState } from 'react';

const Editor = () => {
	const [code, setCode] = useState('');

	const handleDownload = () => {};

	return (
		<>
			<div className='max-lg:col-span-4 col-span-2 flex justify-end self-center'>
				<Button size={'lg'} className='rounded-full' onClick={handleDownload}>
					Download
					<Upload />
				</Button>
			</div>

			<div className='p-8 w-full col-span-4'>
				<CodeMirror value={code} onChange={value => setCode(value)} />
			</div>
		</>
	);
};

export default Editor;