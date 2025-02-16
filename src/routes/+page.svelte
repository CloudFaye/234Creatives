<script lang="ts">
    import Creatives from "$lib/components/Creatives.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";
    
    export let data: PageData;
    let activeImage: string | null = null;

    function handleImageHover(creative: any) {
        if (creative.worksMedia && creative.worksMedia.length > 0) {
            const mediaItem = creative.worksMedia[0];
            // Ensure we're getting the full resolution URL
            const imageUrl = mediaItem.external?.url?.split('?')[0];
            console.log('Raw Image URL:', imageUrl);
            
            if (imageUrl) {
                // Add parameters to get full resolution
                activeImage = `${imageUrl}?table=block&width=2000&cache=v2`;
            }
        }
    }
</script>


<div class="home">
    <div class="home-inner pt-16 grid gap-10 md:grid-rows-1 lg:grid-cols-2">
        <!-- Fix the image container styling -->
        <div class="image lg:col-span-1 row-span-1 w-full min-h-[200px]">
            {#if activeImage}
                <!-- Debug output -->
                <pre class="text-xs text-white">{activeImage}</pre>
                <img
                    transition:fade
                    src={activeImage}
                    alt="Creative work"
                    class=" w-full h-full object-cover"
                    on:error={(e) => console.error('Image load error:', e)}
                />
            {/if}
        </div>
        <div class="creative row-span-2 h-full  overflow-y-scroll  flex flex-col lg:col-span-1 ">
            {#each data.pages as creative (creative.id) }
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class='py-3  border-b border-zinc-700' on:mouseenter={() => handleImageHover(creative)}
                    on:mouseleave={() => activeImage = null} >
                    <Creatives name={creative.name} category={creative.category} portfolio={creative.portfolio} worksMedia={creative.worksMedia}   />
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

<style lang="postcss">

    .home-inner {
        height: 100%;
        opacity: 1;
        position: relative;
        transform: translateZ(0px);
        overflow: hidden;
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