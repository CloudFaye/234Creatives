<script lang="ts">
import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import Creatives from "$lib/components/Creatives.svelte";
    import { fade, fly, scale, slide } from 'svelte/transition';
    import {  cubicInOut, cubicOut, elasticOut } from 'svelte/easing';
    import type { PageData } from "./$types";
    import { onDestroy } from "svelte";
    import {  Square } from 'svelte-loading-spinners';
   

    
    const { data } = $props<{ data: PageData }>();

    // Loader state
    let showLoader = $state(true);
    
    // Existing states
    let activeImage = $state<string | null>(null);
    let activeName = $state<string | null>(null);
    let isHovered = $state(false);
    let currentIndex = $state(0);
    let allImages = $state<string[]>([]);
    let filteredPages = $state(data.pages);
    let selectedServices = $state<string[]>([]);

    onMount(() => {
        if (!browser) return;
        
        const lastSeen = localStorage.getItem('lastSeen');
        const now = Date.now();
        const twentyFourHours = 5 * 60 * 60 * 1000; // variable name should be 5hours. change later

        if (lastSeen && now - Number(lastSeen) < twentyFourHours) {
            showLoader = false;
        } else {
            localStorage.setItem('lastSeen', now.toString());

            setTimeout(() => showLoader = false, 6000);
        }
    });

    // Rest of existing script remains the same
    $effect(() => {
        allImages = data.pages
            .flatMap((page: { worksMedia: any; }) => page.worksMedia)
            .filter((media: { external: any; }) => media?.external)
            .map((media: { external: { url: any; }; }) => media.external.url);
        
        startSlideshow();
    });

   
     function findCreativeNameByImage(url: string): string {
        const creative = data.pages.find((page: { worksMedia: any[]; }) => 
            page.worksMedia?.some((media: { external: { url: string; }; }) => media?.external?.url === url)
        );
        return creative?.name || '';
    }

    let intervalId: NodeJS.Timeout;
    function startSlideshow() {
        clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            if (!isHovered) {
                currentIndex = (currentIndex + 1) % allImages.length;
                const nextCreative = data.pages.find((page: { worksMedia: any[]; }) => 
                    page.worksMedia?.some((media: { external: { url: string; }; }) => media?.external?.url === allImages[currentIndex])
                );
                activeImage = allImages[currentIndex];
                activeName = nextCreative?.name || findCreativeNameByImage(allImages[currentIndex]);
            }
        }, 5000);
    }

    function handleImageHover(creative: any) {
        isHovered = true;
        if (creative.worksMedia?.[0]?.external?.url) {
            activeImage = creative.worksMedia[0].external.url;
            activeName = creative.name;
        } else {
            activeImage = null;
            activeName = null;
        }
    }

    function handleMouseLeave() {
        isHovered = false;
        if (allImages.length && currentIndex < allImages.length) {
            const currentCreative = data.pages.find((page: { worksMedia: any[]; }) => 
                page.worksMedia?.some((media: { external: { url: string; }; }) => media?.external?.url === allImages[currentIndex])
            );
            activeImage = allImages[currentIndex];
            activeName = currentCreative?.name || findCreativeNameByImage(allImages[currentIndex]);
        }
    }

    function handleFilterUpdate(event: CustomEvent<{selectedServices: string[]}>) {
        selectedServices = event.detail.selectedServices;
        
        if (selectedServices.length === 0) {
            filteredPages = data.pages;
        } else {
            filteredPages = data.pages.filter((page: PageData) => 
                selectedServices.every(service => 
                    page.services.some(s => s.name === service)
                )
            );
        }
    }

    onDestroy(() => {
        clearInterval(intervalId);
    });

    // Add transition settings
    const imageTransition = {
        duration: 800,
        opacity: 0,
        scale: 1.05,
        easing: cubicInOut
    };

    const nameTransition = {
        y: 30,
        duration: 600,
        opacity: 0,
        easing: elasticOut
    };
</script>

<div class="home">
    {#if browser}
    {#if showLoader} // only enter dom if showLoader is true
       <div transition:slide={{duration: 1000, delay: 0, easing:cubicOut, axis: 'y'}} class="loader">
            <Square size="38" color="#FF3E00" unit="px" duration="10s" />
            <p class='mx-2'>Getting all the good guys for you</p>
        </div> 
    {/if}
    {/if}

    <div class="home-inner pt-16 grid gap-10 md:grid-rows-1 lg:grid-cols-2">
        <!-- Existing layout content remains identical -->
        <div class="image-container relative lg:col-span-1 row-span-1 w-full min-h-[200px]">
            {#key activeImage}
                {#if activeImage}
                    <div 
                        class="image-wrapper"
                        in:scale={imageTransition}
                        out:fade={{ duration: 400 }}
                    >
                        <img
                            src={activeImage}
                            alt={`Work by ${activeName}`}
                            class="w-full h-[250px] lg:h-full md:h-full object-cover"
                        />
                    </div>
                {/if}
            {/key}
                {#key activeName}
                {#if activeName && activeImage}
                    <div 
                        class="name-bubble"
                        in:fly={nameTransition}
                        out:fade={{ duration: 200 }}
                    >
                        {activeName}
                    </div>
                {/if}
            {/key}
        </div>

        <div class="creative row-span-2 h-full overflow-y-scroll flex flex-col lg:col-span-1">
             {#each filteredPages as creative (creative.id)}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore event_directive_deprecated -->
                <div 
                    class="py-3 border-b border-zinc-700" 
                    onmouseenter={() => handleImageHover(creative)}
                    onmouseleave={handleMouseLeave}
                >
                    <Creatives 
                        name={creative.name} 
                        category={creative.category} 
                        portfolio={creative.portfolio} 
                        worksMedia={creative.worksMedia}
                        
                    />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
    /* Add loader styles */
    .loader {
        position: fixed;
        top: -10px;
        left: 0;
        width: 100%;
        height: calc(100% + 50px);
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        background-color: #0c0c0c;
    }


    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

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
        padding: 0.3rem 0.8rem;
        border-radius: 24px;
        font-size: 0.75rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        pointer-events: none;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10;
        text-transform: none;
    }

    .image {
        opacity: 0;
        will-change: opacity;
        transform: translateZ(0);
    }
</style>