import { useEffect } from 'react';
import appMetadata from '../../metadata.json';

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
}

export function useOpenGraph(customOg?: Partial<OpenGraphConfig>) {
  useEffect(() => {
    const defaultOg = (appMetadata as any).openGraph || {};
    const ogData: OpenGraphConfig = {
      ...defaultOg,
      ...customOg,
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    // Resolve a (possibly relative) asset path to an absolute URL that
    // respects Vite's base path (e.g. '/HYDRA-VAULT/' on GitHub Pages).
    const base = import.meta.env.BASE_URL;
    const toAbsolute = (p: string): string => {
      if (/^https?:\/\//i.test(p)) return p;
      const clean = p.replace(/^\//, '');
      if (base.startsWith('/')) return `${origin}${base}${clean}`;
      return `${origin}/${clean}`;
    };

    let fullImageUrl = toAbsolute(ogData.image || 'hydra_logo.jpg');

    let fullUrl = ogData.url || (typeof window !== 'undefined' ? window.location.href : origin);
    if (fullUrl.startsWith('/')) {
      fullUrl = `${origin}${fullUrl}`;
    }

    const tags: Record<string, string | undefined> = {
      // Standard description
      'description': ogData.description || appMetadata.description,
      
      // Open Graph Tags
      'og:title': ogData.title || appMetadata.name,
      'og:description': ogData.description || appMetadata.description,
      'og:type': ogData.type || 'website',
      'og:url': fullUrl,
      'og:image': fullImageUrl,
      'og:site_name': ogData.siteName || 'HYDRA SAMO',
      'og:locale': ogData.locale || 'en_US',

      // Twitter Card Tags
      'twitter:card': ogData.twitterCard || 'summary_large_image',
      'twitter:title': ogData.title || appMetadata.name,
      'twitter:description': ogData.description || appMetadata.description,
      'twitter:image': fullImageUrl,
      'twitter:site': ogData.twitterSite || '@hydrasamo',
    };

    // Helper to set or update meta tag by property or name
    const setMetaTag = (attributeName: 'property' | 'name', attributeValue: string, content: string) => {
      let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Apply standard description
    if (tags['description']) {
      setMetaTag('name', 'description', tags['description']);
    }

    // Apply Open Graph meta tags (using property="og:*")
    Object.entries(tags).forEach(([key, value]) => {
      if (!value) return;
      if (key.startsWith('og:')) {
        setMetaTag('property', key, value);
      } else if (key.startsWith('twitter:')) {
        setMetaTag('name', key, value);
      }
    });

    // Update document title dynamically
    if (ogData.title) {
      document.title = ogData.title;
    }
  }, [customOg?.title, customOg?.description, customOg?.image, customOg?.url]);
}
