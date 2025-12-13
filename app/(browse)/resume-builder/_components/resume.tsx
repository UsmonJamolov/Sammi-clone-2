'use client';

import { useRef } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import ResumeToolkit from './resume-toolkit';
import MyResume from '../my-resume';

const Resume = () => {
	const resumeRef = useRef(null);

	return (
		<div className='p-4 relative w-full'>
			<TransformWrapper
				ref={resumeRef}
				centerOnInit={false}
				maxScale={1}
				minScale={0.2}
				initialScale={0.7}
				limitToBounds={true}
				smooth={true}
				initialPositionY={0}
				initialPositionX={0}
			>
				{toolTip => (
					<>
						<ResumeToolkit toolTip={toolTip} />
						<TransformComponent wrapperStyle={{ width: '100%', height: '80vh' }}>
							<div
								ref={resumeRef}
								style={{
									backgroundColor: 'white',
									boxShadow: '0 0 10px rgba(0,0,0,0.1)',
									transformOrigin: 'top left',
								}}
							>
								<MyResume />
							</div>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
		</div>
	);
};

export default Resume;
