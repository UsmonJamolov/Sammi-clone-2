import { LessonType } from '@/types/app.type';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDuration(lessons: LessonType[]) {
	const totalMinutes = lessons.reduce(
		(acc, lesson) => acc + parseInt(lesson.hours) * 60 + parseInt(lesson.minutes),
		0
	);

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const hoursDisplay = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
	const minutesDisplay = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : '';

	return `${hoursDisplay}${hours > 0 && minutes > 0 ? ' ' : ''}${minutesDisplay}`;
}

export const getDurationInMinutes = (lesson: LessonType) => {
	return parseInt(lesson.hours) * 60 + parseInt(lesson.minutes);
};