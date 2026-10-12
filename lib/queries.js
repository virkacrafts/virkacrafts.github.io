export const patternProjection = `{
  "id": _id, "title": coalesce(title, name), "slug": slug.current,
  "description": coalesce(shortDescription, description[0].children[0].text, "Explore this crochet pattern."),
  "category": coalesce(category->title, category), "categorySlug": coalesce(category->slug.current, lower(category)),
  "tags": tags[]->{title, "slug": slug.current}, "difficulty": coalesce(difficulty, "Beginner"),
  "image": coalesce(mainImage.asset->url, image.asset->url, featuredImage.asset->url),
  "pdf": coalesce(pdf.asset->url, guidePdf.asset->url), "checkoutUrl": checkoutUrl, "price": price, "isFree": coalesce(isFree, true),
  "publishedAt": coalesce(publishedAt, _createdAt)
}`

export const patternsQuery = `*[_type in ["product", "pattern"] && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc, _createdAt desc) ${patternProjection}`
export const patternBySlugQuery = `*[_type in ["product", "pattern"] && slug.current == $slug][0] ${patternProjection}`
export const categoriesQuery = `*[_type == "category" && defined(slug.current)] | order(title asc){title, description, "slug": slug.current, "updatedAt": _updatedAt}`
export const tagsQuery = `*[_type == "tag" && defined(slug.current)] | order(title asc){title, "slug": slug.current, "updatedAt": _updatedAt}`
export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{title, description, "slug": slug.current, "updatedAt": _updatedAt}`
export const tagBySlugQuery = `*[_type == "tag" && slug.current == $slug][0]{title, "slug": slug.current, "updatedAt": _updatedAt}`
export const patternsByCategoryQuery = `*[_type in ["product", "pattern"] && (category->slug.current == $slug || lower(category) == $slug)] | order(publishedAt desc, _createdAt desc) ${patternProjection}`
export const patternsByTagQuery = `*[_type in ["product", "pattern"] && $slug in tags[]->slug.current] | order(publishedAt desc, _createdAt desc) ${patternProjection}`
