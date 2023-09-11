export default {
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'E-mail',
      validation: (Rule) => Rule.required(),
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'callNumber',
      title: 'Phone Call Number',
      validation: (Rule) => Rule.required(),
      description:'What phone number should be used to answer phone calls.',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'Whatsapp Number',
      validation: (Rule) => Rule.required(),
      description:
        'What phone number should be used for accepting orders and whatsapp messages.',
      type: 'string',
    },
    {
      name: 'facebookAccount',
      title: 'Facebook Account',
      type: 'url',
    },
    {
      name: 'instagramAccount',
      title: 'Instagram Account',
      type: 'url',
    },
  ],
}
