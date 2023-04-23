import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import GoogleProvider from '@next-auth/google';
import DiscordProvider from '@next-auth/discord';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		Providers.Credentials({
			name: 'Email and Password',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'example@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// Add your email/password authentication logic here
				// If the authentication is successful, return a user object
				const user = {
					id: 1,
					name: 'User',
					email: 'example@example.com',
				};
				return user;
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		async session(session, user) {
			session.user.id = user.id;
			return session;
		},
	},
});
