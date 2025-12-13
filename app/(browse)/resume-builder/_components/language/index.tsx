'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import SectionHeading from '../section-heading';
import SectionCard from '../section.card';
import FormTrigger from '../form-trigger';
import { useResume } from '../use-resume.store';
import { Language as LanguageType } from '../resume.types';
import LanguageForm from './form';

const Language = () => {
	const [open, setOpen] = useState(false);
	const [languageId, setLanguageId] = useState<string | null>(null);

	const languages = useResume(state => state.languages);
	const deleteLanguage = useResume(state => state.deleteLanguage);
	const updatePosition = useResume(state => state.setPositionsLanguage);

	let defaultVal: LanguageType = val;

	if (languageId) {
		defaultVal = languages.find(exp => exp.languageId === languageId)!;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(languages ?? []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		const bulkUpdateData = updatedChapters.map(section => ({
			...section,
			position: items.findIndex(item => item.languageId === section.languageId),
		}));

		updatePosition(bulkUpdateData);
	};

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Languages' icon='language' />

			{languages.length > 0 && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='languages'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col mt-4 space-y-1'
							>
								{languages
									.sort((a, b) => a.position - b.position)
									.map((education, index) => (
										<SectionCard
											id={education.languageId}
											index={index}
											key={education.languageId}
											primaryHeading={education.languageName}
											secondaryHeading={education.proficiency || ''}
											onDelete={deleteLanguage}
											setIsOpen={setOpen}
											setItemId={setLanguageId}
										/>
									))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<LanguageForm
				isOpened={open}
				setIsOpened={setOpen}
				selectedLanguage={languageId}
				defaultVal={defaultVal}
			/>

			<FormTrigger setSelectedItem={setLanguageId} setOpen={setOpen} />
		</section>
	);
};

export default Language;

const val = {
	languageId: '',
	languageName: '',
	proficiency: '',
	resumeIdentifier: '',
	position: 0,
};
