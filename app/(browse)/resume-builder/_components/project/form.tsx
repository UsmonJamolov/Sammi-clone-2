import { Dispatch, SetStateAction, useEffect } from 'react';
import { Project } from '../resume.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/lib/validation';
import { useResume } from '../use-resume.store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextEditor from '@/components/shared/text-editor';
import { Button } from '@/components/ui/button';

interface ProjectFormProps {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	selectedProject: string | null;
	defaultVal: Project | undefined;
}

const ProjectForm = ({ isOpened, setIsOpened, selectedProject, defaultVal }: ProjectFormProps) => {
	const form = useForm<Project>({
		resolver: zodResolver(projectSchema),
		defaultValues: defaultVal,
	});

	const projects = useResume(state => state.projects);

	const onCreate = useResume(state => state.setProjects);
	const onEdit = useResume(state => state.updateProject);

	useEffect(() => {
		form.reset(defaultVal);
	}, [defaultVal, form]);

	function onSubmit(data: Project) {
		if (selectedProject) {
			onEdit(data.projectId, { ...data });
		} else {
			onCreate({ ...data, projectId: crypto.randomUUID(), position: projects.length + 1 });
		}
		setIsOpened(false);
	}

	return (
		<div className='max-w-[550px]'>
			<Dialog open={isOpened} onOpenChange={val => setIsOpened(val)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Projects</DialogTitle>
					</DialogHeader>

					<div className='px-4 md:px-0 max-h-screen overflow-y-scroll'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='w-full md:px-1 mb-2 md:mb-1 grid grid-cols-1 gap-4 md:grid-cols-2'
							>
								<FormField
									control={form.control}
									name='projectName'
									render={({ field }) => (
										<FormItem className='col-span-2 space-y-0'>
											<FormLabel className='font-geist_mono '>Project name</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='Sammi Portfolio'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='deploymentLink'
									render={({ field }) => (
										<FormItem className='w-full col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Deployment link</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='https://sammi.ac'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='repoLink'
									render={({ field }) => (
										<FormItem className='w-full col-span-2 md:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Repository link</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='github.com/sammi'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='projectDescription'
									render={({ field }) => (
										<FormItem className='col-span-2 space-y-0'>
											<FormLabel className='font-geist_mono'>Project description</FormLabel>
											<FormControl>
												<TextEditor value={field.value!} fieldName='projectDescription' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type='submit' className='w-full rounded-full col-span-2' size={'lg'}>
									Save
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProjectForm;
