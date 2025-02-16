<script lang="ts">
	import Creatives from "$lib/components/Creatives.svelte";
	import { Separator } from "$lib/components/ui/separator";
	import type { PageData } from "./$types";

export let data: PageData
</script>


<div class=" home   ">
<div class=" home-inner pt-16 grid grid-rows-2 gap-10 md:grid-rows-1 lg:grid-rows-2 ">
<div class=" row-span-1 h-[200px]  ">
    hfhhjdhhejh

    
    
   
</div>

<div class="creative row-span-1 h-full overflow-y-scroll sm:overflow-y-clip  flex flex-col ">
{#each data.pages as creative (creative.id) }
     <div class='py-3  border-b border-zinc-700 '>
       <Creatives name={creative.name} category={creative.category} portfolio={creative.portfolio}   />
      <div class='flex flex-row items-end justify-end w-full gap-2'>
       {#each creative.services as service}
         <span class=" bg-zinc-500 text-zinc-950 text-[12px] leading-[10px] px-2 py-1  " >{service.name}</span>
        {/each}
        </div>
     </div>
      
    {/each}
</div>

</div>
</div>



<style lang="postcss" >

.home-inner {
    height: 100%;
    opacity: 1;
    position: relative;
    transform: translateZ(0px);
}


.home {
    height: calc(100vh - 10px);
    min-height: 100%;
    overflow: hidden;
    position: relative;
    text-transform: uppercase;
}

.creative {
    transition: opacity 0.3s ease;
    
}



.creative > * {
      visibility: visible;
    }

  .creative > * { transition: linear 500ms; }

.creative:hover > * { opacity: 0.4 }

.creative > *:hover { opacity: 1; }
</style>