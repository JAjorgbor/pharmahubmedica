export default {
    name: 'faq',
    title: 'Frequently Asked Questions',
    type: 'document',
    fields: [
        {
            name: 'question',
            title: 'Question',
            type: 'string',
            description: 'This is the question that would be answered in the answer field below, please keep it brief',
        },
        {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            description: 'Keep your answers brief and concise',
        },
    ],
}