import { env } from '$env/dynamic/public';

export async function load() {
	async function getData() {
		const res = await fetch(`${env.PUBLIC_API_BOOKS}/books`);
		const books = await res.json();

		if (books.message) return [];

		return books.sort(
			(/** @type {{ id: number; }} */ a, /** @type {{ id: number; }} */ b) => b.id - a.id
		);
	}

	return { books: await getData() };
}
