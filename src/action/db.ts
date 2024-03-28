"use server"

import { db } from "@/db"
import { and, count, eq, sql } from "drizzle-orm"
import { bookshelf, book, bookOnBookshelf } from "@/db/schema"
import { Book, mapToBook, mapToBookFromDB } from "@/types/book"

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

export async function checkBookshelfExistBySlug(slug: string) {
	try {
		const result = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.slug, slug)
		})

		console.log(result)
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

		const qbook = await db.query.book.findFirst({
			where: eq(book.work_key, book_obj.key)
		})

		// if only book exist and both link is empty, i update the ex link
		// @ts-ignore
		if (qbook && Object.values(qbook.ex_link).every(value => value === '')) {
			await db.update(book).set({ ex_link: sql`${book_obj.ex_link}::jsonb` }).where(eq(book.work_key, book_obj.key))
		}

		// if book no exist, add book
		if (!qbook) {
			await db.insert(book).values({ title: book_obj.title, cover_url: book_obj.cover, author: book_obj.author_name, work_key: book_obj.key, ex_link: sql`${book_obj.ex_link}::jsonb` })
		} 

		const bookshelf_obj = await db.query.bookshelf.findFirst({
			where: eq(bookshelf.slug, slug)
		})

		await db.insert(bookOnBookshelf).values({ book_id: book_obj.key, bookshelf_id: bookshelf_obj?.id! })

		return true

	} catch (e) {
		console.log(e)
		return false
	}
}

export async function removeBookByKeyAndBookshelfId(key: string, bookshelfId: string) {
	console.log(key, bookshelfId)
	try {
		await db.delete(bookOnBookshelf).where(
			and(eq(bookOnBookshelf.book_id, key), eq(bookOnBookshelf.bookshelf_id, bookshelfId))
		)
		return true

	} catch (err) {
		console.log(err)
		return false
	}
}


export async function getBookByBookshelfId(bookshelfId: string) {
	try {
		const res = await db.select().from(bookOnBookshelf).where(eq(bookOnBookshelf.bookshelf_id, bookshelfId))
		// console.log(res)
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
			listOfBook.push(mapToBookFromDB(one_book))
		}
		console.log(listOfBook)
		return listOfBook
	} catch (err) {
		return []
	}
}

export async function getTotalBookCount() {
	try {
		const total_book_count = await db.select({ count: count() }).from(book)
		return total_book_count![0].count
	} catch (err) {
		console.log("getTotalBookCount error")
		return null
	}
}

export async function getTotalBookshelfCount() {
	try {
		const total_bookshelf_count = await db.select({ count: count() }).from(bookshelf)
		return total_bookshelf_count![0].count
	} catch (err) {
		console.log("getTotalBookshelfCount error")
		return null
	}
}

