import { env } from '$env/dynamic/public';

// @ts-ignore
export async function load({ params }) {
	async function getData() {
		const res = await fetch(`${env.PUBLIC_API_BOOKS}/books/${params.slug}`);
		const resJson = await res.json();

		if (!resJson.id) return null;

		return resJson;
	}

	return { books: await getData() };
}
