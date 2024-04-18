export type Book = {
	key: string;
	title: string;
	author_name?: string,
	cover?: string
	ex_link?: {
		id_goodreads?: string
		id_libranything?: string
	}
}

export const mapToBook = (initialBook: any): Book => {
	const { author, cover_url, title, work_key, id_goodreads, id_libranything } = initialBook;
	return {
		key: work_key,
		title: title,
		author_name: author,
		cover: cover_url,
		ex_link: {
			id_goodreads: id_goodreads ?? '',
			id_libranything: id_libranything ?? ''
		}
	};
};

export const mapToBookFromDB = (initialBook: any): Book => {
	const { author, cover_url, title, work_key, ex_link } = initialBook;
	return {
		key: work_key,
		title: title,
		author_name: author,
		cover: cover_url,
		ex_link: {
			id_goodreads: ex_link.goodreads ?? '',
			id_libranything: ex_link.libraryany ?? ''
		}
	};
};


