# Blog Post Creation and Deployment Guide

## Creating a New Post

### 1. Update Post Template
In `src/data/postTemplate.js`, update the following fields:
```javascript
{
  id: "unique-id", // Increment from last post
  title: "Your Post Title",
  slug: "your-post-title", // URL-friendly version of title
  excerpt: "A brief description of your post (2-3 sentences)",
  content: "Your post content in HTML format",
  image: "/images/your-image.jpg", // Add image to public/images/
  author: "Your Name",
  date: "YYYY-MM-DD",
  readTime: "X min read",
  category: "Category Name",
  tags: ["tag1", "tag2", "tag3"],
  seo: {
    title: "SEO-friendly title",
    description: "SEO-friendly description (150-160 characters)",
    keywords: ["keyword1", "keyword2", "keyword3"],
    ogImage: "/images/your-image.jpg",
    ogTitle: "Social media title",
    ogDescription: "Social media description"
  }
}
```

### 2. Add Post Image
1. Add your post image to the `public/images/` directory
2. Recommended image size: 1200x630px for optimal display
3. Use descriptive filenames (e.g., `react-hooks-guide.jpg`)

### 3. Add Post to Posts List
In `src/data/posts.js`:
1. Import your new post data
2. Add it to the `posts` array
3. Make sure it's in the correct order (newest first)

## Testing Your Changes

### 1. Run Tests
```bash
npm test
```
This will run all tests in the project, including:
- Home component tests (post rendering, search functionality)
- PostDetail component tests (content rendering, comments)
- Navigation component tests (links, mobile menu)
- Newsletter component tests (subscription form)

### 2. Test Coverage
To see test coverage report:
```bash
npm test -- --coverage
```

### 3. Common Test Failures
If tests fail, check:
- Post data structure matches template
- All required fields are present
- Links and routes are correct
- Image paths are valid

## Deployment Steps

### 1. Test Locally
```bash
npm start
```
- Check if the post appears correctly
- Verify all links work
- Test responsive design
- Check SEO meta tags

### 2. Build and Deploy
```bash
npm run deploy
```
This will:
1. Build the production version
2. Deploy to Netlify
3. Make your changes live

### 3. Verify Deployment
1. Visit your Netlify URL
2. Check if the new post appears
3. Verify all links and images
4. Test on different devices

## Common Issues and Solutions

### 1. Post Not Appearing
- Check if post is added to `posts.js`
- Verify post data structure matches template
- Clear browser cache

### 2. Images Not Loading
- Verify image path in post data
- Check if image is in correct directory
- Ensure image filename matches exactly

### 3. SEO Issues
- Verify meta tags in post data
- Check if title and description are optimized
- Ensure keywords are relevant

## Best Practices

### 1. Content
- Keep titles under 60 characters
- Write compelling excerpts (150-160 characters)
- Use proper HTML formatting
- Include relevant images

### 2. SEO
- Use descriptive URLs
- Include relevant keywords
- Write unique meta descriptions
- Optimize image alt text

### 3. Images
- Optimize before uploading
- Use descriptive filenames
- Include alt text
- Maintain consistent aspect ratio

## Quick Reference

### Post Template Structure
```javascript
{
  id: "string",
  title: "string",
  slug: "string",
  excerpt: "string",
  content: "HTML string",
  image: "string (path)",
  author: "string",
  date: "YYYY-MM-DD",
  readTime: "string",
  category: "string",
  tags: ["string"],
  seo: {
    title: "string",
    description: "string",
    keywords: ["string"],
    ogImage: "string (path)",
    ogTitle: "string",
    ogDescription: "string"
  }
}
```

### Commands
```bash
# Test locally
npm start

# Run tests
npm test

# Deploy to Netlify
npm run deploy
```

### Important URLs
- Local development: http://localhost:3000
- Netlify site: https://sensational-phoenix-720d66.netlify.app
- Netlify dashboard: https://app.netlify.com/sites/sensational-phoenix-720d66