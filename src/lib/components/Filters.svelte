<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { ChevronDown } from 'lucide-svelte';
    import { buttonVariants } from '$lib/components/ui/button';
    import { Separator } from '$lib/components/ui/separator';
    import { createEventDispatcher } from 'svelte';

    const { data, filteredCount = 0 } = $props<{ 
        data: string[], 
        filteredCount?: number 
    }>();
    
    let selectedServices = $state<string[]>([]);
    const dispatch = createEventDispatcher<{
        filterUpdate: { selectedServices: string[] }
    }>();

    function handleServiceToggle(service: string) {
        const index = selectedServices.indexOf(service);
        if (index === -1) {
            selectedServices = [...selectedServices, service];
        } else {
            selectedServices = selectedServices.filter(s => s !== service);
        }
        dispatch('filterUpdate', { selectedServices });
    }
</script>

<div class="font-roboto uppercase text-[13px] absolute lg:relative bottom-0 w-full flex flex-col justify-center items-start py-4">
    <p class="w-full mb-2">Showing {filteredCount} CREATIVES</p>
    
    <DropdownMenu.Root>
        <DropdownMenu.Trigger
            class={buttonVariants({ variant: "outline", size: "sm" })}
        >
            {selectedServices.length ? `${selectedServices.length} Selected` : 'All Creatives'} 
            <ChevronDown class="size-3 ml-2" />
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Content class="w-56 p-2">
            <DropdownMenu.Group>
                <DropdownMenu.Label class="font-semibold">Looking for</DropdownMenu.Label>
                <Separator class="my-2" />
                <div class="max-h-[300px] overflow-y-auto">
                    {#if data.length > 0}
                        {#each data as service}
                            <label class="flex items-center space-x-2 p-2 hover:bg-zinc-100 rounded-sm cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={selectedServices.includes(service)}
                                    onchange={() => handleServiceToggle(service)}
                                    value={service}
                                    class="form-checkbox"
                                />
                                <span class="text-sm">{service}</span>
                            </label>
                        {/each}
                    {:else}
                        <p class="text-sm text-zinc-500 p-2">No services available</p>
                    {/if}
                </div>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>