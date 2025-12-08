'use client';

import { useState } from 'react';
import SectionHeading from '../section-heading';
import FormTrigger from '../form-trigger';
import ExperienceForm from './form';
import { Experience as ExperienceType } from '../resume.types';

const Experience = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [experienceId, setExperienceId] = useState<string | null>(null);

	const defaultVal: ExperienceType = val;

	return (
		<section className='flex flex-col space-y-2 w-full'>
			<SectionHeading title='Experiences' icon='experience' />

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