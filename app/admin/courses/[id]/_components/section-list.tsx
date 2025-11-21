'use client';
import { deleteSection, updateSection } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SectionType } from '@/types/app.type';
import { Grip, List, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
interface SectionListProps {
    sections: SectionType[];
}
const SectionList = ({ sections }: SectionListProps) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(sections || []);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
        const updatedSections = items.slice(startIndex, endIndex + 1);
        const data = updatedSections.map(s => ({
            _id: s._id,
            position: items.findIndex(i => i._id === s._id) + 1,
        }));
        const promise = Promise.all(data.map(s => updateSection(s._id, { position: s.position })));
        toast.promise(promise, {
            loading: 'Updating sections...',
            success: 'Sections updated successfully',
            error: 'Failed to update sections',
        });
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='sections'>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-1'>
                        {sections.map((section, idx) => (
                            <SectionCard key={section._id} section={section} index={idx} />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default SectionList;
function SectionCard({ section, index }: { section: SectionType; index: number }) {
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const onDelete = async () => {
        const isConfirm = confirm('Are you sure you want to delete this section?');
        if (!isConfirm) return;
        try {
            setLoading(true);
            await deleteSection(section._id, section.course.toString());
            toast.success('Section deleted successfully');
        } catch (error) {
            const result = error as Error;
            toast.error(result.message);
        } finally {
            setLoading(false);
        }
    };
    const onUpdateSection = async (title: string) => {
        try {
            setLoading(true);
            await updateSection(section._id, { title });
            toast.success('Section updated successfully');
            setEdit(false);
        } catch (error) {
            const result = error as Error;
            toast.error(result.message);
        } finally {
            setLoading(false);
        }
    };
    const debouncedUpdate = debounce(onUpdateSection, 1000);
    return (
        <Draggable draggableId={section._id} index={index}>
            {provided => (
                <div
                    className='flex items-center gap-x-2 rounded-md text-sm border-b bg-secondary group relative'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {loading && (
                        <div className='absolute inset-0 bg-background/70 flex items-center justify-center rounded-md z-10 animate-pulse'>
                            <Spinner />
                        </div>
                    )}
                    <div
                        className='rounded-l-md border-r border-r-foreground/30 px-2 py-3 transition-all hover:bg-foreground/10 cursor-pointer'
                        {...provided.dragHandleProps}
                    >
                        <Grip />
                    </div>
                    {edit && (
                        <div className='flex items-center w-1/2 relative'>
                            <Input
                                defaultValue={section.title}
                                className='flex-1 bg-sidebar focus-visible:ring-0'
                                onChange={e => debouncedUpdate(e.target.value)}
                            />
                            <Button
                                size={'icon'}
                                className='size-7 absolute right-1'
                                onClick={() => setEdit(false)}
                            >
                                <X />
                            </Button>
                        </div>
                    )}
                    {!edit && <span>{section.title}</span>}
                    <div className='ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-x-1'>
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            onClick={() => setEdit(true)}
                            disabled={loading}
                        >
                            Edit
                        </Button>
                        <Button size={'sm'} variant={'destructive'} onClick={onDelete} disabled={loading}>
                            Delete
                        </Button>
                        <Button size={'sm'} disabled={loading}>
                            <List />
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}