'use client';

import { useState } from 'react';
import SectionHeading from '../section-heading';
import FormTrigger from '../form-trigger';
import ExperienceForm from './form';
import { Experience as ExperienceType } from '../resume.types';
import { useResume } from '../use-resume.store';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import SectionCard from '../section.card';

const Experience = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [experienceId, setExperienceId] = useState<string | null>(null);

	const experiences = useResume(state => state.experiences);
	const deleteExperience = useResume(state => state.deleteExperience);
	const updatePosition = useResume(state => state.setPositionsExperience);

	let defaultVal: ExperienceType = val;

	if (experienceId) {
		defaultVal = experiences.find(exp => exp.expId === experienceId)!;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(experiences ?? []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		const bulkUpdateData = updatedChapters.map(section => ({
			...section,
			position: items.findIndex(item => item.expId === section.expId),
		}));

		updatePosition(bulkUpdateData);
	};

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Experiences' icon='experience' />

			{experiences.length > 0 && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='experiences'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col mt-4 space-y-1'
							>
								{experiences
									.sort((a, b) => a.position - b.position)
									.map((education, index) => (
										<SectionCard
											id={education.expId}
											index={index}
											key={education.expId}
											primaryHeading={education.company}
											secondaryHeading={education.role}
											onDelete={deleteExperience}
											setIsOpen={setOpen}
											setItemId={setExperienceId}
										/>
									))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<ExperienceForm
				isOpened={open}
				setIsOpened={setOpen}
				selectedExperience={experienceId}
				defaultVal={defaultVal}
			/>

			<FormTrigger setOpen={setOpen} setSelectedItem={setExperienceId} />
		</section>
	);
};

export default Experience;

const val = {
	company: '',
	endDate: '',
	startDate: '',
	role: '',
	description: '',
	location: '',
	expId: '',
	position: 0,
};
