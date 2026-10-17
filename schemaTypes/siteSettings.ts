import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', type: 'string', initialValue: 'VirkaCrafts'}),
    defineField({name: 'websiteLogo', title: 'Website logo', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})]}),
    defineField({name: 'favicon', title: 'Favicon', type: 'image', options: {hotspot: true}}),
  ],
})
