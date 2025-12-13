import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type FormTriggerProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedItem: Dispatch<SetStateAction<string | null>>;
};

const FormTrigger = ({ setOpen, setSelectedItem }: FormTriggerProps) => {
	return (
		<div
			className='flex justify-center items-center gap-2 border-2 border-dashed py-3 cursor-pointer hover:bg-sidebar rounded-lg'
			onClick={() => {
				setSelectedItem(null);
				setOpen(true);
			}}
		>
			<Plus className='w-5 h-5' />
			<p>Add new item</p>
		</div>
	);
};

export default FormTrigger;
