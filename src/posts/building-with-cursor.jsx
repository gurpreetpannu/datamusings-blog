export const post = {
  id: 1,
  title: "Building a Modern Blog with Cursor AI: A Developer's Journey",
  slug: "building-with-cursor",
  excerpt: "My experience building a modern React blog using Cursor AI, from initial setup to deployment on Netlify with a custom domain.",
  content: `
    <p>As a developer, I'm always excited to explore new tools that can enhance my productivity and streamline the development process. Recently, I embarked on a journey to build this blog using Cursor AI, a powerful AI-powered code editor. In this post, I'll share my experience and the steps I took to create a modern, responsive blog with React and deploy it on Netlify.</p>

    <h2>Why Cursor AI?</h2>
    <p>Cursor AI is not just another code editor; it's an AI-powered development environment that understands context, suggests improvements, and helps write better code faster. What sets it apart is its ability to:</p>
    <ul>
      <li>Understand project context and provide relevant suggestions</li>
      <li>Generate code that follows best practices</li>
      <li>Help with debugging and problem-solving</li>
      <li>Streamline the development workflow</li>
    </ul>

    <h2>Setting Up the Project</h2>
    <p>The first step was setting up a new React project. Cursor AI helped streamline this process:</p>
    <ol>
      <li>Created a new React project using Create React App</li>
      <li>Set up the project structure with components, styles, and assets</li>
      <li>Implemented modern routing with React Router</li>
      <li>Added essential dependencies for development</li>
    </ol>

    <h2>Key Features Implementation</h2>
    <h3>1. Responsive Design</h3>
    <p>One of the primary focuses was creating a responsive design that works seamlessly across all devices. We implemented:</p>
    <ul>
      <li>Fluid typography using CSS variables</li>
      <li>Mobile-first approach with strategic breakpoints</li>
      <li>Flexible grid layouts</li>
      <li>Optimized images and assets</li>
    </ul>

    <h3>2. Blog Post Management</h3>
    <p>For managing blog posts, we chose a markdown-based approach:</p>
    <ul>
      <li>Created a posts directory for markdown files</li>
      <li>Implemented frontmatter for post metadata</li>
      <li>Added syntax highlighting for code blocks</li>
      <li>Set up dynamic routing for blog posts</li>
    </ul>

    <h3>3. Contact Form</h3>
    <p>The contact form implementation included:</p>
    <ul>
      <li>Netlify Forms integration for serverless form handling</li>
      <li>Real-time form validation</li>
      <li>Loading states and error handling</li>
      <li>Spam prevention with honeypot fields</li>
    </ul>

    <h3>4. Newsletter Integration</h3>
    <p>We added a newsletter subscription feature:</p>
    <ul>
      <li>Clean and intuitive subscription form</li>
      <li>Integration with email service providers</li>
      <li>Success and error state management</li>
      <li>GDPR compliance considerations</li>
    </ul>

    <h2>Deployment Process</h2>
    <p>The deployment process was surprisingly smooth:</p>

    <h3>1. Domain Setup</h3>
    <ul>
      <li>Purchased domain from Namecheap</li>
      <li>Configured DNS settings</li>
      <li>Set up SSL certificate through Netlify</li>
    </ul>

    <h3>2. Netlify Configuration</h3>
    <ul>
      <li>Created netlify.toml for build settings</li>
      <li>Set up redirects and headers</li>
      <li>Configured form handling</li>
      <li>Enabled continuous deployment</li>
    </ul>

    <h3>3. Performance Optimization</h3>
    <ul>
      <li>Implemented lazy loading for images</li>
      <li>Added caching headers</li>
      <li>Optimized asset delivery</li>
      <li>Set up automatic image optimization</li>
    </ul>

    <h2>Challenges and Solutions</h2>

    <h3>Challenge 1: Dynamic Routing</h3>
    <p>Initially, setting up dynamic routing for blog posts was tricky. The solution was to:</p>
    <ul>
      <li>Implement dynamic imports for markdown files</li>
      <li>Create a post mapping system</li>
      <li>Add fallback pages for loading states</li>
    </ul>

    <h3>Challenge 2: Form Handling</h3>
    <p>Integrating forms with Netlify required some adjustments:</p>
    <ul>
      <li>Added proper form attributes</li>
      <li>Implemented client-side validation</li>
      <li>Set up success/error notifications</li>
      <li>Added spam prevention measures</li>
    </ul>

    <h3>Challenge 3: Performance</h3>
    <p>To ensure optimal performance, we:</p>
    <ul>
      <li>Implemented code splitting</li>
      <li>Added service worker for offline support</li>
      <li>Optimized image loading</li>
      <li>Minimized bundle size</li>
    </ul>

    <h2>Lessons Learned</h2>

    <h3>1. AI-Assisted Development</h3>
    <ul>
      <li>Cursor AI significantly reduced development time</li>
      <li>Helped maintain consistent code quality</li>
      <li>Provided valuable suggestions for improvements</li>
    </ul>

    <h3>2. Modern Web Development</h3>
    <ul>
      <li>Importance of responsive design</li>
      <li>Value of serverless architecture</li>
      <li>Benefits of continuous deployment</li>
    </ul>

    <h3>3. Best Practices</h3>
    <ul>
      <li>Keeping code modular and reusable</li>
      <li>Implementing proper error handling</li>
      <li>Following accessibility guidelines</li>
    </ul>

    <h2>Future Improvements</h2>
    <p>While the current implementation works well, there's always room for improvement:</p>
    <ul>
      <li>Adding search functionality</li>
      <li>Implementing dark mode</li>
      <li>Adding comments system</li>
      <li>Enhancing SEO optimization</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Building this blog with Cursor AI was an enlightening experience. The combination of modern web technologies and AI-assisted development created a workflow that was both efficient and enjoyable. The result is a fast, responsive, and maintainable blog that can grow with future needs.</p>
    <p>For developers interested in trying Cursor AI, I highly recommend giving it a shot. The learning curve is minimal, and the benefits are substantial. Whether you're building a personal blog or a complex web application, having an AI assistant can significantly improve your development experience.</p>
  `,
  image: '/images/cursor-blog.jpg',
  author: 'Gurpreet Pannu',
  date: '01/05/2025',
  readTime: '',
  category: 'Development',
  tags: ['React', 'Cursor AI', 'Web Development', 'Netlify', 'AI Tools'],
  seo: {
    title: "Building a Modern Blog with Cursor AI: A Developer's Journey",
    description: "Learn how I built a modern React blog using Cursor AI, from initial setup to deployment on Netlify with a custom domain. A practical guide to AI-assisted development.",
    keywords: ['Cursor AI', 'React Blog', 'Web Development', 'Netlify Deployment', 'AI Development Tools'],
    ogTitle: "Building a Modern Blog with Cursor AI: A Developer's Journey",
    ogDescription: "Learn how I built a modern React blog using Cursor AI, from initial setup to deployment on Netlify with a custom domain. A practical guide to AI-assisted development.",
    ogImage: '/images/cursor-blog.jpg',
    canonicalUrl: 'https://datamusings.blog/post/building-with-cursor',
    structuredData: {
      headline: "Building a Modern Blog with Cursor AI: A Developer's Journey",
      description: "Learn how I built a modern React blog using Cursor AI, from initial setup to deployment on Netlify with a custom domain. A practical guide to AI-assisted development.",
      image: '/images/cursor-blog.jpg',
      publisher: {
        logo: {
          url: '/images/logo.svg'
        }
      }
    }
  }
}

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