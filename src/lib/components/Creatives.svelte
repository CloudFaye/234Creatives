<script lang="ts">
	import  ArrowUpRight  from "lucide-svelte/icons/arrow-up-right";
    import type { PageData , Actions } from "/Users/mac/Desktop/234design.info/.svelte-kit/types/src/routes/$types";
    let {name, category, services, portfolio, level, className='', ...others } = $props();
	import { Cherry, Dot } from "lucide-svelte";
</script>







<div class="  cursor-pointer font-roboto uppercase text-[14px] grid grid-cols-6 gap-8 w-full ">

<div class='items-center flex col-span-3 '> 
  {name}
</div>

<div class= ' text-fuchsia-300 flex items-center col-span-2'><p>
  {category}
</p></div>

<div class='items-center justify-end text-right flex col-span-1'>
<a href={portfolio} class='text-neutral-600 text-[13px]  '>{services}</a>
<ArrowUpRight class='size-[13px] ' />
</div>

</div>