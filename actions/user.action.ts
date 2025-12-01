'use server';

import { auth } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export const getAuthorizedUser = async () => {
	const session = await getServerSession(auth);
	if (!session?.user) redirect('/sign-in');
	return { user: session.user };
};

export const generateToken = async () => {
	const { user } = await getAuthorizedUser();
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
		expiresIn: '1m',
	});
	return token;
};