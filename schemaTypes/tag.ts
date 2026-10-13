import {defineField, defineType} from 'sanity'
export const tag = defineType({name: 'tag', title: 'Tags', type: 'document', fields: [defineField({name: 'title', type: 'string', validation: r => r.required()}), defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()})]})
