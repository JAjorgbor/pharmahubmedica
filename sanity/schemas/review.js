export default {
  name: 'review',
  title: 'Reviews',
  type: 'document',
  fields: [
    {
      name: 'user',
      type: 'object',
      fields: [
        { name: 'email', title: 'email', type: 'string' },
        { name: 'userName', title: 'Name', type: 'string' },
        { name: 'profilePhoto', title: 'Profile Photo URL', type: 'url' },
      ],
    },
    // {
    //   name: 'product',
    //   title: 'Product',
    //   type: 'reference',
    //   to: { type: 'product' },
    // },
    { name: 'comment', type: 'string', title: 'Comment' },
    { name: 'stars', type: 'number', title: 'Stars' },
    {
      name: 'replies',
      title: 'Replies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reply',
          fields: [
            { name: 'comment', type: 'string', title: 'comment' },
            {
              name: 'user',
              type: 'object',
              fields: [
                { name: 'email', title: 'email', type: 'string' },
                { name: 'userName', title: 'Name', type: 'string' },
                {
                  name: 'profilePhoto',
                  title: 'Profile Photo URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
