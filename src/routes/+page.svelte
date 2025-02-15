<script lang="ts">
	import Creatives from "$lib/components/Creatives.svelte";
	import { Separator } from "$lib/components/ui/separator";
	import type { PageData } from "./$types";

export let data: PageData
</script>


<div class=" home   ">
<div class=" home-inner pt-16 grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2 ">
<div class=" col-span-1 h-full ">
  <div class="image w-full h-full  bg-zinc-600">
    hfhhjdhhejh
    <img class=" object-cover" src="/works1.png" alt="work" >
    
    
   </div>
</div>

<div class="creative col-span-1 h-full overflow-y-scroll  flex flex-col ">
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
    height: calc(100vh - 50px);
    min-height: 690px;
    overflow: hidden;
    position: relative;
    text-transform: uppercase;
}

.creative {
    transition: opacity 0.3s ease;
    
}

.creative {
    visibility: hidden;
    
}

.creative > * {
      visibility: visible;
    }

  .creative > * { transition: linear 500ms; }

.creative:hover > * { opacity: 0.4 }

.creative > *:hover { opacity: 1; }
</style>