'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Edit2, GripVertical, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface SectionCardProps {
	index: number;
	id: string;
	primaryHeading: string;
	secondaryHeading: string | string[];
	onDelete: (id: string) => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setItemId?: Dispatch<SetStateAction<string | null>>;
}

const SectionCard = (props: SectionCardProps) => {
	const { index, id, primaryHeading, secondaryHeading, onDelete, setIsOpen, setItemId } = props;

	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<div className='flex gap-1 group' ref={provided.innerRef} {...provided.draggableProps}>
					<div
						className='cursor-grab rounded-[2px] flex items-center border border-accent w-[3rem] justify-center bg-sidebar'
						{...provided.dragHandleProps}
					>
						<GripVertical />
					</div>

					<div className='relative px-2 py-1.5 rounded-[2px] border shadow-sm flex w-full bg-sidebar'>
						<div
							className='self-center flex-1 cursor-pointer'
							onClick={() => {
								setIsOpen(true);
								setItemId?.(id);
							}}
						>
							<h2 className='text-lg capitalize'>{primaryHeading}</h2>
							{Array.isArray(secondaryHeading) ? (
								<p className='text-sm text-muted-foreground truncate-text'>
									{secondaryHeading.join(', ')}
								</p>
							) : (
								<p className='text-sm text-muted-foreground truncate-text'>{secondaryHeading}</p>
							)}
						</div>

						<div className='flex items-center gap-x-2 opacity-0 group-hover:opacity-100 transition-all'>
							<Edit2
								className='size-4 hover:text-muted-foreground cursor-pointer'
								onClick={() => {
									setIsOpen(true);
									setItemId?.(id);
								}}
							/>
							<Trash2
								className='size-4 hover:text-muted-foreground cursor-pointer'
								onClick={() => {
									const isConfirmed = confirm('Are you sure you want to delete this item?');
									if (!isConfirmed) return;
									onDelete(id);
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default SectionCard;
