import { Client } from '@notionhq/client'
import { NOTION_AUTH, NOTION_DB } from '$env/static/private';
import { error, type RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getNotionPages } from '$lib/server/notionQuery';

export const load: PageServerLoad = async ({  }) => {
    try {
        const data = await getNotionPages();
        console.log('Loaded pages count:', data.pages.length);
        return data;
    } catch (e) {
        console.error('Load function error:', e);
        return { pages: [], services: [] };
    }
};

