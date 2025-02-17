<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import * as  DropdownMenu  from "./ui/dropdown-menu";
	import { buttonVariants } from "./ui/button";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { Separator } from "./ui/separator";

    const { data, filteredCount = 0 } = $props<{ 
        data: string[], 
        filteredCount?: number 
    }>();
    
    let selectedServices = $state<string[]>([]);
    const dispatch = createEventDispatcher<{
        filterUpdate: { selectedServices: string[] }
    }>();

    $effect(() => {
        dispatch('filterUpdate', { selectedServices });
    });
</script>

<div class="font-roboto uppercase text-[13px] absolute lg:relative bottom-0 w-full flex flex-col justify-center items-start py-4">
    <p class="w-full"> Showing {filteredCount} CREATIVES </p>
    
    <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
            {selectedServices.length ? `${selectedServices.length} Selected` : 'All Creatives'} 
            <ChevronDown class='size-3' />
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Content class="w-full">
            <DropdownMenu.Group>
                <DropdownMenu.GroupHeading>Looking for</DropdownMenu.GroupHeading>
                <DropdownMenu.Separator />
                <fieldset class='text-black text-balance w-full'>
                    {#if data.length > 0}
                        {#each data as service}
                            <label class='flex flex-col text-white my-2 gap-2'>
                                <div class='flex flex-row w-fit gap-2'>
                                    <input 
                                        bind:group={selectedServices}
                                        class='bg-transparent size-4 text-black rounded-full border-[1px] border-neutral-600'
                                        type="checkbox"
                                        name="services"
                                        value={service}
                                    />
                                    <p class='text-black uppercase text-xs'>{service}</p>
                                </div>
                                <Separator class='h-[1px] w-full bg-slate-700' />
                            </label>
                        {/each}
                    {:else}
                        <p>No services available</p>
                    {/if}
                </fieldset>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>