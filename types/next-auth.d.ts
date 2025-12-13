import { DefaultSession } from 'next-auth';
import { UserType } from './app.type';

declare module 'next-auth' {
	interface Session {
		user: UserType & DefaultSession['user'];
	}
}
