"use client"

import { addBook, checkBookshelfExistBySlug, getBookByListOfBookId, getBookBySlug, getUserSlug } from "@/action/db"
import BookCard from "@/components/bookCard"
import { ComboBoxItemType, Combobox } from "@/components/comboBox"
import HeaderSlug from "@/components/ui/header-slug"
import { Book, mapToBook } from "@/types/book"
import { useSession } from "next-auth/react"
import { useEffect, useState, useTransition } from "react";


function transformString(input: string): string {
	const words = input.trim().split(/\s+/);
	const transformedString = words.join('+');

	return transformedString;
}

async function formatSearch(jsonData: any[]): Promise<Book[]> {
	const beautifiedData: Book[] = [];

	async function fetchCover(coverEditionKey: string): Promise<string> {
		if (!coverEditionKey) return '';

		const url = `https://covers.openlibrary.org/b/olid/${coverEditionKey}-M.jpg`;
		try {
			const response = await fetch(url);
			if (response.ok) {
				return url;
			} else {
				return '';
			}
		} catch (error) {
			console.error("Error fetching cover:", error);
			return '';
		}
	}

	for (const item of jsonData) {
		const cover = await fetchCover(item.cover_edition_key);
		// const desc = await fetchDescription(item.key);

		const beautifiedItem: Book = {
			key: item.key || '',
			title: item.title || '',
			author_name: (item.author_name && item.author_name.length > 0) ? item.author_name[0] : '',
			cover: cover,
			// desc: desc
		};
		beautifiedData.push(beautifiedItem);
	}

	return beautifiedData;
}

export default function Page({ params }: { params: { slug: string } }) {
	const [book, setBooks] = useState<ComboBoxItemType[]>([])
	const [myBook, setMyBooks] = useState<Book[]>([])
	const [loading, setLoading] = useState(false)
	const session = useSession()
	const [lib, setLib] = useState(true)
	const [authUserSlug, setAuthUserSlug] = useState("")
	// console.log(session)

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
			console.log(res)
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
			const response = await fetch(`https://openlibrary.org/search.json?q=${transformString(value)}&mode=everything&limit=5&fields=author_name,cover_edition_key,title,key`)
			const json = await response.json()

			const searchResult = await formatSearch(json.docs)
			console.log(searchResult)

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
