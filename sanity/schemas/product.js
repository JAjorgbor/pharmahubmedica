// import SubcategoryReferenceInput from './SubcategoryReferenceInput'
import { client } from '../lib/client'

const product = {
  name: 'product',
  title: 'Products',
  type: 'document',
  groups: [
    {
      name: 'productGroup',
      title: 'Product Info',
    },
    {
      name: 'categoryGroup',
      title: 'Category Info',
    },
    {
      name: 'reviewGroup',
      title: 'Reviews',
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'productGroup',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }],
      group: 'productGroup',
    },
    {
      name: 'metaDescription',
      type: 'string',
      title: 'Meta Description',
      group: 'productGroup',
      description: 'The description that would be used for Search Engine Optimization.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'productGroup',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'boolean',
      description:
        'Is this product active if set to false it will not be displayed on the website',
      initialValue: true,
      group: 'productGroup',
    },
    {
      name: 'isNewlyStocked',
      title: 'Is a newly stocked product',
      type: 'boolean',
      description:
        'This field determines if this product is showed on the homepage as a newly stocked product.',
      initialValue: false,
      group: 'productGroup',
    },

    {
      name: 'slug',
      group: 'productGroup',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique name that can be used for the URL of this product, note that there should be no spaces between the words i.e:"slug-of-product" and not:"slug of product"',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'image',
      title: 'Image',
      group: 'productGroup',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: { type: 'category' },
      group: 'categoryGroup',
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      group: 'categoryGroup',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          description:
            'What subcategory under the selected category above does this product fall under, please do not use this field to create a new category instead use the category field above to make a new subcategory if you need to in order to avoid errors',
          to: [{ type: 'subcategory' }],
          weak: true,
          options: {
            filter: async ({ document }) => {
              if (!document?.category) {
                return
              }
              const category = await client.fetch(
                `*[_type=="category" && _id == $categoryId][0]`,
                {
                  categoryId: document.category._ref,
                }
              )
              return {
                filter: '_id in $subcatIds',
                params: {
                  subcatIds: category.subcategories?.map(
                    (subcat) => subcat._ref
                  ),
                },
              }
            },
          },
        },
      ],
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      group: 'reviewGroup',
      // readOnly: true,
      of: [
        {
          type: 'reference',
          to: [{ type: 'review' }],
          options: {
            weak: true,
          },
        },
      ],
    },
  ],
}

export default product
