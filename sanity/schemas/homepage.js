const homepage = {
  name: 'homepage',
  title: 'Home page Information',
  type: 'document',
  fields: [
    {
      title: 'Hero Main Heading',
      name: 'mainHeading',
      type: 'string',
    },
    { title: 'Hero Subheading', name: 'subheading', type: 'string' },
    { title: 'Hero Description', name: 'description', type: 'text' },
    {
      title: 'Hero Image',
      name: 'image',
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
