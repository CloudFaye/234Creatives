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
    { value: '3D Artist', label: '3D Artist'},
    { value: 'Graphic Designer', label: 'Graphic Designer' },
    { value: 'Motion Graphics Designer', label: 'Motion Graphics' },
    { value: 'Digital Artist', label: 'Digital Artist' },
    { value: 'Creative Director', label: 'Creative Director' },
    { value: 'Art Director', label: 'Art Director' },
    { value: 'Animator', label: 'Animator' },
    { value: 'Illustrator', label: 'Illustrator' },
    { value: 'Brand Strategist', label: 'Brand Strategist' },
    { value: 'Copywriter', label: 'Copywriter' },
    { value: 'Video Game Designer', label: 'Game Designer' },
    { value: 'Web Designer', label: 'Web Designer' },
    { value: 'Frontend Developer', label: 'Frontend Dev' },
    { value: 'Digital Marketing Manager', label: 'Digital Marketing' },
    { value: 'Social Media Director', label: 'Social Media' },
    { value: 'Instructional Designer', label: 'Instructional Designer' },
    { value: 'Retoucher', label: 'Retoucher' },
    { value: 'Producer', label: 'Producer' },
    { value: 'Video Producer', label: 'Video Producer' },
    { value: 'UX Researcher', label: 'UX Researcher' },
    { value: 'AR Developer', label: 'AR Developer' },
    { value: 'Environmental Designer', label: 'Environmental Design' },
    { value: 'Fashion Designer', label: 'Fashion Designer' },
    { value: 'Photographer', label: 'Photographer' },
    { value: 'Set Designer', label: 'Set Designer' },
    { value: 'Sound Designer', label: 'Sound Designer' },
    { value: 'Storyboard Artist', label: 'Storyboard Artist' },
    { value: 'Agile Coach', label: 'Agile Coach' },
    { value: 'SEO Specialist', label: 'SEO Specialist' },
    { value: 'Technical Writer', label: 'Technical Writer' },
    { value: 'Content Strategist', label: 'Content Strategist' },
    { value: 'AI Developer', label: 'AI Developer' },
    { value: 'Game Writer', label: 'Game Writer' },
    { value: 'Cinematographer', label: 'Cinematographer' },
    { value: 'Augmented Reality Artist', label: 'AR Artist' },
    { value: 'Ethical Hacker (Creative Security)', label: 'Ethical Hacker' },
    { value: 'Virtual Reality Designer', label: 'VR Designer' },
    { value: 'Experience Designer', label: 'Experience Designer' },
    { value: 'NFT Artist', label: 'NFT Artist' },
    { value: 'Creative Technologist', label: 'Creative Technologist' },
    { value: 'Sustainability Designer', label: 'Sustainability Design' },
    { value: 'Exhibition Designer', label: 'Exhibition Design' },
    { value: 'Podcast Producer', label: 'Podcast Producer' },
    { value: 'Typography Designer', label: 'Typography Design' },
    { value: 'Character Designer', label: 'Character Design' },
    { value: 'Creative Data Analyst', label: 'Data Analyst' },
    { value: 'Interactive Media Designer', label: 'Interactive Media' },
    { value: 'Lighting Designer', label: 'Lighting Design' },
    { value: 'Creative Producer', label: 'Creative Producer' },
    { value: 'E-learning Designer', label: 'E-learning Design' },
    { value: 'User Interface Animator', label: 'UI Animator' }
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

<div class=" min-h-screen font-normal  uppercase grid grid-row-2 lg:grid-cols-3 pt-20 px-2 gap-10">

<div class=" row-span-1 lg:col-span-1 ">
	<h1 class='text-white text-[1.3rem] font-semibold '>APPLY</h1>
	<p class=' '>Welcome to the application form for 234creatives
		All the fields marked with * are required.</p>
</div>

<form class=' lg:col-span-2 row-span-1 grid grid-cols-1 sm:grid-cols-2 w-full gap-5 ' use:enhance method="POST">
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

        <Button class='hover:bg-zinc-700 text-white transition-[height] duration-300 ease-in-out h-[80px] sm:h-[80px] md:h-[140px] lg:h-[180px] '  type='submit'>Submit Application</Button>
    </div>
  

</form>

</div>





    
