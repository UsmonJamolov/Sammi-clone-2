import Hint from '@/components/shared/hint';
import { Download, ListRestart, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { useResume } from './use-resume.store';
import { generateResumeTemplate } from './template';
import { Profile } from './resume.types';
import Spinner from '@/components/shared/spinner';
import html2canvas from 'html2canvas-pro';

interface ResumeToolkitProps {
	toolTip: ReactZoomPanPinchContentRef;
}

const ResumeToolkit = ({ toolTip }: ResumeToolkitProps) => {
	const [loading, setLoading] = useState(false);
	const resumeData = useResume();

	const handleDownload = async () => {
		setLoading(true);

		const { profile, projects, experiences, educations, skills, languages } = resumeData;

		const htmlContent = generateResumeTemplate(
			profile as Profile,
			experiences,
			projects,
			educations,
			skills,
			languages
		);

		const element = document.createElement('div');
		element.innerHTML = htmlContent;
		element.style.position = 'fixed';
		element.style.top = '-9999px';
		document.body.appendChild(element);

		const canvas = await html2canvas(element, {
			backgroundColor: '#fff',
			useCORS: true,
			scale: 2,
			logging: false,
			scrollX: 0,
			scrollY: 0,
		});

		document.body.removeChild(element);
		setLoading(false);

		const link = document.createElement('a');
		link.download = 'resume.png';
		link.href = canvas.toDataURL('image/png');
		link.click();
	};

	return (
		<div className='flex mb-2 absolute top-5 left-2 backdrop-blur-lg rounded z-10 border border-primary/20 flex-col'>
			<Hint asChild label='Zoom In' side='left'>
				<button
					className='hover:bg-muted-foreground/20 py-2.5 px-3.5 border-b border-primary/20'
					onClick={() => toolTip.zoomIn(0.1)}
				>
					<ZoomInIcon className='w-4 h-4' />
				</button>
			</Hint>
			<Hint asChild label='Zoom Out' side='left'>
				<button
					className='hover:bg-muted-foreground/20 py-2.5 px-3.5 border-b border-primary/20'
					onClick={() => toolTip.zoomOut(0.1)}
				>
					<ZoomOutIcon className='w-4 h-4' />
				</button>
			</Hint>
			<Hint asChild label='Reset' side='left'>
				<button
					className='hover:bg-muted-foreground/20 py-2.5 px-3.5 border-b border-primary/20'
					onClick={() => toolTip.resetTransform()}
				>
					<ListRestart className='w-4 h-4' />
				</button>
			</Hint>
			<Hint asChild label='Download' side='left'>
				<button
					className='hover:bg-muted-foreground/20 py-2.5 px-3.5'
					onClick={handleDownload}
					disabled={loading}
				>
					{loading ? <Spinner /> : <Download className='w-4 h-4' />}
				</button>
			</Hint>
		</div>
	);
};

export default ResumeToolkit;
