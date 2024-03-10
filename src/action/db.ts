"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { bookshelf, book, bookOnBookshelf } from "@/db/schema"
import { Book, mapToBook } from "@/types/book"

export async function checkBookshelfExist(userId: string) {
	try {
		const result = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.id, userId)
		})
		// console.log(result)

		return result
	} catch (err) {
		console.log(err)
		return false
	}
}

export async function createBookshelf(slug: string, userId: string) {
	try {
		// check if slug name is take
		const taken = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.slug, slug)
		})

		if (taken) {
			return false
		}

		// create bookshelf
		const res = await db.insert(bookshelf).values({ slug: slug, id: userId }).returning()
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export async function getUserSlug(userId: string) {
	try {
		const res = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.id, userId),
		})

		return res?.slug
	} catch (err) {
		console.log(err)
		return false
	}
}

export async function addBook(book_obj: Book, slug: string) {
	try {
		try {
			await db.insert(book).values({ title: book_obj.title, cover_url: book_obj.cover, author: book_obj.author_name, work_key: book_obj.key })
		} catch (err) {
			console.log(err)
			console.log("book probably already in db")
		}

		const bookshelf_obj = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.slug, slug)
		})
		console.log(bookshelf_obj)

		await db.insert(bookOnBookshelf).values({ book_id: book_obj.key, bookshelf_id: bookshelf_obj?.id! })

		return true

	} catch (e) {
		console.log(e)
		return false
	}

}


export async function getBookByBookshelfId(bookshelfId: string) {
	try {
		const res = await db.select().from(bookOnBookshelf).where(eq(bookOnBookshelf.bookshelf_id, bookshelfId))
		console.log(res)
		return res
	} catch (err) {
		return false
	}
}

export async function getBookBySlug(slug: string) {
	try {
		const bookshelfId = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.slug, slug),
		})

		const res = await db.select().from(bookOnBookshelf).where(eq(bookOnBookshelf.bookshelf_id, bookshelfId?.id!))
		console.log(res)
		return res
	} catch (err) {
		return []
	}
}


export async function getBookByListOfBookId(keys: string[]) {
	try {
		let listOfBook = []
		for (let key of keys) {
			const one_book = await db.query.book.findFirst({
				where: eq(book.work_key, key)
			})
			listOfBook.push(mapToBook(one_book))
		}
		return listOfBook
	} catch (err) {
		return []
	}

}
