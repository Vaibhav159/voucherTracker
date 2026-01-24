import { Helmet } from 'react-helmet-async';

export default function SEO({
    title,
    description,
    canonical,
    type = 'website',
    image = '/og-image.jpg',
    keywords
}) {
    const siteTitle = 'CardPerks - Premium Credit Card Discovery';
    const fullTitle = title ? `${title} | CardPerks` : siteTitle;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical || window.location.href} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonical || window.location.href} />
            <meta property="og:site_name" content="CardPerks" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
