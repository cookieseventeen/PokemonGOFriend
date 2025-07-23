import Script from 'next/script';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'breadcrumbList';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          ...data,
        };
      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          ...data,
        };
      case 'breadcrumbList':
        return {
          ...baseData,
          '@type': 'BreadcrumbList',
          ...data,
        };
      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(generateStructuredData())}
    </Script>
  );
}
