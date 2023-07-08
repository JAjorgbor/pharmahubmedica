export default {
    name: 'about',
    title: 'About Information',
    type: 'document',
    fields: [
        {
            title: 'Content', 
            name: 'content',
            type: 'array', 
            of: [{type: 'block'}],
        },
        
    ],
}