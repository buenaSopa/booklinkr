import NextAuth from "next-auth"
import Google from "@auth/core/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
})



// For production: https://{YOUR_DOMAIN}/api/auth/callback/google
// For development: http://localhost:3000/api/auth/callback/google
