const category = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'isFeaturedCategory',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Is this a featured category?',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique name that can be used for the URL of this category, note that there should be no spaces between the words i.e:"this-is-a-slug" and not:"this is not a slug"',
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Alternate text for screen readers',
          type: 'string',
        },
      ],
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
    {
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      description:
        'This is a list of subcategoires that belong to this category.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'subcategory' }],
        },
      ],
    },
    {
      name: 'productTags',
      title: 'Product Type Tags',
      description: 'Tags representing the product types of this category',
      type: 'array',
      of: [{type:'reference',to: [{ type: 'productTag' }],}],
    },
  ],
}
export default category
