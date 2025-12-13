'use client';

import { useState } from 'react';
import { useResume } from '../use-resume.store';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Education as EducationType } from '../resume.types';
import SectionHeading from '../section-heading';
import SectionCard from '../section.card';
import FormTrigger from '../form-trigger';
import EducationForm from './form';

const Education = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [eduId, setEducationId] = useState<string | null>(null);

	const educations = useResume(state => state.educations);
	const deleteEducation = useResume(state => state.deleteEducation);
	const updatePosition = useResume(state => state.setPositionsEducation);

	let defaultVal: EducationType = val;

	if (eduId) {
		defaultVal = educations.find(exp => exp.eduId === eduId)!;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(educations ?? []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		const bulkUpdateData = updatedChapters.map(section => ({
			...section,
			position: items.findIndex(item => item.eduId === section.eduId),
		}));

		updatePosition(bulkUpdateData);
	};

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Education' icon='education' />

			{educations.length > 0 && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='educations'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col mt-4 space-y-1'
							>
								{educations
									.sort((a, b) => a.position - b.position)
									.map((education, index) => (
										<SectionCard
											id={education.eduId}
											index={index}
											key={education.eduId}
											primaryHeading={education.institutionName}
											secondaryHeading={education.degree}
											onDelete={deleteEducation}
											setIsOpen={setOpen}
											setItemId={setEducationId}
										/>
									))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<EducationForm
				isOpened={open}
				setIsOpened={setOpen}
				selectedExperience={eduId}
				defaultVal={defaultVal}
			/>

			<FormTrigger setOpen={setOpen} setSelectedItem={setEducationId} />
		</section>
	);
};

export default Education;

const val = {
	degree: '',
	fieldOfStudy: '',
	startDate: '',
	endDate: '',
	eduId: '',
	institutionName: '',
	description: '',
	resumeIdentifier: '',
	position: 0,
};
