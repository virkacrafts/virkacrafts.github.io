import {siteUrl} from '../lib/site'
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/studio/','/admin/','/api/','/login/']},sitemap:`${siteUrl}/sitemap.xml`}}
