const homepage = {
  name: 'homepage',
  title: 'Home page hero section',
  type: 'document',
  fields: [
    {
      title: 'Hero Main Heading',
      name: 'mainHeading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Hero Subheading',
      name: 'subheading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Hero Description',
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Hero Image',
      name: 'image',
      validation: (Rule) => Rule.required(),
      type: 'image',
      fields: [{ name: 'alt', title: 'Alternative Text', type: 'string' }],
      options: {
        metadata: [
          'blurhash', // Default: included
          'lqip', // Default: included
          'palette', // Default: included
          'exif', // Default: not included
          'location', // Default: not included
        ],
      },
    },
  ],
}

export default homepage
