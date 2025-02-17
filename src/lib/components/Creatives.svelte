<script lang="ts">
    interface CreativeData {
        id: string;
        name: string;
        category: string;
        portfolio: string;
        worksMedia: Array<{
            type: string;
            name: string;
            external?: { url: string };
            file?: { url: string };
        }>;
        services: Array<{ name: string; color: string }>;
    }

    import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
    
    // Define props with types
    interface $$Props extends Pick<CreativeData, 'name' | 'category'> {
        portfolio?: string;
        services?: Array<{ name: string; color: string }>;
        worksMedia?: CreativeData['worksMedia'];
        className?: string;
    }

    export let name: string;
    export let category: string;
    export let portfolio: string = '#';
    export let services: Array<{ name: string; color: string }> = [];
    export let worksMedia: CreativeData['worksMedia'] = [];
    export let className: string = '';
</script>

<div class="cursor-pointer font-roboto uppercase text-[14px] grid grid-cols-6 gap-8 w-full {className}">
    <div class='lg:text-[13px] md:text-[13px] text-[13px] text-nowrap items-center flex col-span-2'> 
        {name}
    </div>

    <div class='text-zinc-400 text-[12px] text-nowrap md:text-[12px] lg:text-[14px] flex items-center justify-start col-span-2'>
        <p>{category}</p>
    </div>

    <div class='flex cursor-pointer flex-wrap  items-start justify-end gap-2 col-span-2'>
        {#each services as service}
        <span class=" flex flex-col items-center justify-center border-zinc-700 border text-zinc-400 text-[12px] leading-[10px] px-1 py-1 text-nowrap  " >{service.name}</span>
            {/each}
    </div>
</div>


