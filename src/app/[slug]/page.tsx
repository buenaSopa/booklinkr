"use client"

import { addBook, getBookByListOfBookId, getBookBySlug } from "@/action/db"
import BookCard from "@/components/bookCard"
import { ComboBoxItemType, Combobox } from "@/components/comboBox"
import HeaderSlug from "@/components/ui/header-slug"
import { Book, mapToBook } from "@/types/book"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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

	useEffect(() => {
		(async () => {
			const res = await getBookBySlug(params.slug)
			console.log(res)
			const listOfBookId = res.map(book => book.book_id)
			const books = await getBookByListOfBookId(listOfBookId)
			setMyBooks(books)
		})()
	}, [])

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
			const response = await fetch(`https://openlibrary.org/search.json?title=${transformString(value)}&limit=5&fields=author_name,cover_edition_key,title,key`)
			const json = await response.json()

			const searchResult = await formatSearch(json.docs)

			setBooks(
				searchResult.map(book => ({
					value: book.key,
					label: book.title + (book.author_name ? " - " + book.author_name : ""),
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
			<div className="grid items-stretch grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4" >
				{myBook.map((book, index) => (
					<BookCard key={index} cover={book.cover} title={book.title} author={book.author_name} />
				))}
			</div>
		</section>
	)
}
