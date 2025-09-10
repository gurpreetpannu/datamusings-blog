
export const post = {
  id: 'dino', // Will be generated
  title: 'Dino V3: What is Meta upto?',
  slug: 'Dino-V3-what-is-Meta-upto', // Will be generated from title
  excerpt: 'Here I explain the newest model by Meta which serves as a generalised model for image tasks and is entirely based on Self-Supervised Learning ',
  content: `
  <p>DINOv3 is the latest update (released just this week) to the previous generalised model Dino V2 by Meta and they have made massive strides in not just matching upto the current supervised models but even beating the benchmarks in some cases. All of this while training the model in a completely self-supervised way. So lets dive into the finer details on how they did it and what they aim to achieve doing this.</p>
  
  <h2>Why?</h2>
  <p>The unique thing about the DINOv3 approach of Meta is that it is Self-supervised. The advantage that it offers is that it can train on "massive, raw image collections" as compared to weakly or full supervised pretraining methods which requires the images to be paired with "high quality metadata". This essentially makes available a virtually unlimited amount of training data for the purpose of training large and capable visual encoder models.</p>
  <p>It is a foundational model which means that this single model can be used for a range of computer vision tasks just like LLMs are foundational language models. SSL models are "robust to input distribution shifts, provide strong global and local features, and generate rich embeddings that facilitate physical scene understanding".</p>
  <p>However SSL training comes with its own shortfalls, the most prominent being that "the performance of features gradually decreases after early training", this is where DINOv3</p>
  ` ,
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