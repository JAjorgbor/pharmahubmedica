const category = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'boolean',
      description:
        'If this is set to false it will not be displayed on the website',
      initialValue: true,
    },
    {
      name: 'isTopCategory',
      title: 'Top Category',
      type: 'boolean',
      description: 'Is this a top category?',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique name that can be used for the URL of this category, note that there should be no spaces between the words i.e:"this-is-a-slug" and not:"this is not a slug"',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Alternate text for screen readers',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
    // {
    //   name: 'productTags',
    //   title: 'Product Type Tags',
    //   description: 'Tags representing the product types of this category',
    //   type: 'array',
    //   of: [{type:'reference',to: [{ type: 'productTag' }],}],
    // },
  ],
}
export default category
