export default {
    name: 'about',
    title: 'About Information',
    type: 'document',
    fields: [
        {
            title: 'First Background Image', 
            name: 'firstBackgroundImage',
            type: 'image', 
        },
        {
            title: 'Content', 
            name: 'content',
            type: 'array', 
            of: [{type: 'block'}],
        },
        {
            title: 'Second Background Image', 
            name: 'secondBackgroundImage',
            type: 'image', 
        },
        
    ],
}