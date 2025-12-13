'use client';

import { useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useResume } from './use-resume.store';

const useFormField = <T extends object>({ name, control }: UseControllerProps<T>) => {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control });

	const setField = useResume(state => state.setProfile);

	useEffect(() => {
		setField(name, field.value);
	}, [field.value, name, setField]);

	return { field, error };
};

export default useFormField;
