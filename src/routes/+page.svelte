<script lang="ts">
	import { fly } from 'svelte/transition';
	import Modal from '../components/ModalDelete.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let books: any = data.books;
	let deleteId: number | null = null;
	let showModal = false;

	$: if (data) {
		console.log(data);
	}

	function checkImageURL(url: string) {
		return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
	}

	async function updateData() {
		const res = await fetch(`https://api-to-do-list-0t2q.onrender.com/books`);
		const newData = await res.json();
		if (newData.message) books = [];
		books = newData.sort((a: any, b: any) => b.id - a.id);
	}

	async function handleDelete() {
		await fetch(`https://api-to-do-list-0t2q.onrender.com/books/${deleteId}`, {
			method: 'DELETE'
		})
			.then(async (res: any) => {
				const result = await res.json();
				if (result.message === 'Item deleted successfully') {
					updateData();
				}
			})
			.catch((e) => console.log(e));
	}
</script>

<main class="p-4">
	<div class="flex justify-between items-center mb-10">
		<p class="text-xl">Books</p>
	</div>

	{#await books}
		<div class="text-center pt-40">
			<p class="text-xl">Loading...</p>
		</div>
	{:then books}
		{#if books.length > 0}
			<div
				transition:fly={{ y: 200, duration: 1000 }}
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
			>
				{#each books as book}
					<div class="card relative border p-4 mb-20 rounded-lg hover:shadow-xl bg-white">
						<img
							src={checkImageURL(book.image)
								? book.image
								: 'https://www.redbridgeanalytics.com/wp-content/uploads/2021/12/lorem-ipsum-alternatives-768x492.png'}
							alt={book.title}
							class="w-full h-64 lg:h-80 object-cover object-top rounded-t-lg"
						/>
						<div class="mt-4">
							<h2 class="text-md font-semibold line-clamp-2 h-12">{book.title}</h2>
							<p class="text-gray-400 mt-2">{book.genre || '-'}</p>
							<p class="text-md mt-2">{book.price || '-'}$</p>
						</div>

						<div
							class="card-option absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg flex justify-end items-start p-4 opacity-0"
						>
							<a data-sveltekit-preload-data="tap" href={`/edit/${book.id}`}>
								<button
									class="bg-orange-500 text-white text-sm rounded-sm m-1 p-1 hover:bg-orange-600"
								>
									Edit
								</button>
							</a>

							<button
								on:click={() => {
									deleteId = book.id;
									showModal = true;
								}}
								class="bg-rose-500 text-white text-sm rounded-sm m-1 p-1 hover:bg-rose-600"
							>
								Delete
							</button>
						</div>
					</div>
				{/each}

				<Modal bind:showModal on:confirm={handleDelete}>
					<h2 slot="header">are you sure you want to delete this item?</h2>
				</Modal>
			</div>
		{:else}
			<div class="text-center pt-40">
				<p class="text-xl">No item</p>
			</div>
		{/if}
	{:catch error}
		<div class="text-center h-svh pt-40">
			<p class="text-xl">{error.message}</p>
		</div>
	{/await}
</main>

<style lang="postcss">
	.card:hover .card-option {
		opacity: 1;
	}
</style>
