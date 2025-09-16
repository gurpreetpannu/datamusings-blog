
export const post = {
  id: 2, // Will be generated
  title: 'ChatGPT: Who is using it and how?',
  slug: 'ChatGPT-Who-is-using-it-and-how', // Will be generated from title
  excerpt: 'Who is using ChatGPT in 2025 and how are they using it',
  content: `
  <p>OpenAI recently released a paper outlining their analysis of who is using ChatGPT in 2025 and how are they using it. While it potrays a rather optimistic picture for the now profit company but the bigger question remains <b>Is it on track to replace Google?</b></p>
  
  <h2></h2>
  <p></p>
  <p></p>
  <p></p>

  <h2></h2>
  <p></p>
  <p></p>
  <h3></h3>
  <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 100%; margin: 0 auto; overflow: hidden;">
    <img
      src="
      alt="Patch Level Inconsistency"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
    </figcaption>
  </div> 
  <p></p>
  <h3></h3>
  <p></p>
  <p></p>
  <ul>
    <li></li>
    <li></li>
  </ul>
  <h2></h2>
  <div style="display: flex; flex-direction: column; align-items: center; width: 60%; max-width: 80%; margin: 0 auto; overflow: hidden;">
    <img
      src=""
      alt=""
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
    </figcaption>
  </div>
  <p></p>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90%; max-width: 90%; margin: 0 auto; overflow: hidden;">
    <img
      src=""
      alt="Segmentation"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
    </figcaption>
  </div> 
  <p></p>
  <h2></h2>
  <p></p>
   </div>
  <p></p>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90%; max-width: 90%; margin: 0 auto; overflow: hidden;">
    <img
      src=""
      alt=""
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
    </figcaption>
  </div> 
  <p></p>
  <h2></h2>
  <p>
    <a href="https://www.hindustantimes.com/world-news/us-news/mark-zuckerberg-s-arctic-superyacht-faces-protests-from-local-activists-in-svalbard-heres-why-101746374055090.html" target="_blank" rel="noopener noreferrer">
      ski trip to Norway
    </a>.
  </p>
  <p></p>

  <p>
  <ul>
    <li>
      <a href="https://www.nber.org/papers/w34255" target="_blank" rel="noopener noreferrer">
       ChatGPT paper 
      </a>
    </li>
    </ul>
  </p>
  ` ,
  image: '', // Path to image in src/assets/images/posts/
  coverPhoto:'/images/dino/dino-cover.png', 
  author: 'Gurpreet Pannu',
  date: new Date().toLocaleDateString('en-US'),
  readTime: '', // Will be calculated
  tags: [],
  status: 'published', // draft, published, archived
  seo: {
    title: 'ChatGPT: Who is using it and how?', // SEO title (can be different from post title)
    description: 'Who is using ChatGPT in 2025 and how are they using it', // Meta description
    keywords: ["GenAI", "female", "ChatGPT", "LLM", "productivity", "AI"], // Meta keywords
    ogTitle: 'ChatGPT: Who is using it and how?', // Open Graph title
    ogDescription: 'Who is using ChatGPT in 2025 and how are they using it', // Open Graph description
    ogImage: '/images/dino/dino-cover.png', // Open Graph image URL
    canonicalUrl: 'https://datamusings.blog/post/ChatGPT-Who-is-using-it-and-how', // Canonical URL
    structuredData: {
      type: 'Article',
      headline: 'ChatGPT: Who is using it and how?', // Article headline
      description: 'Who is using ChatGPT in 2025 and how are they using it', // Article description
      image: '/images/dino/dino-cover.png', // Article image URL
      author: {
        '@type': 'Person',
        name: 'Gurpreet Pannu'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gurpreet Pannu Blog',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.svg' // Your blog logo URL
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
    ogImage: post.seo?.ogImage || post.image ? post.image : '/images/blog-og.jpg',
    canonicalUrl: post.seo?.canonicalUrl || `https://datamusings.blog/post/${post.slug || ''}`
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