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
  ],
  fields: [
    { name: 'title', type: 'string',group:'productGroup' },
    { name: 'description', type: 'text' },
    {
      name: 'slug',
      group:'productGroup',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique name that can be used for the URL of this product, note that there should be no spaces between the words i.e:"slug-of-category" and not:"slug of category"',
    },
    {
      name: 'image',
      title: 'Category Image',
      group:'productGroup',
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
      name: 'category',
      type: 'reference',
      to: { type: 'category' },
      title: 'Category',
      group: 'categoryGroup',
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      group: 'categoryGroup',
      type: 'array',
      of: [
        {
          type: 'reference',
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
      name: 'tags',
      title: 'Tags',
      group: 'categoryGroup',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'productTag',
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
                    filter: '_id in $tagIds',
                    params: {
                      tagIds: category.productTags?.map((tag) => tag._ref),
                    },
                  }
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export default product
