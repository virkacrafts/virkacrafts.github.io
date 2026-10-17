import {defineField, defineType} from 'sanity'

const imageDetails = [
  defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
  defineField({name: 'caption', type: 'string'}),
]

export const guide = defineType({
  name: 'guide',
  title: 'Stitch Guides',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'level', type: 'string', options: {list: ['Basic', 'Advanced']}, initialValue: 'Basic'}),
    defineField({name: 'stitchImage', title: 'Featured stitch image', type: 'image', options: {hotspot: true}, fields: imageDetails}),
    defineField({name: 'drawingImage', title: 'Stitch drawing or diagram', type: 'image', options: {hotspot: true}, fields: imageDetails}),
    defineField({name: 'usAbbreviation', type: 'string'}),
    defineField({name: 'ukAbbreviation', type: 'string'}),
    defineField({name: 'stitchSymbol', type: 'string'}),
    defineField({name: 'stitchSymbolImage', title: 'Stitch symbol image', type: 'image', options: {hotspot: true}, fields: imageDetails}),
    defineField({
      name: 'referenceImages',
      title: 'Gallery and reference images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}, fields: imageDetails}],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions and inline images',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', title: 'Inline image or diagram', options: {hotspot: true}, fields: imageDetails},
      ],
    }),
    defineField({name: 'instructionPdf', title: 'Instruction PDF', type: 'file', options: {accept: 'application/pdf'}}),
    defineField({
      name: 'steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title', type: 'string'}),
          defineField({name: 'text', type: 'text'}),
          defineField({name: 'image', type: 'image', options: {hotspot: true}, fields: imageDetails}),
          defineField({name: 'animationFile', type: 'file', options: {accept: 'image/gif,image/webp'}}),
        ],
      }],
    }),
    defineField({name: 'isPublished', type: 'boolean', initialValue: true}),
  ],
})
