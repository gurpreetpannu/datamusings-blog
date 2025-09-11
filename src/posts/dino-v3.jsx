
export const post = {
  id: 1, // Will be generated
  title: 'Dino V3: What is Meta upto?',
  slug: 'Dino-V3-what-is-Meta-upto', // Will be generated from title
  excerpt: 'Here I explain the newest model by Meta which serves as a generalised model for image tasks and is entirely based on Self-Supervised Learning ',
  content: `
  <p>DINOv3 is the latest update (released just this week) to the previous generalised model Dino V2 by Meta and they have made massive strides in not just matching upto the current supervised models but even beating the benchmarks in some cases. All of this while training the model in a completely self-supervised way. So lets dive into the finer details on how they did it and what they aim to achieve doing this.</p>
  
  <h2>The Need for DINO</h2>
  <p>The unique thing about the DINOv3 approach of Meta is that it is Self-supervised. The advantage that it offers is that it can train on "massive, raw image collections" as compared to weakly or full supervised pretraining methods which requires the images to be paired with "high quality metadata". This essentially makes available a virtually unlimited amount of training data for the purpose of training large and capable visual encoder models.</p>
  <p>It is a foundational model which means that this single model can be used for a range of computer vision tasks just like LLMs are foundational language models. SSL models are "robust to input distribution shifts, provide strong global and local features, and generate rich embeddings that facilitate physical scene understanding".</p>
  <p>However SSL training comes with its own shortfalls, the most prominent being that "the performance of features gradually decreases after early training", this is where DINOv3 shines and achieves remarkable results in downstream tasks.</p>

  <h2>How is dense representation unlocked?</h2>
  <p>The truly outstanding benefit of this model is that it produces dense features that can be used "off-the-shelf or with little post-processing". They are able to achieve this by using a novel technique called <b>gram anchoring</b>.</p>
  <p>Foundational models such as the one we discuss here benefit immensely from extended large-scale training, because this is where mergent capabilities are seen. However for vision models we see a performance degradation on dense tasks which is "due to the emergence of patch-level inconsistencies in feature representations". This undermines the interest behind extended training.</p>
  <h3>Loss of Patch-Level Consistency over Training </h3>
  <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 100%; margin: 0 auto; overflow: hidden;">
    <img
      src="/images/dino/patch-level-inconsistency.png"
      alt="Patch Level Inconsistency"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
      As training progress the features become noisier as seen above.
    </figcaption>
  </div> 
  <p>The above figure shows the cosine simlarity between the backbone's output patch features and a reference patch (highlighted in red). With higher iterations there is an increasing number of irrelevant patches with high similarity to the reference patch.</p>
  <h3>Gram Anchoring Objective</h3>
  <p>The authors introduce a new objective which is a loss function which operates on the <i>Gram matrix</i>: the matrix of all pairwise dot products of patch features in an image. It follows a <i>student-teacher</i> framework where the gram teacher is an early iteration of the teacher network, which exhibits superior dense properties. The loss function is designed to push the Gram matrix of the student towards this earlier Gram teacher matrix.</p>
  <p>The authors also successfully leverage the benefits ofthe following methods:</p>
  <ul>
    <li>Feeding higher resolution images into the backbone produces finer and more detailed feature maps</li>
    <li>Weighted average of patch features can yield stronger local representations by smoothing outlier patches and enhancing patch-level consistency</li>
  </ul>
  <h2>Results</h2>
  <div style="display: flex; flex-direction: column; align-items: center; width: 60%; max-width: 80%; margin: 0 auto; overflow: hidden;">
    <img
      src="/images/dino/unsupervised-object.png"
      alt="unsupervised object discovery"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
      Unsupervised object discovery with no annotation and no post-processing
    </figcaption>
  </div>
  <p>DINOv3 does excellently well in class-agnostic unsupervised object detection as shown above. This could be used in fields where manual annotations or human labelling are costly.</p>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90%; max-width: 90%; margin: 0 auto; overflow: hidden;">
    <img
      src="/images/dino/segmentation-tracking.png"
      alt="Segmentation"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
      Segmentation tracking of objects in a video
    </figcaption>
  </div> 
  <p>The model is also able to accurately track objects over time. While the full array of results compared to benchmarks is available in the paper linked at the end of the post I have only tried here to highlight the emergent abilities of a foundational vision model. These are capabilities it was not designed or trained to do and hence it is truly remarkable.</p>
  <h2>The family of Dino's</h2>
  <p>The original model is a ViT-7B parameters model which is used to create smaller Vision Transformer variants (ViT-S, ViT-B and ViT-L). The authors rely on a different approach than the popular exponential moving average (EMA) of model weights. They use the 7B model directly as the teacher to guide the student models thus making the teacher in this knowledge distillation process fixed.</p>
   </div>
  <p>DINOv3 does excellently well in class-agnostic unsupervised object detection as shown above. This could be used in fields where manual annotations or human labelling are costly.</p>
  <div style="display: flex; flex-direction: column; align-items: center; width: 90%; max-width: 90%; margin: 0 auto; overflow: hidden;">
    <img
      src="/images/dino/dino-family.png"
      alt="Dino Family"
      style="width: 100%; height: auto; display: block; max-width: 100%;"
    />
    <figcaption style="font-size: 0.8em; color: #666; margin-top: 0.5em;">
      Stability of the features at multiple resolutions for the DINOv3 ViT family of models
    </figcaption>
  </div> 
  <p>The above result shows the importance of having a high quality teacher model in the knowledge distillation process. Here even the smaller models are able to learn the features and deliver comparable levels of performance. the researchers were able to transfer the knowledge of a larger model into smaller model with little or no loss of quality.</p>
  <h2>Conclusion</h2>
  <p>
    The authors also include their estimates of the environmental impact of the entire training process of this model towards the end of the paper. This in my opinion is the way forward towards responsible training because we can only reduce the emissions of AI if we know for sure what are the emissions in reality. For those curious the emissions were as much as 6 flights between NY and Paris amounting to a total of 2600 tCO2. This is only 1.5 times of the estimated CO2 emissions of their CEO's infamous 
    <a href="https://www.hindustantimes.com/world-news/us-news/mark-zuckerberg-s-arctic-superyacht-faces-protests-from-local-activists-in-svalbard-heres-why-101746374055090.html" target="_blank" rel="noopener noreferrer">
      ski trip to Norway
    </a>.
  </p>
  <p>
    Coming back to DINO, it is definitely a leap forward and I am excited to see what we can do with it especially with the distilled smaller models which can apparently run on edge devices as well.
  </p>

  <p>
  You can learn more about DINOv3 and related resources here:
  <ul>
    <li>
      <a href="https://ai.meta.com/dinov3/" target="_blank" rel="noopener noreferrer">
        DINOv3 official site
      </a>
    </li>
    <li>
      <a href="https://github.com/facebookresearch/dinov3" target="_blank" rel="noopener noreferrer">
        GitHub repository
      </a>
    </li>
    <li>
      <a href="https://ai.meta.com/research/publications/dinov3/" target="_blank" rel="noopener noreferrer">
            Research publications
        </a>
      </li>
    </ul>
  </p>
  ` ,
  image: '/images/dino/dino-cover.png', // Path to image in src/assets/images/posts/
  author: 'Gurpreet Pannu',
  date: new Date().toLocaleDateString('en-GB'),
  readTime: '', // Will be calculated
  tags: [],
  status: 'published', // draft, published, archived
  seo: {
    title: 'Dino V3: What is Meta upto?', // SEO title (can be different from post title)
    description: 'Here I explain the newest foundational vision model by Meta and why is it significant.', // Meta description
    keywords: ["GenAI", "Meta", "DINOv3", "computer vision", "AI"], // Meta keywords
    ogTitle: 'Dino V3: What is Meta upto?', // Open Graph title
    ogDescription: 'Here I explain the newest foundational vision model by Meta and why is it significant.', // Open Graph description
    ogImage: '', // Open Graph image URL
    canonicalUrl: 'https://datamusings.blog/post/dino-v3', // Canonical URL
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