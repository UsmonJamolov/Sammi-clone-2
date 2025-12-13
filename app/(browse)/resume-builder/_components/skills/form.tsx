import { Dispatch, SetStateAction, useEffect } from 'react';
import { Skill } from '../resume.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema } from '@/lib/validation';
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
import { Button } from '@/components/ui/button';

interface SkillsFormProps {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	selectedSkill: string | null;
	defaultVal: Skill | undefined;
}

const SkillsForm = ({ defaultVal, isOpened, selectedSkill, setIsOpened }: SkillsFormProps) => {
	const form = useForm<Skill>({
		resolver: zodResolver(skillSchema),
		defaultValues: defaultVal,
	});

	const skills = useResume(state => state.skills);

	const onCreate = useResume(state => state.setSkills);
	const onEdit = useResume(state => state.updateSkill);

	useEffect(() => {
		form.reset(defaultVal);
	}, [defaultVal, form]);

	function onSubmit(data: Skill) {
		if (selectedSkill) {
			onEdit(data.skillId, { ...data });
		} else {
			onCreate({ ...data, skillId: crypto.randomUUID(), position: skills.length + 1 });
		}
		setIsOpened(false);
	}

	return (
		<div className='max-w-[550px]'>
			<Dialog open={isOpened} onOpenChange={val => setIsOpened(val)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Experience</DialogTitle>
					</DialogHeader>

					<div className='px-4 md:px-0 max-h-screen overflow-y-scroll'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='w-full md:px-1 mb-2 md:mb-1 flex flex-col gap-4'
							>
								<FormField
									control={form.control}
									name='skillCategories'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<FormLabel className='font-geist_mono'>Skill</FormLabel>
											<FormControl>
												<Input {...field} className='text-base bg-sidebar' placeholder='Frontend' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='skillList'
									render={({ field }) => (
										<FormItem className='w-full space-y-0'>
											<FormLabel>Skill List</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='text-base bg-sidebar'
													placeholder='React, Next.js, TailwindCSS'
												/>
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

export default SkillsForm;
