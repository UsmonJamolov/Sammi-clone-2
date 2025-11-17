import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { axiosClient } from './http';

export const auth: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		Credentials({
			name: 'Credentials',
			credentials: { userId: { label: 'User ID', type: 'text' } },
			async authorize(credentials) {
				const { data } = await axiosClient.get(`/api/user/me/${credentials?.userId}`);
				if (data.success) {
					return JSON.parse(JSON.stringify({ email: data.user.email, name: data.user._id }));
				}

				return null;
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			const { data } = await axiosClient.get(`/api/user/me/${session.user?.name}`);
			if (data.success) {
				session.user = data.user;
			}
			return session;
		},
	},
	session: { strategy: 'jwt' },
	jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
	secret: process.env.NEXTAUTH_SECRET,
};