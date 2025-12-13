import { Dispatch, SetStateAction, useEffect } from 'react';
import { Language } from '../resume.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { languageSchema } from '@/lib/validation';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface LanguageFormProps {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	selectedLanguage: string | null;
	defaultVal: Language | undefined;
}

const LanguageForm = ({
	isOpened,
	setIsOpened,
	selectedLanguage,
	defaultVal,
}: LanguageFormProps) => {
	const form = useForm<Language>({
		resolver: zodResolver(languageSchema),
		defaultValues: defaultVal,
	});

	const languages = useResume(state => state.languages);

	const onCreate = useResume(state => state.setLanguages);
	const onEdit = useResume(state => state.updateLanguage);

	useEffect(() => {
		form.reset(defaultVal);
	}, [defaultVal, form]);

	function onSubmit(data: Language) {
		if (selectedLanguage) {
			onEdit(data.languageId, { ...data });
		} else {
			onCreate({ ...data, languageId: crypto.randomUUID(), position: languages.length + 1 });
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
									name='languageName'
									render={({ field }) => (
										<FormItem className='col-span-2 sm:col-span-1 space-y-0'>
											<FormLabel className='font-geist_mono'>Language</FormLabel>
											<FormControl>
												<Input {...field} className='text-base bg-sidebar' placeholder='English' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='proficiency'
									render={({ field }) => (
										<FormItem className='col-span-2 sm:col-span-1 space-y-0'>
											<FormLabel>Level</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} disabled={field.disabled}>
													<SelectTrigger className='w-full bg-sidebar'>
														<SelectValue placeholder='Beginner' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='Beginner'>Beginner</SelectItem>
														<SelectItem value='Intermediate'>Intermediate</SelectItem>
														<SelectItem value='Advanced'>Advanced</SelectItem>
														<SelectItem value='Fluent'>Fluent</SelectItem>
													</SelectContent>
												</Select>
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

export default LanguageForm;
