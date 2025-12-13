'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import SectionHeading from '../section-heading';
import { useResume } from '../use-resume.store';
import { Project as ProjectType } from '../resume.types';
import FormTrigger from '../form-trigger';
import SectionCard from '../section.card';
import { formatLink } from '@/lib/utils';
import { useState } from 'react';
import ProjectForm from './form';

const Project = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [projectId, setProjectId] = useState<string | null>(null);

	const projects = useResume(state => state.projects);
	const deleteProject = useResume(state => state.deleteProject);
	const updatePosition = useResume(state => state.setPositionsProject);

	let defaultVal: ProjectType = val;

	if (projectId) {
		defaultVal = projects.find(pro => pro.projectId === projectId)!;
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(projects ?? []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		const bulkUpdateData = updatedChapters.map(section => ({
			...section,
			position: items.findIndex(item => item.projectId === section.projectId),
		}));

		updatePosition(bulkUpdateData);
	};

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Projects' icon='project' />

			{projects.length > 0 && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='projects'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col mt-4 space-y-1'
							>
								{projects
									.sort((a, b) => a.position - b.position)
									.map((education, index) => (
										<SectionCard
											id={education.projectId}
											index={index}
											key={education.projectId}
											primaryHeading={education.projectName}
											secondaryHeading={formatLink(education.deploymentLink || '')}
											onDelete={deleteProject}
											setIsOpen={setOpen}
											setItemId={setProjectId}
										/>
									))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<ProjectForm
				isOpened={open}
				setIsOpened={setOpen}
				selectedProject={projectId}
				defaultVal={defaultVal}
			/>

			<FormTrigger setOpen={setOpen} setSelectedItem={setProjectId} />
		</section>
	);
};

export default Project;

const val = {
	projectId: '',
	projectName: '',
	deploymentLink: '',
	projectDescription: '',
	resumeIdentifier: '',
	position: 0,
};
