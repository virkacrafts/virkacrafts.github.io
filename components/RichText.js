import {PortableText} from 'next-sanity'

export default function RichText({value}) {
  if (!value?.length) return null
  return <PortableText value={value}/>
}
