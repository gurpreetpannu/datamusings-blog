const sgMail = require('@sendgrid/mail');
const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
  // Only allow scheduled function calls
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Get posts from the last week
    const posts = await getRecentPosts();
    
    if (!posts || posts.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No new posts to send' })
      };
    }

    // Create email content
    const emailContent = createEmailContent(posts);

    // Set SendGrid API key
    sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY);

    // Send digest email
    const msg = {
      to: process.env.NETLIFY_EMAILS_PROVIDER_LIST, // Your SendGrid mailing list
      from: {
        email: 'newsletter@datamusings.blog',
        name: 'Data Musings Newsletter'
      },
      subject: 'Weekly Digest: Latest Posts from Data Musings',
      text: createTextContent(posts),
      html: emailContent
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Weekly digest sent successfully' })
    };

  } catch (error) {
    console.error('Weekly digest error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send weekly digest' })
    };
  }
};

async function getRecentPosts() {
  try {
    // Get all markdown files from the posts directory
    const postsDir = path.join(process.cwd(), 'content/posts');
    const files = await fs.readdir(postsDir);
    
    // Filter for markdown files from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentPosts = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime > oneWeekAgo) {
          const content = await fs.readFile(filePath, 'utf-8');
          // Parse frontmatter and content
          const post = {
            title: extractTitle(content),
            excerpt: extractExcerpt(content),
            path: `/posts/${file.replace('.md', '')}`
          };
          recentPosts.push(post);
        }
      }
    }
    
    return recentPosts;
  } catch (error) {
    console.error('Error getting recent posts:', error);
    return [];
  }
}

function createEmailContent(posts) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          h1 { color: #1a8917; }
          .post { margin-bottom: 2rem; }
          .post h2 { margin-bottom: 0.5rem; }
          .post a { color: #1a8917; text-decoration: none; }
          .post a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Weekly Digest: Latest Posts from Data Musings</h1>
        <p>Here are our latest posts from the past week:</p>
        ${posts.map(post => `
          <div class="post">
            <h2><a href="https://datamusings.blog${post.path}">${post.title}</a></h2>
            <p>${post.excerpt}</p>
          </div>
        `).join('')}
        <hr>
        <p>Thank you for subscribing to Data Musings!</p>
        <p>If you no longer wish to receive these emails, you can <a href="[Unsubscribe]">unsubscribe here</a>.</p>
      </body>
    </html>
  `;
}

function createTextContent(posts) {
  return `
Weekly Digest: Latest Posts from Data Musings

Here are our latest posts from the past week:

${posts.map(post => `
${post.title}
${post.excerpt}
Read more: https://datamusings.blog${post.path}
`).join('\n')}

Thank you for subscribing to Data Musings!
  `;
}

function extractTitle(content) {
  const titleMatch = content.match(/title:\s*["'](.+)["']/);
  return titleMatch ? titleMatch[1] : 'Untitled Post';
}

function extractExcerpt(content) {
  const excerptMatch = content.match(/excerpt:\s*["'](.+)["']/);
  return excerptMatch ? excerptMatch[1] : '';
} 