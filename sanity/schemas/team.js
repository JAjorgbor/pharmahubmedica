export default {
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    {
      title: 'Team Members Emails',
      name: 'emails',
      type: 'array',
      description:
        'The emails provided here would be able to leave replies to reviews on the website as a representative of the comapy.',
      of: [{ type: 'string' }],
    },
  ],
}
