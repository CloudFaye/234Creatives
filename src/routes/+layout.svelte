<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
<main class=" font-roboto text-[14px] bg-[#000000] text-zinc-300  w-full  p-4  ">
{@render children()}
</main>

