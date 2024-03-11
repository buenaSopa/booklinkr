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
import { IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { removeBookByKeyAndBookshelfId } from '@/action/db';
import { Book } from '@/types/book';

type BookProps = {
	book: Book
	myBooks: Book[]
	setMyBooks: Dispatch<SetStateAction<Book[]>>;
	isUserBookshelf: boolean
};

const BookCard: React.FC<BookProps> = ({ book, myBooks, setMyBooks, isUserBookshelf }) => {
	const session = useSession()
	const [open, setOpen] = useState(false);

	const handleRemoveButton = async (key: string) => {
		console.log(session.data?.user?.id, key)
		const res = await removeBookByKeyAndBookshelfId(key, session.data?.user?.id!)
		console.log(res && "successfully remove")
		setMyBooks((state) => state.filter((item) => item.key !== book.key))

		setOpen(false)
	}

	return (
		<div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-y-out">
			{isUserBookshelf &&
				<Dialog open={open} onOpenChange={setOpen}>
					<div className='absolute top-1 right-1 bg-transparent w-fit'>
						<DialogTrigger className='bg-white opacity-50 rounded-lg'>
							<IconX className='text-darkgreen' />
						</DialogTrigger>
					</div>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								You are going to remove this book from your bookshelf
							</DialogDescription>
						</DialogHeader>
						<Button className='bg-red-500' onClick={() => handleRemoveButton(book.key)}>
							Remove
						</Button>
					</DialogContent>
				</Dialog>
			}
			<div className={`h-60 bg-cover bg-center ${book.cover == "" ? 'bg-darkgreen' : 'bg-darkgreen'}`} style={{ backgroundImage: `url(${book.cover})` }}></div>
			{/* <div className='relative h-[175px] w-[120px]'> */}
			{/* 	<Image src={cover!} fill alt='rabbit'  className=''/> */}
			{/* </div> */}

			<div className="p-4">
				<h1 className="text-gray-900 font-bold text-xl ">{book.title}</h1>
				{book.author_name && (
					<p className="text-gray-600 text-base ">
						{book.author_name}
					</p>
				)}
			</div>
		</div>
	);
};

export default BookCard;

