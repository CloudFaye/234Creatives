<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { ChevronDown } from 'lucide-svelte';
    import { buttonVariants } from '$lib/components/ui/button';
    import { Separator } from '$lib/components/ui/separator';
    import { serviceValues } from '$lib/filters/filterValues';
    import type { serviceOptions } from '$lib/filters/types';
	import Input from './ui/input/input.svelte';

    const { filteredCount = 0, onFilterUpdate } = $props<{ 
        filteredCount?: number,
        onFilterUpdate: (selectedValues: string[]) => void 
    }>();
    
    let selectedValues = $state<string[]>([]);

    function handleServiceToggle(value: string) {
        const index = selectedValues.indexOf(value);
        if (index === -1) {
            selectedValues = [...selectedValues, value];
        } else {
            selectedValues = selectedValues.filter(v => v !== value);
        }
        onFilterUpdate(selectedValues);
    }
</script>

<div class="font-roboto uppercase text-[13px] absolute lg:relative bottom-0 w-full flex flex-col justify-center items-start py-4">
    <p class="w-full mb-2">Showing {filteredCount} CREATIVES</p>   
    <DropdownMenu.Root>
        <DropdownMenu.Trigger
            class={buttonVariants({ variant: "outline", size: "sm" })}
        > 
            {selectedValues.length ? `${selectedValues.length} Selected` : 'All Services'}
            <ChevronDown class="size-3 ml-2" />
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Content class="w-56 p-2">
            <DropdownMenu.Group>
                <DropdownMenu.Label class="font-semibold">Services</DropdownMenu.Label>
                <Separator class="my-2" />
                <div class="max-h-[300px] overflow-y-auto">
                    {#each serviceValues as { value, label, color } (value)}
                        <label class="flex items-center space-x-2 p-2 hover:bg-zinc-100 rounded-sm cursor-pointer">
                            <input 
                                type="checkbox"
                                checked={selectedValues.includes(value)}
                                onchange={() => handleServiceToggle(value)}
                                class="form-checkbox"
                                {value}
                            />
                            <span class="text-sm" style:color={color}>{label}</span>
                        </label>
                    {/each}
                </div>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>