'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type SectionType = {
	id: string;
	title: string;
	lessons: { id: string; title: string }[];
};

const SectionList = () => {
	const [currentSection, setCurrentSection] = useState('');

	const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const s = searchParams.get('s');

	useEffect(() => {
		setCurrentSection(s!);
	}, [s]);

	function onSelectSection(sectionId: string) {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		const val = sectionId.trim();
		setCurrentSection(val);
		if (val) {
			current.set('s', val);
		} else {
			current.delete('s');
		}
		const search = current.toString();
		const query = search ? `?${search}` : '';
		router.push(`${pathname}${query}`, { scroll: false });
	}

	const renderLesson = (lesson: { id: string; title: string }, sectionId: string) => {
		return (
			<Link
				className={cn(
					'flex items-center gap-x-2 text-sm h-12 hover:bg-secondary px-2',
					lesson.id === lessonId && 'bg-secondary font-medium'
				)}
				key={lesson.id}
				href={`/curriculum/courses/${slug}/${lesson.id}?s=${sectionId}`}
			>
				<BadgeCheck size={16} />
				<span className='text-sm'>{lesson.title}</span>
			</Link>
		);
	};

	const renderSection = (section: SectionType) => {
		return (
			<AccordionItem key={section.id} value={section.id}>
				<AccordionTrigger
					className={cn(
						'hover:no-underline cursor-pointer px-2 rounded-none',
						section.id === currentSection && 'bg-secondary/50 font-medium'
					)}
				>
					{section.title}
				</AccordionTrigger>
				<AccordionContent className='p-0'>
					{section.lessons.map(lesson => renderLesson(lesson, section.id))}
				</AccordionContent>
			</AccordionItem>
		);
	};

	return (
		<Accordion
			type='single'
			defaultValue={currentSection}
			value={currentSection}
			collapsible
			onValueChange={val => onSelectSection(val)}
		>
			{sections.map(section => renderSection(section))}
		</Accordion>
	);
};

export default SectionList;

const sections = [
	{
		id: '1',
		title: 'Introduction',
		lessons: [
			{ id: '1111710153', title: 'What is JavaScript?' },
			{ id: '1117857125', title: 'Setting up your environment' },
			{ id: '1115899220', title: 'Your first JavaScript program' },
		],
	},
	{
		id: '2',
		title: 'Getting Started',
		lessons: [
			{ id: '1096930005', title: 'Variables and Data Types' },
			{ id: '1108123122', title: 'Functions and Scope' },
			{ id: '1107693702', title: 'Control Structures' },
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