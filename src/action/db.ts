"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { bookshelf } from "@/db/schema"

export async function addBook() {
	const result = await db.query.users.findMany()

	console.log(result)
	return result


	// return true false with toast maybe
}

export async function checkBookshelfExist(userId: string) {
	const result = await db.query.bookshelf.findFirst({
		where: eq(bookshelf.id, userId)
	})


	return result
}

