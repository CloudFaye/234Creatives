<script lang="ts">
    import Creatives from "$lib/components/Creatives.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import gsap from "gsap";
    
    export let data: PageData;
    let activeName: string | null = null;
    let nameContainer: HTMLDivElement;
    let currentCreative: any = null;
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

    // Update the animateImage function to handle transitions more smoothly
    function animateImage(url: string, creative?: any) {
        // Kill any existing animations to prevent overlap
        gsap.killTweensOf([imageContainer, nameContainer]);
        
        const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" }
        });

        // Only animate if we have new content
        if (url !== activeImage || creative?.name !== activeName) {
            timeline
                .to([imageContainer, nameContainer], {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => {
                        activeImage = url;
                        activeName = creative?.name || findCreativeNameByImage(url);
                        currentCreative = creative;
                    }
                })
                .to(imageContainer, {
                    opacity: 1,
                    duration: 0.4
                })
                .fromTo(nameContainer, 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
                    "-=0.2"
                );
        }
    }

    function findCreativeNameByImage(url: string): string {
        const creative = data.pages.find(page => 
            page.worksMedia?.some(media => media?.external?.url === url)
        );
        return creative?.name || '';
    }

    function startSlideshow() {
        if (intervalId) clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            if (!isHovered) { 
                const nextIndex = (currentIndex + 1) % allImages.length;
                const nextCreative = data.pages.find(page => 
                    page.worksMedia?.some(media => media?.external?.url === allImages[nextIndex])
                );
                currentIndex = nextIndex;
                animateImage(allImages[nextIndex], nextCreative);
            }
        }, 5000); // Increased duration for smoother experience
    }

    // Update handleImageHover to prevent unnecessary transitions
    function handleImageHover(creative: any) {
        isHovered = true;
        const hasImage = creative.worksMedia?.[0]?.external?.url;
        
        if (hasImage) {
            // Only animate if it's a different image
            if (creative.worksMedia[0].external.url !== activeImage) {
                animateImage(creative.worksMedia[0].external.url, creative);
            }
        } else {
            // Kill any existing animations
            gsap.killTweensOf([imageContainer, nameContainer]);
            gsap.to([imageContainer, nameContainer], {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    activeImage = null;
                    activeName = null;
                    currentCreative = null;
                }
            });
        }
    }

    // Update handleMouseLeave to be more efficient
    function handleMouseLeave() {
        isHovered = false;
        if (allImages.length && currentIndex < allImages.length) {
            const currentCreative = data.pages.find(page => 
                page.worksMedia?.some(media => media?.external?.url === allImages[currentIndex])
            );
            // Only animate if we're showing a different image
            if (allImages[currentIndex] !== activeImage) {
                animateImage(allImages[currentIndex], currentCreative);
            }
        }
    }
</script>

<div class="home">
    <div class="home-inner pt-16 grid gap-10 md:grid-rows-1 lg:grid-cols-2">
        <div class="image-container relative lg:col-span-1 row-span-1 w-full min-h-[200px]">
            <div 
                class="image w-full h-full"
                bind:this={imageContainer}
            >
                {#if activeImage}
                    <img
                        src={activeImage}
                        alt={`Work by ${activeName}`}
                        class="w-full h-[250px] lg:h-full md:h-full object-cover"
                    />
                {/if}
            </div>
            {#if activeName}
                <div 
                    class="name-bubble"
                    bind:this={nameContainer}
                >
                    {activeName}
                </div>
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

    .image-container {
        position: relative;
        overflow: hidden;
    }

    .name-bubble {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.817);
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 24px;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        opacity: 0;
        transform: translateY(20px);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }

    .image {
        opacity: 0;
        will-change: opacity;
        transform: translateZ(0);
    }
</style>