export default {
  name: 'review',
  title: 'Reviews',
  type: 'document',
  hidden: true, // This will hide the schema from the sidebar
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
    { name: 'hideReview', type: 'boolean', title: 'Hide this review' },
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
            {name:'hideReply', type: 'boolean', title:'Hide this reply'}
            // {
            //   name: 'user',
            //   type: 'object',
            //   fields: [
            //     { name: 'email', title: 'email', type: 'string' },
            //     { name: 'userName', title: 'Name', type: 'string' },
            //     {
            //       name: 'profilePhoto',
            //       title: 'Profile Photo URL',
            //       type: 'url',
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
  ],
}
