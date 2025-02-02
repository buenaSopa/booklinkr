"use client"

import { addBook, checkBookshelfExistBySlug, getBookByListOfBookId, getBookBySlug, getUserSlug } from "@/action/db"
import BookCard from "@/components/bookCard"
import { ComboBoxItemType, Combobox } from "@/components/comboBox"
import HeaderSlug from "@/components/ui/header-slug"
import { transformString } from "@/lib/utils"
import { Book, mapToBook } from "@/types/book"
import { useSession } from "next-auth/react"
import { useEffect, useState, useTransition } from "react";


async function formatSearch(jsonData: any[]): Promise<Book[]> {
	const beautifiedData: Book[] = [];
	// console.log(jsonData)

	// Process items, preserving original data and adding ex_link
	const processedItems = jsonData.map((item) => {
		return {
			...item, // Spread operator to copy existing properties
			ex_link: {
				goodreads: item.id_goodreads?.[0] ?? "",
				libraryany: item.id_librarything?.[0] ?? "",
			},
		};
	});
	// Start all cover fetches in parallel
	const coverFetchPromises = processedItems.map(async (item) => {

		const url = `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`;

		try {
			if (!item.cover_edition_key) {
				return item
			}
			const response = await fetch(url);
			if (response.ok) {
				return { ...item, cover: url }; // Return item with cover URL
			} else {
				return item; // Return item without cover if fetch fails
			}
		} catch (error) {
			console.error("Error fetching cover:", error);
			return item; // Return item without cover if error occurs
		}
	});

	// Wait for all fetches to complete
	const formattedItems = await Promise.all(coverFetchPromises);

	beautifiedData.push(...formattedItems);

	return beautifiedData;
}

export default function Page({ params }: { params: { slug: string } }) {
	const [book, setBooks] = useState<ComboBoxItemType[]>([])
	const [myBook, setMyBooks] = useState<Book[]>([])
	const [loading, setLoading] = useState(false)
	const session = useSession()
	const [lib, setLib] = useState(true)
	const [authUserSlug, setAuthUserSlug] = useState("")

	useEffect(() => {
		(async () => {
			// get authed user slug to see if is his page for combobox visibility
			if (session.status == "authenticated") {
				// @ts-ignore
				setAuthUserSlug(await getUserSlug(session.data.user?.id!))
			}

			// check if library exist
			const exist = await checkBookshelfExistBySlug(params.slug)
			if (!exist) {
				setLib(false)
				return null
			}

			// get book
			const res = await getBookBySlug(params.slug)
			// console.log(res)
			const listOfBookId = res.map(book => book.book_id)
			const books = await getBookByListOfBookId(listOfBookId)
			setMyBooks(books)
		})()
	}, [])

	function trimExtraSpaces(text: string): string {
		// Remove leading and trailing whitespaces
		text = text.trim();

		// Split the string into words
		const words = text.split(/\s+/);

		// Join the words back with a single space between them
		return words.join(" ");
	}

	const addToBookshelf = async (book: Book) => {
		// server action check if book is in db, if book is in db, is duplicate, else just add inside
		try {
			const res = await addBook(book, params.slug)
			setBooks([])
			setMyBooks(myBook => [...myBook, book])
		} catch (err) {
			console.log(err)
		}
	}

	const handleBookSearchChanged = async (value: string) => {
		setLoading(true)
		try {
			console.log(transformString(value))
			// const response = await fetch(`https://openlibrary.org/search.json?title=${transformString(value)}&limit=5&fields=author_name,cover_edition_key,title,key`)
			const query = `https://openlibrary.org/search.json?q=${transformString(value)}&mode=everything&limit=6&fields=author_name,isbn,cover_edition_key,title,key,id_goodreads,id_librarything`
			console.log(query)
			const response = await fetch(query)
			// console.log(`https://openlibrary.org/search.json?q=${transformString(value)}&mode=everything&limit=12&fields=author_name,cover_edition_key,title,key,id_goodreads,id_librarything`)
			const json = await response.json()
			const searchResult = await formatSearch(json.docs)

			setBooks(
				searchResult.map(book => ({
					value: book.key,
					label: trimExtraSpaces(book.title) + (book.author_name ? " - " + book.author_name : ""),
					url: book.cover,
					book: book
				})) || []
			)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="text-2xl">
			<HeaderSlug shelf={params.slug} />
			{
				session.status != "unauthenticated" &&
				// check if params.slug == session.user.slug
				(params.slug == authUserSlug) &&
				<Combobox
					className='w-full'
					loading={loading}
					items={book}
					onSelect={value => {
						// console.log(value)
						addToBookshelf(value)
					}}
					onSearchChange={handleBookSearchChanged}
				/>
			}
			{
				lib ? (
					<div className="grid items-stretch grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4" >
						{myBook.map((book, index) => (
							<BookCard key={index} book={book} myBooks={myBook} setMyBooks={setMyBooks} isUserBookshelf={session.status != "unauthenticated" && (params.slug == authUserSlug)} />
						))}
					</div>
				) : (
					<div className="pt-40 text-center">
						Bookshelf does not exist!!!
					</div>
				)
			}
		</section>
	)
}
