<script>
	import '../app.css';
</script>

<svelte:head>
	<title>My App</title>
</svelte:head>

<div class="flex flex-col h-screen">
	<nav class="bg-gray-950 p-4">
		<div class="container mx-auto px-8 block md:flex justify-center">
			<a
				data-sveltekit-preload-data="tap"
				href="/"
				class="block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-gray-950 mr-4"
			>
				Home
			</a>
			<a
				data-sveltekit-preload-data="tap"
				href="/add"
				class="block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-gray-950 mr-4"
			>
				Add Item
			</a>
		</div>
	</nav>

	<div class="container mx-auto px-8 py-10 flex-grow">
		<slot />
	</div>

	<div class="bg-gray-950 py-6">
		<div class="container mx-auto px-8 p-4 text-md text-white text-center">
			<p class="text-sm">© 2024 • Oorathai Phanlakhon</p>
		</div>
	</div>
</div>
