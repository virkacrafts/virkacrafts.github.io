import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

const supportedTypes = new Set([
  'siteSettings',
  'guide',
  'product',
  'pattern',
  'category',
  'tag',
  'course',
  'post',
])

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({error: 'Revalidation is not configured'}, {status: 500})
  }

  try {
    const {isValidSignature, body} = await parseBody(request, secret)
    if (isValidSignature !== true) {
      return NextResponse.json({error: 'Invalid webhook signature'}, {status: 401})
    }
    if (!body?._type || !supportedTypes.has(body._type)) {
      return NextResponse.json({error: 'Unsupported or missing document type'}, {status: 400})
    }

    // The site layout and all pages beneath it include Sanity content or branding.
    revalidatePath('/', 'layout')
    return NextResponse.json({revalidated: true, documentType: body._type})
  } catch {
    return NextResponse.json({error: 'Invalid webhook request'}, {status: 400})
  }
}
