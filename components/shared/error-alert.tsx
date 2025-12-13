import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
	message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
	return (
		<div className='w-full border border-destructive/50 border-dashed bg-destructive/10 rounded-lg p-4'>
			<div className='flex items-center gap-2 text-sm'>
				<AlertCircle className='text-destructive' />
				<p className='font-space-grotesk font-semibold'>{message}</p>
			</div>
		</div>
	);
};

export default ErrorAlert;
