export const postTemplate = {
  id: '', // Will be generated
  title: '',
  slug: '', // Will be generated from title
  excerpt: '',
  content: '',
  image: '', // Path to image in src/assets/images/posts/
  author: 'Gurpreet Pannu',
  date: new Date().toISOString(),
  readTime: '', // Will be calculated
  tags: [],
  status: 'draft', // draft, published, archived
  seo: {
    title: '', // SEO title (can be different from post title)
    description: '', // Meta description
    keywords: [], // Meta keywords
    ogTitle: '', // Open Graph title
    ogDescription: '', // Open Graph description
    ogImage: '', // Open Graph image URL
    canonicalUrl: '', // Canonical URL
    structuredData: {
      type: 'Article',
      headline: '', // Article headline
      description: '', // Article description
      image: '', // Article image URL
      author: {
        '@type': 'Person',
        name: 'Gurpreet Pannu'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gurpreet Pannu Blog',
        logo: {
          '@type': 'ImageObject',
          url: '' // Your blog logo URL
        }
      },
      datePublished: '', // Article publish date
      dateModified: '' // Article last modified date
    }
  }
};

// Helper function to generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Helper function to calculate read time
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Helper function to optimize image
export const optimizeImage = async (imageFile) => {
  // In a real app, you would use a service like Sharp or Cloudinary
  // For now, we'll just return the file path
  return imageFile;
};

// Helper function to generate meta tags
export const generateMetaTags = (post) => {
  return {
    title: post.seo?.title || post.title || 'Gurpreet Pannu Blog',
    description: post.seo?.description || post.excerpt || 'Thoughts on technology, programming, and more',
    keywords: post.seo?.keywords?.join(', ') || 'blog, technology, programming, software development',
    ogTitle: post.seo?.ogTitle || post.title || 'Gurpreet Pannu Blog',
    ogDescription: post.seo?.ogDescription || post.excerpt || 'Thoughts on technology, programming, and more',
    ogImage: post.seo?.ogImage || post.image || '/images/blog-og.jpg',
    canonicalUrl: post.seo?.canonicalUrl || `https://yourblog.com/post/${post.slug || ''}`
  };
};

// Helper function to generate structured data
export const generateStructuredData = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title || 'Gurpreet Pannu Blog',
    "description": post.excerpt || 'Thoughts on technology, programming, and more',
    "image": post.image || '/images/blog-og.jpg',
    "author": {
      "@type": "Person",
      "name": "Gurpreet Pannu"
    },
    "datePublished": post.date || new Date().toISOString(),
    "dateModified": post.date || new Date().toISOString()
  };
}; 