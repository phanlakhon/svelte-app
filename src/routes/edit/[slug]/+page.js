// @ts-ignore
export async function load({ params }) {
	async function getData() {
		const res = await fetch(`https://api-to-do-list-0t2q.onrender.com/books/${params.slug}`);
		const resJson = await res.json();

		if (!resJson.id) return null;

		return resJson;
	}

	return { books: await getData() };
}
