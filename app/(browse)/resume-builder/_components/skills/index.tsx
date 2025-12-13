'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import SectionHeading from '../section-heading';
import SectionCard from '../section.card';
import FormTrigger from '../form-trigger';
import { useResume } from '../use-resume.store';
import { Skill as SkillType } from '../resume.types';
import SkillsForm from './form';

const Skills = () => {
	const [open, setOpen] = useState(false);
	const [skillId, setSkillId] = useState<string | null>(null);

	const skills = useResume(state => state.skills);
	const deleteSkill = useResume(state => state.deleteSkill);
	const updatePosition = useResume(state => state.setPositionsSkill);

	let defaultVal: SkillType = val;

	if (skillId) {
		defaultVal = skills.find(exp => exp.skillId === skillId)!;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(skills ?? []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		const bulkUpdateData = updatedChapters.map(section => ({
			...section,
			position: items.findIndex(item => item.skillId === section.skillId),
		}));

		updatePosition(bulkUpdateData);
	};

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Skills' icon='skill' />

			{skills.length > 0 && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='skills'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col mt-4 space-y-1'
							>
								{skills
									.sort((a, b) => a.position - b.position)
									.map((education, index) => (
										<SectionCard
											id={education.skillId}
											index={index}
											key={education.skillId}
											primaryHeading={education.skillCategories}
											secondaryHeading={education.skillList || ''}
											onDelete={deleteSkill}
											setIsOpen={setOpen}
											setItemId={setSkillId}
										/>
									))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<SkillsForm
				isOpened={open}
				setIsOpened={setOpen}
				selectedSkill={skillId}
				defaultVal={defaultVal}
			/>

			<FormTrigger setSelectedItem={setSkillId} setOpen={setOpen} />
		</section>
	);
};

export default Skills;

const val = {
	skillId: '',
	skillCategories: '',
	skillList: '',
	resumeIdentifier: '',
	position: 0,
};
