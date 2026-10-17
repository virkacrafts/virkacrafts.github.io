import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', type: 'string', initialValue: 'VirkaCrafts'}),
    defineField({name: 'websiteLogo', title: 'Website logo', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})]}),
    defineField({name: 'favicon', title: 'Favicon', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'adSlots',
      title: 'Advertisement slots',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'slot', title: 'Placement', type: 'string', options: {list: [{title: 'Site-wide banner', value: 'global'}, {title: 'Homepage sidebar', value: 'home-sidebar'}]}, validation: rule => rule.required()}),
          defineField({name: 'active', title: 'Active', type: 'boolean', initialValue: false}),
          defineField({name: 'image', title: 'Banner image', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})]}),
          defineField({name: 'link', title: 'Destination URL', type: 'url'}),
          defineField({name: 'label', title: 'Text advertisement (optional)', type: 'string'}),
        ],
        preview: {select: {title: 'slot', subtitle: 'label', media: 'image'}},
      }],
    }),
  ],
})
