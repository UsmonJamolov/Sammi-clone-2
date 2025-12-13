'use client';

import { updateCourse, uploadPreviewImage } from '@/actions/admin.action';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CourseType } from '@/types/app.type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
	courseData: CourseType;
}

const Thumbnail = ({ courseData }: Props) => {
	const [videoUrl, setVideoUrl] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [uploadingVideo, setUploadingVideo] = useState(false);
	const [uploadingImage, setUploadingImage] = useState(false);

	const handleVideoUpload = async () => {
		setUploadingVideo(true);
		try {
			await updateCourse(courseData._id, { previewVideo: videoUrl });
			toast.success('Video uploaded successfully');
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setUploadingVideo(false);
		}
	};

	const handleImageUpload = async () => {
		if (!file) return;
		setUploadingImage(true);
		try {
			const formData = new FormData();
			formData.append('previewImage', file);

			await uploadPreviewImage(courseData._id, formData);
			toast.success('Image uploaded successfully');
			setFile(null);
		} catch (error) {
			const result = error as Error;
			toast.error(result.message);
		} finally {
			setUploadingImage(false);
		}
	};

	useEffect(() => {
		if (courseData.previewVideo) {
			setVideoUrl(courseData.previewVideo);
		}
	}, [courseData]);

	return (
		<div className='bg-sidebar p-6 rounded-md border'>
			<h1 className='text-2xl font-semibold font-space-grotesk'>Thumbnails</h1>
			<Separator className='my-4' />
			<div className='grid grid-cols-2 gap-x-4'>
				<div className='flex flex-col space-y-2'>
					<div className='aspect-video w-full rounded-md bg-muted relative'>
						{courseData.previewImage && (
							<>
								<Image
									src={courseData.previewImage}
									alt={courseData.title}
									fill
									className='object-cover rounded-md'
								/>
							</>
						)}
						{!courseData.previewImage && (
							<div className='absolute inset-0 flex items-center justify-center text-muted-foreground'>
								No Preview Image
							</div>
						)}
						{uploadingImage && (
							<div className='absolute inset-0 flex items-center justify-center bg-opacity-50 bg-muted rounded-md'>
								<Spinner />
							</div>
						)}
					</div>
					<div className='flex gap-2 items-center'>
						<Input
							type='file'
							accept='image/*'
							onChange={e => setFile(e.target.files?.[0] || null)}
							disabled={uploadingImage}
						/>
						<Button onClick={handleImageUpload} disabled={uploadingImage}>
							{uploadingImage ? 'Uploading...' : 'Upload'}
						</Button>
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<div className='aspect-video w-full rounded-md bg-muted relative'>
						{courseData.previewVideo && (
							<div
								dangerouslySetInnerHTML={{ __html: courseData.previewVideo }}
								className='absolute inset-0 flex items-center justify-center rounded-md'
							></div>
						)}
						{!courseData.previewVideo && (
							<div className='absolute inset-0 flex items-center justify-center text-muted-foreground'>
								No Preview Video
							</div>
						)}
						{uploadingVideo && (
							<div className='absolute inset-0 flex items-center justify-center bg-opacity-50 bg-muted rounded-md'>
								<Spinner />
							</div>
						)}
					</div>
					<div className='flex gap-2 items-center'>
						<Input
							placeholder='Enter Video URL'
							disabled={uploadingVideo}
							value={videoUrl}
							onChange={e => setVideoUrl(e.target.value)}
						/>
						<Button
							onClick={handleVideoUpload}
							disabled={uploadingVideo || videoUrl === courseData.previewVideo}
						>
							{uploadingVideo ? 'Uploading...' : 'Upload'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Thumbnail;
