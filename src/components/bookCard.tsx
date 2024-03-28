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
import { IconCopy, IconExternalLink, IconX } from '@tabler/icons-react';
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
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToast } from './ui/use-toast';

type BookProps = {
	book: Book
	myBooks: Book[]
	setMyBooks: Dispatch<SetStateAction<Book[]>>;
	isUserBookshelf: boolean
};


const BookCard: React.FC<BookProps> = ({ book, myBooks, setMyBooks, isUserBookshelf }) => {
	const session = useSession()
	const [open, setOpen] = useState(false);
	const { toast } = useToast()

	const handleRemoveButton = async (key: string) => {
		console.log(session.data?.user?.id, key)
		const res = await removeBookByKeyAndBookshelfId(key, session.data?.user?.id!)
		console.log(res && "successfully remove")
		setMyBooks((state) => state.filter((item) => item.key !== book.key))
		setOpen(false)
	}

	console.log(book)

	return (
		<div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-y-out">
			<Drawer>
				<DrawerTrigger className='w-full'>

					<div className={`h-60 md:h-80 bg-cover bg-center bg-darkgreen`} style={{ backgroundImage: `url(${book.cover})` }}></div>
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
						<DrawerTitle>
							<CopyToClipboard text={`${book.title} ${book.author_name}`}
								onCopy={() => {
									toast({
										duration: 3000,
										className: "text-2xl",
										description: "book copied",
									})

								}}>
								<Button className="border-lightbrown rounded-full m-0 p-0 bg-white hover:bg-white text-darkgreen gap-2 hover:text-black text-xl">
									{book.title}
									<IconCopy className="h-4 w-4" />
								</Button>
							</CopyToClipboard>
						</DrawerTitle>
						<DrawerDescription>{book.author_name}</DrawerDescription>
					</DrawerHeader>

					{book.cover != null && (
						<div className='relative h-[320px] w-[200px] mx-auto' data-aos="zoom-y-out">
							<Image src={book.cover} fill alt='cover' />
						</div>
					)}

					<DrawerFooter>

						{book.ex_link?.id_goodreads &&
							<Button
								className='bg-[#F4F2E9] text-[#503B2B] hover:bg-lightbrown'
							>
								<Link
									href={`https://www.goodreads.com/book/show/${book.ex_link.id_goodreads}`}
									target='_blank'
									className='w-full'
								>
									Goodread (test)
								</Link>
							</Button>
						}

						<Button
							className='bg-[#E1DCC5] text-[#518ABE] hover:text-lightbrown'
						>
							<Link
								target='_blank'
								className='w-full'
								href={`https://openlibrary.org${book.key}`}>
								OpenLibrary
							</Link>
						</Button>


						{book.ex_link?.id_libranything &&
							<Button
								className='bg-[#4E3431] text-[#FBFBFB]'
							>
								<Link
									className='w-full'
									href={`https://www.librarything.com/work/${book.ex_link.id_libranything}`}
									target='_blank'
								>
									LibraryThing (test)
								</Link>
							</Button>
						}


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

