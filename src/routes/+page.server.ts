import { Client } from '@notionhq/client'
import { NOTION_AUTH, NOTION_DB } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { NotionForm, Notiondb } from '$lib/server/db/types';

const notion = new Client({ auth: NOTION_AUTH });

export const load: PageServerLoad = async () => {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DB,
            page_size: 100
        });

        const pagesPromises = response.results.map(async (page) => {
            const pageData = await notion.pages.retrieve({ page_id: page.id });
            const props = pageData.properties;

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
                worksMedia: props.Works?.files || [],
                experienceLevel: props.Experience?.select?.name || 'Not specified',
                created_time: pageData.created_time,
                last_edited_time: pageData.last_edited_time
            };
        });

        const pages = await Promise.all(pagesPromises);
        return { pages };
    } catch (e) {
        console.error('Error fetching pages:', e);
        throw error(500, {
            message: 'Failed to fetch pages'
        });
    }
};


