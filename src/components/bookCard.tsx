import Image from 'next/image';
import React from 'react';

type BookProps = {
	cover?: string;
	title: string;
	author?: string;
};

const BookCard: React.FC<BookProps> = ({ cover, title, author }) => {
	return (
		<div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
			<div className={`h-60 bg-cover bg-center ${cover == "" ? 'bg-darkgreen' : 'bg-darkgreen'}`} style={{ backgroundImage: `url(${cover})` }}></div>
			{/* <div className='relative h-[175px] w-[120px]'> */}
			{/* 	<Image src={cover!} fill alt='rabbit'  className=''/> */}
			{/* </div> */}

			<div className="p-4">
				<h1 className="text-gray-900 font-bold text-xl ">{title}</h1>
				{author && (
					<p className="text-gray-600 text-base ">
						{author}
					</p>
				)}
			</div>
		</div>
	);
};

export default BookCard;

