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
    <div class='items-center flex col-span-3'> 
        {name}
    </div>

    <div class='text-fuchsia-300 flex items-center col-span-2'>
        <p>{category}</p>
    </div>

    <div class='items-center justify-end text-right flex col-span-1'>
        <a href={portfolio} class='text-neutral-600 text-[13px]'>
            {#each services as service}
                {service.name}
            {/each}
        </a>
        <ArrowUpRight class='size-[13px]' />
    </div>
</div>

