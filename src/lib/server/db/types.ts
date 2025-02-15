


export interface NotionForm {
    name: string;
    email: string;
    portfolio: string;
    creativeCategory: string;
    shortBio: string;
    creativeServices: string;
    works: string
}

export interface Notiondb {
  properties: {
    Name: { title: Array<{ text: {content: string;}; }> },
    Field: { type: 'rich_text', 'rich_text': [{ text: { content: string} }]};
    Formid: { type: 'rich_text', 'rich_text': [{ text: { content: string} }]};
    Email: { type: 'email', email: string};
    Portfolio: { type: 'url', url: string};
    Category: { type: 'select', select:{ name: string} };
    Services: { type: 'multi_select', multi_select:[{ name: string, color:string, description:string}] };
    Status: { type: 'status', status:{ name:string } };
    Listed: { type: 'select', select:{ name: string}  };
    id: string;
    created_time: string;
    last_edited_time: string;
   
   
} 
}



