import { Client } from '@notionhq/client'
import { NOTION_AUTH, NOTION_DB } from '$env/static/private';
import { error, type RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getNotionPages } from '$lib/server/notionQuery';

export const load: PageServerLoad = async ({  }) => {
    try {
        const pages = await getNotionPages();
        return { pages };
    } catch (e) {
        console.error('Error fetching pages:', e);
        throw error(500, {
            message: 'Failed to fetch pages'
        });
    }
};

