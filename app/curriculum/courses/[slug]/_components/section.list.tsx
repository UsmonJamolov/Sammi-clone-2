'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { LessonType, SectionType } from '@/types/app.type';
import { BadgeCheck, CirclePause, CirclePlay } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SectionListProps {
	sections: SectionType[];
}

const SectionList = ({ sections }: SectionListProps) => {
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

	const renderLesson = (lesson: LessonType, sectionId: string) => {
		return (
			<Link
				className={cn(
					'flex items-center gap-x-2 text-sm h-12 hover:bg-secondary px-2',
					lesson._id === lessonId && 'bg-secondary font-medium'
				)}
				key={lesson._id}
				href={`/curriculum/courses/${slug}/${lesson._id}?s=${sectionId}`}
			>
				{lesson.isCompleted ? (
					<BadgeCheck size={16} className='text-primary' />
				) : lesson._id === lessonId ? (
					<CirclePause size={16} />
				) : (
					<CirclePlay size={16} />
				)}

				<span className='text-sm'>{lesson.title}</span>
			</Link>
		);
	};

	const renderSection = (section: SectionType) => {
		return (
			<AccordionItem key={section._id} value={section._id}>
				<AccordionTrigger
					className={cn(
						'hover:no-underline cursor-pointer px-2 rounded-none',
						section._id === currentSection && 'bg-secondary/50 font-medium'
					)}
				>
					{section.title}
				</AccordionTrigger>
				<AccordionContent className='p-0'>
					{section.lessons.map(lesson => renderLesson(lesson, section._id))}
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