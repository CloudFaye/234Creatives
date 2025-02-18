import { Client } from '@notionhq/client'
import { NOTION_AUTH, NOTION_DB } from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';
import type { NotionForm } from '$lib/server/db/types';

const notion = new Client({ auth: NOTION_AUTH });

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            // Validate required fields
            const requiredFields = ['name', 'email', 'portfolio', 'creativeCategory', 'creativeServices'];
            for (const field of requiredFields) {
                if (!formData.get(field)) {
                    return fail(400, {
                        type: 'error',
                        message: `${field} is required`,
                        field
                    });
                }
            }

            // Transform services string to array of objects
            const services = (formData.get('creativeServices') as string)
                .split(',')
                .map(service => ({
                    name: service.trim()
                }))
                .filter(service => service.name); // Remove empty services

            // Create the page
            const response = await notion.pages.create({
                parent: { database_id: NOTION_DB },
                properties: {
                    Name: {
                        title: [{ text: { content: formData.get('name') as string } }]
                    },
                    Email: {
                        email: formData.get('email') as string
                    },
                    Portfolio: {
                        url: formData.get('portfolio') as string
                    },
                    Category: {
                        select: {
                            name: formData.get('creativeCategory') as string
                        }
                    },
                    Field: {
                        rich_text: [{
                            text: { content: formData.get('shortBio') as string }
                        }]
                    },
                   Services: {
                        multi_select: (formData.get('creativeServices') as string)
                            .split(',')
                            .map(service => ({
                                name: service.trim()
                            }))
                    },
                    Status: {
                        status: {
                            name: "New submission"
                        }
                    },
                    Listed: {
                        select: {
                            name: "NO"
                        }
                    }
                }
            });

            // Update FormId
            await notion.pages.update({
                page_id: response.id,
                properties: {
                    Formid: {
                        rich_text: [{
                            text: {
                                content: response.id
                            }
                        }]
                    }
                }
            });

            // Return success response
            return {
                type: 'success',
                status: 200,
                message: 'Application submitted successfully! We will review your application and get back to you soon.',
                data: {
                    pageId: response.id,
                    submittedAt: new Date().toISOString()
                }
            };

        } catch (err) {
            console.error('Error submitting form:', err);
            
            // Handle specific Notion API errors
            if (err instanceof Error) {
                return fail(500, {
                    type: 'error',
                    message: 'Failed to submit application. Please try again later.',
                    details: process.env.NODE_ENV === 'development' ? err.message : undefined
                });
            }

            // Generic error
            return fail(500, {
                type: 'error',
                message: 'An unexpected error occurred. Please try again later.'
            });
        }
    }
};