'use client';

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useStore } from './use-store';
import {
	getBgTypeByLabel,
	getGradientByLabel,
	getImageByLabel,
	getLanguageByLabel,
	getThemeByLabel,
} from './utils';
import {
	fontMap,
	getExtensionByLabel,
	getTextColor,
	getThemeBackgroundColor,
	getThemeByValue,
	getThemeFilenameBackground,
} from './constants';
import html2canvas from 'html2canvas-pro';
import Spinner from '@/components/shared/spinner';

const Editor = () => {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const store = useStore();

	const snippetRef = useRef(null);

	const handleDownload = async () => {
		if (!snippetRef.current) return;
		setLoading(true);

		const canvas = await html2canvas(snippetRef.current, {
			backgroundColor: '#0000',
			useCORS: true,
			scale: 2,
		});
		setLoading(false);

		const link = document.createElement('a');
		link.download = 'code-snippet.png';
		link.href = canvas.toDataURL();
		link.click();
	};

	const currentBgType = getBgTypeByLabel(store.backgroundType);
	const currentGradient = getGradientByLabel(store.gradient);
	const currentImage = getImageByLabel(store.image);
	const currentTheme = getThemeByLabel(store.theme);
	const currentLanguage = getLanguageByLabel(store.language);

	const customPadding = EditorView.theme({
		'.cm-content': {
			padding: '24px 8px',
			fontFamily: fontMap[store.font],
			fontSize: `${store.fontSize}px`,
		},
	});

	return (
		<>
			<div className='max-lg:col-span-4 col-span-2 flex justify-end self-center'>
				<Button size={'lg'} className='rounded-full' onClick={handleDownload} disabled={loading}>
					Download
					{loading ? <Spinner /> : <Upload />}
				</Button>
			</div>

			<div className='p-8 w-full col-span-4'>
				<div
					ref={snippetRef}
					className='rounded-lg mt-6 w-full flex justify-center items-center col-span-4'
				>
					<div
						className={cn(
							'rounded-lg w-full',
							currentBgType.value === 'gradient' && currentGradient.value,
							currentBgType.value !== 'none' && 'p-12'
						)}
						style={{
							backgroundColor: currentBgType.value === 'solid' ? store.color : '',
							backgroundImage: currentBgType.value === 'image' ? `url(${currentImage.images})` : '',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					>
						<div
							className={cn('flex items-center rounded-t-lg px-4 gap-x-4 h-8')}
							style={{
								backgroundColor: getThemeFilenameBackground(currentTheme.value),
							}}
						>
							<div className='flex items-center gap-2'>
								<span className='w-3 h-3 bg-red-500 rounded-full' />
								<span className='w-3 h-3 bg-yellow-400 rounded-full' />
								<span className='w-3 h-3 bg-green-500 rounded-full' />
							</div>

							{store.filename && (
								<div
									className={cn(
										'rounded-t-md text-xs font-geist_mono px-2 h-8 flex items-center justify-center'
									)}
									style={{
										backgroundColor: getThemeBackgroundColor(currentTheme.value),
										color: getTextColor(currentTheme.value),
										minHeight: '2rem',
									}}
								>
									<p>{store.filename}</p>
								</div>
							)}
						</div>
						<CodeMirror
							value={code}
							minHeight='auto'
							extensions={[
								getExtensionByLabel(currentLanguage.label),
								EditorView.lineWrapping,
								EditorState.tabSize.of(+store.tabSize),
								customPadding,
							]}
							placeholder={'// Paste your code here...'}
							theme={getThemeByValue(currentTheme.value)}
							indentWithTab={false}
							basicSetup={{
								lintKeymap: false,
								lineNumbers: store.lineNumber,
								highlightActiveLine: false,
								syntaxHighlighting: false,
								highlightActiveLineGutter: false,
								tabSize: +store.tabSize,
								foldGutter: store.foldGutter,
							}}
							onChange={value => setCode(value)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Editor;