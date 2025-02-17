<script lang="ts">
    import Creatives from "$lib/components/Creatives.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import gsap from "gsap";
    
    export let data: PageData;
    let activeImage: string | null = null;
    let allImages: string[] = [];
    let currentIndex = 0;
    let intervalId: NodeJS.Timeout | undefined;
    let isHovered = false;
    let imageContainer: HTMLDivElement;

    onMount(() => {
        allImages = data.pages
            .flatMap(page => page.worksMedia)
            .filter(media => media?.external)
            .map(media => media.external.url);

        startSlideshow();

        return () => {
            if (intervalId) clearInterval(intervalId);
        }
    });

    function animateImage(url: string) {
        gsap.to(imageContainer, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                activeImage = url;
                gsap.to(imageContainer, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    }

    function startSlideshow() {
        if (intervalId) clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            if (!isHovered) {
                currentIndex = (currentIndex + 1) % allImages.length;
                animateImage(allImages[currentIndex]);
            }
        }, 3000);
    }

    function handleImageHover(creative: any) {
        isHovered = true;
        const hasImage = creative.worksMedia?.[0]?.external?.url;
        
        if (hasImage) {
            animateImage(creative.worksMedia[0].external.url);
        } else {
            // If no image, fade out current image
            gsap.to(imageContainer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    activeImage = null;
                }
            });
        }
    }

    function handleMouseLeave() {
        isHovered = false;
        if (allImages.length) {
            animateImage(allImages[currentIndex]);
        }
    }
</script>

<div class="home">
    <div class="home-inner pt-16 grid gap-10 md:grid-rows-1 lg:grid-cols-2">
        <div 
            class="image lg:col-span-1 row-span-1 w-full min-h-[200px]"
            bind:this={imageContainer}
        >
            {#if activeImage}
                <img
                    src={activeImage}
                    alt="Creative work"
                    class="w-full h-[250px] lg:h-full md:h-full object-contain"
                />
            {/if}
        </div>
        <div class="creative row-span-2 h-full  overflow-y-scroll  flex flex-col lg:col-span-1 ">
            {#each data.pages as creative (creative.id) }
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class='py-3  border-b border-zinc-700' on:mouseenter={() => handleImageHover(creative)}
                    on:mouseleave={handleMouseLeave} >
                    <Creatives name={creative.name} category={creative.category} portfolio={creative.portfolio} worksMedia={creative.worksMedia} services={creative.services}   />
                    
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

    .creative > * { transition: linear 100ms; }

    .creative:hover > * { opacity: 0.4 }

    .creative > *:hover { opacity: 1; }

    .image {
        opacity: 0;
    }
</style>