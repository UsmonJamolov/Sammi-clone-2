import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgeCheck } from 'lucide-react';

type SectionType = {
	id: string;
	title: string;
	lessons: { id: string; title: string }[];
};

const SectionList = () => {
	const renderLesson = (lesson: { id: string; title: string }) => {
		return (
			<div
				className='flex items-center gap-x-2 text-sm h-12 hover:bg-secondary px-2'
				key={lesson.id}
			>
				<BadgeCheck size={16} />
				<span className='text-sm'>{lesson.title}</span>
			</div>
		);
	};

	const renderSection = (section: SectionType) => {
		return (
			<AccordionItem key={section.id} value={section.id}>
				<AccordionTrigger className='hover:no-underline cursor-pointer px-2 rounded-none'>
					{section.title}
				</AccordionTrigger>
				<AccordionContent className='p-0'>
					{section.lessons.map(lesson => renderLesson(lesson))}
				</AccordionContent>
			</AccordionItem>
		);
	};

	return <Accordion type='single'>{sections.map(section => renderSection(section))}</Accordion>;
};

export default SectionList;

const sections = [
	{
		id: '1',
		title: 'Introduction',
		lessons: [
			{ id: '1-1', title: 'What is JavaScript?' },
			{ id: '1-2', title: 'Setting up your environment' },
			{ id: '1-3', title: 'Your first JavaScript program' },
		],
	},
	{
		id: '2',
		title: 'Getting Started',
		lessons: [
			{ id: '2-1', title: 'Variables and Data Types' },
			{ id: '2-2', title: 'Functions and Scope' },
			{ id: '2-3', title: 'Control Structures' },
		],
	},
	{
		id: '3',
		title: 'Advanced Topics',
		lessons: [
			{ id: '3-1', title: 'Asynchronous JavaScript' },
			{ id: '3-2', title: 'JavaScript Design Patterns' },
			{ id: '3-3', title: 'Performance Optimization' },
		],
	},
];