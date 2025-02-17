<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
<main class=" font-roboto text-[14px] bg-[#000000] text-zinc-300 h-full lg:px-[3%]  w-full  p-4  ">
{@render children()}
</main>

<style  >
	@font-face {
		font-family: 'Larken' ;
		font-style: normal ;
		font-display: swap;
		font-weight: 100 200 300 400 500 600 700 800 900;
		src: url($lib/fonts/LarkenVariable-Regular.ttf); format:('ttf')
	}

	@font-face {
		font-family: 'Roboto-Mono' ;
		font-style: normal ;
		font-display: swap;
		font-weight: 100 200 300 400 500 600 700 800 900;
		src: url($lib/fonts/RobotoMono-VariableFont_wght.ttf); format:('ttf')
	}


</style>