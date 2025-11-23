mport { CourseType } from '@/types/app.type';
import CreateLessonModal from './create-lesson.modal';
import { Separator } from '@/components/ui/separator';
import { getLessons } from '@/actions/admin.action';
import LessonList from './lesson-list';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

inteface LessonProps {
    courseData: CourseType;
    sectionId?: string
}

const Lesson = async ({sectionId}: LessonProps) => {
    const {data} = await getLessons(sectionId || '')

    return (
        <div className="bg-sidebar p-6 rounded-md border">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold font-space-grotesk">Lessons</h1>
                <CreateLessonModal>
                    <Button size={'sm'}>
                        <span>Add</span>
                    </Button>
                </CreateLessonModal>
            </div>

            {data.length === 0 && (
                <p className="text-center py-10 text-muted-foreground">No lessons found</p>
            )}
            <LessonList lessons={data} />
        </div>
    )
}

export default Lesson