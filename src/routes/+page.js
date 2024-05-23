export async function load() {
	async function getData() {
		const res = await fetch(`https://api-to-do-list-0t2q.onrender.com/books`);
		const books = await res.json();

		if (books.message) return [];

		return books.sort(
			(/** @type {{ id: number; }} */ a, /** @type {{ id: number; }} */ b) => b.id - a.id
		);
	}

	return { books: await getData() };
}
