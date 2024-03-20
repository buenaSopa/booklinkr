'use client'

import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { IconExternalLink, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { removeBookByKeyAndBookshelfId } from '@/action/db';
import { Book } from '@/types/book';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link';

type BookProps = {
	book: Book
	myBooks: Book[]
	setMyBooks: Dispatch<SetStateAction<Book[]>>;
	isUserBookshelf: boolean
};


const BookCard: React.FC<BookProps> = ({ book, myBooks, setMyBooks, isUserBookshelf }) => {
	const session = useSession()
	const [open, setOpen] = useState(false);
	const [goodread, setGoodread] = useState('')
	const [libanything, setLibanything] = useState('')

	const handleRemoveButton = async (key: string) => {
		console.log(session.data?.user?.id, key)
		const res = await removeBookByKeyAndBookshelfId(key, session.data?.user?.id!)
		console.log(res && "successfully remove")
		setMyBooks((state) => state.filter((item) => item.key !== book.key))
		setOpen(false)
	}

	return (
		<div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-y-out">
			{/* {isUserBookshelf && */}
			{/* 	<Dialog open={open} onOpenChange={setOpen}> */}
			{/* 		<div className='absolute top-1 right-1 bg-transparent w-fit'> */}
			{/* 			<DialogTrigger className='bg-white opacity-50 rounded-lg'> */}
			{/* 				<IconX className='text-darkgreen' /> */}
			{/* 			</DialogTrigger> */}
			{/* 		</div> */}
			{/* 		<DialogContent> */}
			{/* 			<DialogHeader> */}
			{/* 				<DialogTitle>Are you absolutely sure?</DialogTitle> */}
			{/* 				<DialogDescription> */}
			{/* 					You are going to remove this book from your bookshelf */}
			{/* 				</DialogDescription> */}
			{/* 			</DialogHeader> */}
			{/* 			<Button className='bg-red-500' onClick={() => handleRemoveButton(book.key)}> */}
			{/* 				Remove */}
			{/* 			</Button> */}
			{/* 		</DialogContent> */}
			{/* 	</Dialog> */}
			{/* } */}

			{/* <div className={`h-60 md:h-80 bg-cover bg-center ${book.cover == "" ? 'bg-darkgreen' : 'bg-darkgreen'}`} style={{ backgroundImage: `url(${book.cover})` }}></div> */}
			{/* <div className="p-4"> */}
			{/* 	<h1 className="text-gray-900 font-bold text-xl ">{book.title}</h1> */}
			{/* 	{book.author_name && ( */}
			{/* 		<p className="text-gray-600 text-base "> */}
			{/* 			{book.author_name} */}
			{/* 		</p> */}
			{/* 	)} */}
			{/* </div> */}


			<Drawer>
				<DrawerTrigger className='w-full'>

					<div className={`h-60 md:h-80 bg-cover bg-center ${book.cover == "" ? 'bg-darkgreen' : 'bg-darkgreen'}`} style={{ backgroundImage: `url(${book.cover})` }}></div>
					<div className="p-4">
						<h1 className="text-gray-900 font-bold text-xl ">
							{book.title}
						</h1>
						{book.author_name && (
							<p className="text-gray-600 text-base ">
								{book.author_name}
							</p>
						)}
					</div>
				</DrawerTrigger>
				<DrawerContent className='h-[90svh]'>
					<DrawerHeader>
						<DrawerTitle>{book.title}</DrawerTitle>
						<DrawerDescription>{book.author_name}</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>

						<Link
							target='_blank'
							href={`https://openlibrary.org${book.key}`}>
							<Button className='w-full'>
								OpenLibrary
							</Button>
						</Link>

						<Button variant="outline" disabled>
							Coming Soon (LibraryAnything)
						</Button>

						<Button variant="outline" disabled>
							Coming Soon (Goodread)
						</Button>

						{isUserBookshelf &&
							<Button className='bg-red-500' onClick={() => handleRemoveButton(book.key)}>
								Remove from bookshelf
							</Button>
						}
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

		</div>
	);
};

export default BookCard;

