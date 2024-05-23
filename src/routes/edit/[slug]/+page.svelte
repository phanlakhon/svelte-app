<script lang="ts">
	import InputText from '../../../components/InputText.svelte';

	export let data;
	let books: any = data.books;

	let title = books.title;
	let price = books.price;
	let image = books.image;
	let genre = books.genre;
	let error = false;

	async function handleSubmit() {
		error = !title ? true : false;

		if (!error && books.id) {
			try {
				await fetch(`https://api-to-do-list-0t2q.onrender.com/books/${books.id}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						title: title,
						image: image,
						genre: genre,
						price: price
					})
				})
					.then((res) => res.json())
					.then((data) => {
						if (!data.message) location.href = '/';
					});
			} catch (error) {
				console.error(error);
			}
		}
	}
</script>

<main class="p-4 pt-20 h-screen">
	<div class="text-center">Edit Book</div>
	<div class="mx-auto my-10 max-w-2xl">
		<form on:submit|preventDefault={handleSubmit}>
			<InputText title="Title" bind:value={title} />
			{#if error}
				<p class="text-red-600 text-sm">Title is required</p>
			{/if}
			<InputText title="Price" bind:value={price} />
			<InputText title="Image" bind:value={image} />
			<InputText title="genre" bind:value={genre} />

			<button type="submit" class="bg-gray-950 hover:bg-gray-700 text-white px-4 py-2 mt-6">
				Submit
			</button>
		</form>
	</div>
</main>

<style lang="postcss">
</style>
