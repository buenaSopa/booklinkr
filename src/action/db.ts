"use server"

import { db } from "@/db"

export async function addBook() {
	const result = await db.query.users.findMany()

	console.log(result)
	return result


	// return true false with toast maybe
} 


