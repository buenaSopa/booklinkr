"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { IconSearch } from "@tabler/icons-react"
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command"
import { useDebouncedCallback } from 'use-debounce'

export const dog = [
	{
		"title": "The Secret Garden",
		"author": "Frances Hodgson Burnett",
		"genre": "Children's literature",
		"publication_year": 1911,
		"isbn": "9780141321066",
		"publisher": "Penguin Classics"
	},
	{
		"title": "The Catcher in the Rye",
		"author": "J.D. Salinger",
		"genre": "Literary fiction",
		"publication_year": 1951,
		"isbn": "9780316769488",
		"publisher": "Little, Brown and Company"
	},
	{
		"title": "To Kill a Mockingbird",
		"author": "Harper Lee",
		"genre": "Southern Gothic",
		"publication_year": 1960,
		"isbn": "9780061120084",
		"publisher": "J.B. Lippincott & Co."
	},
	{
		"title": "1984",
		"author": "George Orwell",
		"genre": "Dystopian fiction",
		"publication_year": 1949,
		"isbn": "9780451524935",
		"publisher": "Signet Classics"
	},
	{
		"title": "Pride and Prejudice",
		"author": "Jane Austen",
		"genre": "Romance",
		"publication_year": 1813,
		"isbn": "9780141439518",
		"publisher": "Penguin Classics"
	}
]

export default function AddButton() {
	const [open, setOpen] = useState(false)

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false)
		command()
	}, [])


	return (
		<div>
			<Button
				className="bottom-4 right-4 absolute text-2xl"
				onClick={() => setOpen(true)}
			>
				<div className="flex items-center lg:gap-3 text-black">
					<IconSearch className="text-lightbrown" />
				</div>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen} >
				<CommandInput placeholder="Search for a book" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{dog.map((navItem) => (
						<CommandItem
							key={navItem.isbn}
							value={navItem.title}
							onSelect={() => {
								runCommand(() => console.log())
							}}
						>
							{navItem.title}
						</CommandItem>
					))}
				</CommandList>
			</CommandDialog>
		</div >

	)
}

