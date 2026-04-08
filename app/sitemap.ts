import { MetadataRoute } from 'next';
import { SITE } from '@/lib/data/site';
import { NAV_LINKS } from '@/lib/data/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }));

  return routes;
}
