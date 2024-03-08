"use client"

import { ComboBoxItemType, Combobox } from "@/components/comboBox"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import HeaderSlug from "@/components/ui/header-slug"
import { Book } from "@/types/book"
import { useState } from "react";

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

	async function fetchDescription(key: string): Promise<string> {
		const url = `https://openlibrary.org${key}.json`;
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				return data.description || '';
			} else {
				return '';
			}
		} catch (error) {
			console.error("Error fetching description:", error);
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
	const [loading, setLoading] = useState(false)

	const handleBookSearchChanged = async (value: string) => {
		setLoading(true)
		try {
			console.log(transformString(value))
			const response = await fetch(`https://openlibrary.org/search.json?title=${transformString(value)}&limit=5&fields=author_name,cover_edition_key,title,key`)
			const json = await response.json()

			const searchResult = await formatSearch(json.docs)

			console.log(searchResult)
			setBooks(
				searchResult.map(book => ({
					value: book.key,
					label: book.title + (book.author_name ? " - " + book.author_name : ""),
					url: book.cover
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
			<Combobox
				className='w-full'
				loading={loading}
				items={book}
				onSelect={value => console.log(value)}
				onSearchChange={handleBookSearchChanged}
			/>
			<div>
				<pre>

				</pre>
			</div>
		</section>
	)
}
