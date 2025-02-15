<script lang="ts">
	import type { NotionForm } from "$lib/server/db/types";
    import { enhance } from '$app/forms'
	import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select/index.js";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";

let isSubmitting = $state(false)

let formData: NotionForm = $state<NotionForm> ({
    name: '',
    email: '',
    portfolio: '',
    creativeCategory: '',
    shortBio: '',
    creativeServices: '',
    works: ''
});

const categoryOptions = [
    { value: 'Designer', label: 'Designer' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: '3D Artist', label: '3D Artist'}
];


let value = $state("");
const triggerContent = $derived(
    categoryOptions.find((f) => f.value === value)?.label ?? "Select a category"
    
);

$effect(() => {
    if (value) {
        formData.creativeCategory = value
    }
});



</script>

<div class=" grid grid-row-2 pt-20 px-2 gap-10">

<div class=" row-span-1 ">
	<h1 class='text-white text-[1.3rem] font-semibold '>APPLY</h1>
	<p class=' '>Welcome to the application form for 234creatives
		All the fields marked with * are required.</p>
</div>

<form class='  row-span-1 grid grid-row-1 w-full gap-5 ' use:enhance method="POST">
    <div class="col-span-1 flex flex-col gap-4 ">
      <div class="form-group">
            <label class='flex mb-2' for="name">Full Name *</label>
              <Input class='focus:border-white border-2 text-sm font-sans' type='text' id='name' name='name' bind:value={formData.name} required placeholder='Your full name' />
              <label class='flex mt-1 text-sm font-thin' for="">This can be your design gimmick or real name</label>
        </div>

        <div class="flex flex-col  gap-2">
            <label for="email">Email Address *</label>
             <Input class='focus:border-white border-2 text-sm font-sans' type='text' id='email' name='email' bind:value={formData.email} required placeholder='Your email' />
        </div>

      
    </div>

    <div class="col-span-1 flex flex-col gap-4  ">
          <div class="flex flex-col  gap-2">
            <label for="Portfolio">Portfolio URL *</label>
              <Input class='focus:border-white border-2 text-sm font-sans' type='text' id='portfolio' name='portfolio' bind:value={formData.portfolio} required placeholder='Your portfolio / pdf link' />
        </div>

        <div class="flex flex-col  gap-2">
            <label for="creativeCategory">Creative Category *</label>
            <Select.Root  type="single" name="creativeCategory" bind:value>
              <Select.Trigger class='focus:border-white border-2'>
                {triggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
             <Select.GroupHeading>Creative categories</Select.GroupHeading>
              {#each categoryOptions as category }
            <Select.Item value={category.value} label={category.label}>{category.label}</Select.Item>
              {/each}
            </Select.Group>
            </Select.Content>
            </Select.Root>
        </div>

        <div class="flex flex-col  gap-2">
            <label for="shortBio">Short Bio *</label>
            <Textarea class='focus:border-white border-2 text-sm font-sans' id='shortBio' name='shortBio' bind:value={formData.shortBio} required placeholder='Tell us a bit more about yourself' />
            
        </div>

        <div class="flex flex-col  gap-2">
            <label for="creativeServices">Services (comma-separated) *</label>
            <Input class='focus:border-white border-2 text-sm font-sans' type='text' id='creativeServices' name='creativeServices' bind:value={formData.creativeServices} required placeholder="UI Design, Web Development, etc." />
        </div>

        <div class="flex flex-col  gap-2">
            <label for="works">Works/Projects URL *</label>
             <Input class='focus:border-white border-2 text-sm font-sans' type='url' id='works' name='works' bind:value={formData.works} placeholder=" PDF link or drive " />
        </div>

        <Button class='hover:bg-zinc-700 text-white '  type='submit'>Submit Application</Button>
    </div>
  

</form>

</div>





    
