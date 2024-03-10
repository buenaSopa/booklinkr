export type Book = {
	key: string;
	title: string;
	author_name?: string,
	cover?: string
}

export const mapToBook = (initialBook: any): Book => {
  const { author, cover_url, title, work_key } = initialBook;
  return {
    key: work_key,
    title: title,
    author_name: author,
    cover: cover_url,
  };
};
