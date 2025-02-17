import { Client } from '@notionhq/client';
import { NOTION_AUTH, NOTION_DB } from '$env/static/private';
import { env } from '$env/dynamic/private';

const notion = new Client({ auth: NOTION_AUTH });

export async function getNotionPages() {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DB,
            page_size: 100,
            filter: {
                and: [
                    {
                        property: 'Listed',
                        select: {
                            equals: 'YES'
                        }
                    },
                    {
                        property: 'Status',
                        status: {
                            equals: 'Published to directory'
                        }
                    }
                ]
            },
            sorts: [
                {
                    property: 'Name',
                    direction: 'ascending'
                }
            ]
        });

        console.log('Initial response results:', response.results.length);

        // Get all services first
        const allServices = response.results
            .flatMap(page => page.properties.Services?.multi_select || [])
            .map(service => service.name);

        // Remove duplicates
        const uniqueServices = [...new Set(allServices)];

        const pagesPromises = response.results.map(async (page) => {
            try {
                const pageData = await notion.pages.retrieve({ page_id: page.id });
                console.log('Retrieved page:', pageData.id);
                const props = pageData.properties;

                // Fetch blocks for each page
                const blocks = await notion.blocks.children.list({
                    block_id: page.id,
                    page_size: 100
                });

                // Extract image blocks directly without optimization
                const imageUrls = blocks.results
                    .filter((block: any) => block.type === 'image')
                    .map((block: any) => ({
                        type: 'external',
                        name: 'Work Image',
                        external: { 
                            url: block.image.file?.url || block.image.external?.url || ''
                        }
                    }));

                return {
                    id: pageData.id,
                    name: props.Name?.title[0]?.text.content || 'Untitled',
                    email: props.Email?.email || '',
                    portfolio: props.Portfolio?.url || '#',
                    field: props.Field?.rich_text[0]?.text.content || '',
                    category: props.Category?.select?.name || 'Uncategorized',
                    services: props.Services?.multi_select?.map(item => ({
                        name: item.name,
                        color: item.color
                    })) || [],
                    worksMedia: imageUrls,
                    experienceLevel: props.Experience?.select?.name || 'Not specified',
                    created_time: pageData.created_time,
                    last_edited_time: pageData.last_edited_time
                };
            } catch (pageError) {
                console.error('Error processing page:', pageError);
                return null;
            }
        });

        const pages = (await Promise.all(pagesPromises)).filter(Boolean);
        console.log('Final processed pages:', pages.length);

        return {
            pages,
            services: uniqueServices
        };
    } catch (error) {
        console.error('Top level error:', error);
        throw error;
    }
}