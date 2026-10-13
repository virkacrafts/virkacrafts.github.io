import './globals.css'
import './consent.css'
import './learning.css'
import JsonLd from '../components/JsonLd'
import SiteChrome from '../components/SiteChrome'
import {defaultDescription, siteName, siteUrl} from '../lib/site'
export const metadata={metadataBase:new URL(siteUrl),title:{default:`${siteName} | Crochet patterns & tools`,template:`%s | ${siteName}`},description:defaultDescription,keywords:['crochet patterns','crochet learning','stitch guides'],alternates:{canonical:'/'},robots:{index:true,follow:true,googleBot:{'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},openGraph:{type:'website',url:siteUrl,siteName,title:`${siteName} | Crochet patterns & tools`,description:defaultDescription,locale:'en_US'},twitter:{card:'summary_large_image',creator:'@virkacrafts'}}
export default function RootLayout({children}){const data={'@context':'https://schema.org','@graph':[{'@type':'WebSite',name:siteName,url:siteUrl},{'@type':'Organization',name:siteName,url:siteUrl,logo:`${siteUrl}/icon.png`,sameAs:[]}]};return <html lang="en"><body><JsonLd data={data}/><SiteChrome>{children}</SiteChrome></body></html>}
