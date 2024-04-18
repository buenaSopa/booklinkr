import {
	integer,
	jsonb,
	pgTable,
	primaryKey,
	serial,
	text,
} from "drizzle-orm/pg-core"
import { users } from "./user"
import { relations, sql } from "drizzle-orm"

export const bookshelf = pgTable("bookshelf", {
	id: text("id").notNull().primaryKey().references(() => users.id),
	slug: text("slug").notNull(),
	code: serial('code').notNull(),
})

export const bookshelfRelation = relations(bookshelf, ({ many }) => ({
	bookshelfBook: many(bookOnBookshelf)
}))

export const book = pgTable("book", {
	work_key: text("work_key").notNull().primaryKey(),
	title: text('title').notNull(),
	author: text('author'),
	cover_url: text('cover_url'),
	ex_link: jsonb('ex_link').default(sql`'{"goodreads": "", "libraryany": ""}'::jsonb`),
})

export const bookRelation = relations(book, ({ many }) => ({
	bookBookself: many(bookOnBookshelf)
}))


export const bookOnBookshelf = pgTable('book_bookshelf', {
	book_id: text("book_id").notNull().references(() => book.work_key),
	bookshelf_id: text("bookself_id").notNull().references(() => bookshelf.id),
	extra: jsonb('extra').default(sql`'{"note": "", "rating": ""}'::jsonb`),
},
	(t) => ({
		pk: primaryKey(t.bookshelf_id, t.book_id)
	})
)

export const bookOnBookshelfRelation = relations(bookOnBookshelf, ({ one }) => ({
	book: one(book, {
		fields: [bookOnBookshelf.book_id],
		references: [book.work_key]
	}),
	bookshelf: one(bookshelf, {
		fields: [bookOnBookshelf.bookshelf_id],
		references: [bookshelf.id]
	})
}))


