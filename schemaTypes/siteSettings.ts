import {defineField, defineType} from 'sanity'
export const siteSettings = defineType({name: 'siteSettings', title: 'Site Settings', type: 'document', fields: [defineField({name: 'siteTitle', type: 'string', initialValue: 'VirkaCrafts'}), defineField({name: 'websiteLogo', type: 'image', options: {hotspot: true}})]})
