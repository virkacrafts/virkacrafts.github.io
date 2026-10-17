import {PortableText} from 'next-sanity'
import Image from 'next/image'

const portableTextComponents = {
  types: {
    image: ({value}) => value?.url ? (
      <figure className="portable-image">
        <Image src={value.url} alt={value.alt || ''} width={1200} height={800}/>
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ) : null,
  },
}

export default function RichText({value}) {
  if (!value?.length) return null
  return <PortableText value={value} components={portableTextComponents}/>
}
