const subcategory= {
    title:'Subcategories',
    name:'subcategory',
    type:'document',
    fields:[
    {
      type: 'string',
      title: 'Name',
      name: 'name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'boolean',
      description:
        'Is this subcategory active if set to false it will not be displayed on the website',
      initialValue: true,
    },
    {
      type: 'text',
      title: 'Description',
      name: 'description',
    },
  ],
}
export default subcategory