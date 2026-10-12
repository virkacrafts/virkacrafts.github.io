import './globals.css'
import './consent.css'
import Header from '../components/Header'
import JsonLd from '../components/JsonLd'
import ConsentBanner from '../components/ConsentBanner'
import {defaultDescription, siteName, siteUrl} from '../lib/site'
export const metadata={metadataBase:new URL(siteUrl),title:{default:`${siteName} | Crochet patterns & tools`,template:`%s | ${siteName}`},description:defaultDescription,keywords:['crochet patterns','crochet learning','stitch guides'],alternates:{canonical:'/'},robots:{index:true,follow:true,googleBot:{'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},openGraph:{type:'website',url:siteUrl,siteName,title:`${siteName} | Crochet patterns & tools`,description:defaultDescription,locale:'en_US'},twitter:{card:'summary_large_image',creator:'@virkacrafts'}}
export default function RootLayout({children}){const data={'@context':'https://schema.org','@graph':[{'@type':'WebSite',name:siteName,url:siteUrl,potentialAction:{'@type':'SearchAction',target:`${siteUrl}/patterns?search={search_term_string}`,'query-input':'required name=search_term_string'}},{'@type':'Organization',name:siteName,url:siteUrl,logo:`${siteUrl}/icon.png`,sameAs:[]}]};return <html lang="en"><body><JsonLd data={data}/><Header/><main>{children}</main><footer><p>© {new Date().getFullYear()} VirkaCrafts</p><nav aria-label="Footer navigation"><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></nav></footer><ConsentBanner/></body></html>}
