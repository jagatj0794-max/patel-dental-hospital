import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  schema?: any;
}

export function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  schema
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    const originalTitle = document.title;
    document.title = title;

    // Helper to get or create meta elements
    const getOrCreateMeta = (attrName: string, attrVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      return element;
    };

    // 2. Meta Description
    const metaDesc = getOrCreateMeta('name', 'description');
    const originalDesc = metaDesc.getAttribute('content') || '';
    metaDesc.setAttribute('content', description);

    // 3. Meta Keywords
    const metaKeywords = getOrCreateMeta('name', 'keywords');
    const originalKeywords = metaKeywords.getAttribute('content') || '';
    metaKeywords.setAttribute('content', keywords);

    // 4. Open Graph Tags
    const ogTypeMeta = getOrCreateMeta('property', 'og:type');
    const originalOgType = ogTypeMeta.getAttribute('content') || '';
    ogTypeMeta.setAttribute('content', ogType);

    const ogTitleMeta = getOrCreateMeta('property', 'og:title');
    const originalOgTitle = ogTitleMeta.getAttribute('content') || '';
    ogTitleMeta.setAttribute('content', ogTitle || title);

    const ogDescMeta = getOrCreateMeta('property', 'og:description');
    const originalOgDesc = ogDescMeta.getAttribute('content') || '';
    ogDescMeta.setAttribute('content', ogDescription || description);

    const ogImgMeta = getOrCreateMeta('property', 'og:image');
    const originalOgImg = ogImgMeta.getAttribute('content') || '';
    ogImgMeta.setAttribute('content', ogImage);

    const ogUrlMeta = getOrCreateMeta('property', 'og:url');
    const originalOgUrl = ogUrlMeta.getAttribute('content') || '';
    const currentUrl = canonicalUrl || window.location.href;
    ogUrlMeta.setAttribute('content', currentUrl);

    // 5. Twitter Card Tags
    const twitterCardMeta = getOrCreateMeta('name', 'twitter:card');
    const originalTwitterCard = twitterCardMeta.getAttribute('content') || '';
    twitterCardMeta.setAttribute('content', twitterCard);

    const twitterTitleMeta = getOrCreateMeta('name', 'twitter:title');
    const originalTwitterTitle = twitterTitleMeta.getAttribute('content') || '';
    twitterTitleMeta.setAttribute('content', ogTitle || title);

    const twitterDescMeta = getOrCreateMeta('name', 'twitter:description');
    const originalTwitterDesc = twitterDescMeta.getAttribute('content') || '';
    twitterDescMeta.setAttribute('content', ogDescription || description);

    const twitterImgMeta = getOrCreateMeta('name', 'twitter:image');
    const originalTwitterImg = twitterImgMeta.getAttribute('content') || '';
    twitterImgMeta.setAttribute('content', ogImage);

    // 6. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    let originalCanonical = '';
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    } else {
      originalCanonical = canonicalLink.getAttribute('href') || '';
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 7. Schema Markup Injection
    let schemaScript: HTMLScriptElement | null = null;
    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'dynamic-seo-schema');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup function to restore original home/base meta tags when leaving page
    return () => {
      document.title = originalTitle;
      
      if (originalDesc) metaDesc.setAttribute('content', originalDesc);
      else metaDesc.remove();

      if (originalKeywords) metaKeywords.setAttribute('content', originalKeywords);
      else metaKeywords.remove();

      if (originalOgType) ogTypeMeta.setAttribute('content', originalOgType);
      else ogTypeMeta.remove();

      if (originalOgTitle) ogTitleMeta.setAttribute('content', originalOgTitle);
      else ogTitleMeta.remove();

      if (originalOgDesc) ogDescMeta.setAttribute('content', originalOgDesc);
      else ogDescMeta.remove();

      if (originalOgImg) ogImgMeta.setAttribute('content', originalOgImg);
      else ogImgMeta.remove();

      if (originalOgUrl) ogUrlMeta.setAttribute('content', originalOgUrl);
      else ogUrlMeta.remove();

      if (originalTwitterCard) twitterCardMeta.setAttribute('content', originalTwitterCard);
      else twitterCardMeta.remove();

      if (originalTwitterTitle) twitterTitleMeta.setAttribute('content', originalTwitterTitle);
      else twitterTitleMeta.remove();

      if (originalTwitterDesc) twitterDescMeta.setAttribute('content', originalTwitterDesc);
      else twitterDescMeta.remove();

      if (originalTwitterImg) twitterImgMeta.setAttribute('content', originalTwitterImg);
      else twitterImgMeta.remove();

      if (originalCanonical) {
        canonicalLink?.setAttribute('href', originalCanonical);
      } else {
        canonicalLink?.remove();
      }

      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, twitterCard, canonicalUrl, schema]);
}
