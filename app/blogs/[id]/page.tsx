import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category?: string;
  categoryName?: string;
  categorySlug?: string;
  contentBlocks?: any[];
  mainImageUrl?: string;
  readTime?: number;
  views?: number;
  likes?: number;
  publishedAt?: any;
  updatedAt?: any;
  author?: { name: string; avatar?: string; bio?: string };
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  isPublished?: boolean;
}

const STATIC_BLOGS = [
  {
    id: '1',
    title: 'The Future of AI in Software Development',
    summary: 'Exploring how artificial intelligence is transforming the way we write, test, and deploy code in modern development workflows.',
    category: 'AI & ML',
    categoryName: 'AI & ML',
    isPublished: true,
    featured: true,
    trending: true,
    publishedAt: new Date('2024-03-15'),
    mainImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    readTime: 8,
    views: 2456,
    author: { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg', bio: 'AI researcher and software engineer with 10+ years of experience in machine learning and cloud architecture.' },
    tags: ['AI', 'Machine Learning', 'Development Tools'],
    contentBlocks: [
      { type: 'Heading', text: 'Introduction to AI in Development' },
      { type: 'Paragraph', text: 'Artificial Intelligence is no longer just a buzzword in the tech industry. It has become an integral part of modern software development, revolutionizing everything from code generation to automated testing.' },
      { type: 'Subheading', text: 'Key Applications' },
      { type: 'List', items: ['Code completion and generation', 'Automated testing', 'Bug detection and fixing', 'Performance optimization'] },
      { type: 'Paragraph', text: 'Tools like GitHub Copilot, ChatGPT, and various AI-powered IDE extensions are becoming essential companions for developers worldwide.' },
      { type: 'Subheading', text: 'The Impact on Developer Productivity' },
      { type: 'Paragraph', text: 'Studies show that AI-assisted development can increase productivity by up to 40%, allowing developers to focus on higher-level architectural decisions rather than repetitive coding tasks.' },
      { type: 'Quote', text: 'AI is not replacing developers; it\'s augmenting their capabilities and allowing them to solve more complex problems.', author: 'Industry Expert' }
    ]
  },
  {
    id: '2',
    title: 'Building Scalable Microservices with Node.js',
    summary: 'A comprehensive guide to designing and implementing microservices architecture using Node.js and modern cloud technologies.',
    category: 'Web Dev',
    categoryName: 'Web Dev',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-10'),
    mainImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    readTime: 12,
    views: 1823,
    author: { name: 'Michael Rodriguez', avatar: '/avatars/michael.jpg', bio: 'Backend architect specializing in distributed systems and cloud-native applications.' },
    tags: ['Node.js', 'Microservices', 'Architecture'],
    contentBlocks: [
      { type: 'Heading', text: 'Understanding Microservices' },
      { type: 'Paragraph', text: 'Microservices architecture has emerged as a dominant pattern for building scalable and maintainable applications. This approach breaks down complex systems into smaller, independent services.' },
      { type: 'Subheading', text: 'Core Principles' },
      { type: 'List', items: ['Single responsibility per service', 'Independent deployment', 'Data isolation', 'Fault tolerance'] },
      { type: 'Code', code: '// Example Node.js microservice\nconst express = require("express");\nconst app = express();\n\napp.get("/api/users", async (req, res) => {\n  const users = await userService.getAll();\n  res.json(users);\n});\n\napp.listen(3000);' },
      { type: 'Paragraph', text: 'Node.js is particularly well-suited for microservices due to its event-driven architecture and lightweight runtime.' }
    ]
  },
  {
    id: '3',
    title: 'Cloud-Native Development Strategies',
    summary: 'Best practices for building applications that leverage the full power of cloud computing platforms and services.',
    category: 'Cloud',
    categoryName: 'Cloud',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-03-08'),
    mainImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    readTime: 10,
    views: 1567,
    author: { name: 'Emily Watson', avatar: '/avatars/emily.jpg', bio: 'Cloud solutions architect helping companies migrate to modern infrastructure.' },
    tags: ['Cloud Computing', 'DevOps', 'AWS'],
    contentBlocks: [
      { type: 'Heading', text: 'Cloud-Native Principles' },
      { type: 'Paragraph', text: 'Cloud-native development is about building and running applications to take advantage of the distributed computing offered by the cloud delivery model.' },
      { type: 'Subheading', text: 'Key Concepts' },
      { type: 'List', items: ['Containerization with Docker', 'Orchestration with Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'] },
      { type: 'Paragraph', text: 'These practices enable teams to build scalable, resilient applications that can adapt to changing demands.' }
    ]
  },
  {
    id: '4',
    title: 'Modern React Patterns and Best Practices',
    summary: 'Explore the latest React patterns, hooks, and architectural approaches for building maintainable applications.',
    category: 'Web Dev',
    categoryName: 'Web Dev',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-05'),
    mainImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 15,
    views: 2891,
    author: { name: 'David Kim', avatar: '/avatars/david.jpg', bio: 'Frontend engineer passionate about React ecosystem and modern web technologies.' },
    tags: ['React', 'JavaScript', 'Frontend'],
    contentBlocks: [
      { type: 'Heading', text: 'React Evolution' },
      { type: 'Paragraph', text: 'React has evolved significantly over the years, introducing new patterns and best practices that help developers build more efficient and maintainable applications.' },
      { type: 'Subheading', text: 'Modern Hooks' },
      { type: 'Code', code: '// Custom hook example\nfunction useApi(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(url).then(res => res.json()).then(setData).finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading };\n}' },
      { type: 'Paragraph', text: 'Custom hooks allow you to extract component logic into reusable functions.' }
    ]
  },
  {
    id: '5',
    title: 'Mobile-First Design in 2024',
    summary: 'Why mobile-first design is crucial and how to implement it effectively in modern web development projects.',
    category: 'Design',
    categoryName: 'Design',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-01'),
    mainImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    readTime: 7,
    views: 1234,
    author: { name: 'Lisa Anderson', avatar: '/avatars/lisa.jpg', bio: 'UX designer focused on creating intuitive mobile experiences.' },
    tags: ['Design', 'Mobile', 'UX'],
    contentBlocks: [
      { type: 'Heading', text: 'Mobile-First Philosophy' },
      { type: 'Paragraph', text: 'With over 60% of web traffic coming from mobile devices, adopting a mobile-first approach is no longer optional—it\'s essential.' },
      { type: 'Subheading', text: 'Implementation Strategies' },
      { type: 'List', items: ['Start with mobile layouts', 'Progressively enhance for desktop', 'Optimize touch interactions', 'Minimize loading times'] },
      { type: 'Paragraph', text: 'This approach ensures better performance and user experience across all devices.' }
    ]
  },
  {
    id: '6',
    title: 'Cybersecurity Best Practices for Developers',
    summary: 'Essential security measures every developer should implement to protect applications and user data.',
    category: 'Technology',
    categoryName: 'Technology',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-02-28'),
    mainImageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    readTime: 11,
    views: 3456,
    author: { name: 'James Wilson', avatar: '/avatars/james.jpg', bio: 'Security specialist helping organizations build secure applications.' },
    tags: ['Security', 'Best Practices', 'Development'],
    contentBlocks: [
      { type: 'Heading', text: 'Security First Approach' },
      { type: 'Paragraph', text: 'In today\'s digital landscape, security cannot be an afterthought. Developers must integrate security practices throughout the entire development lifecycle.' },
      { type: 'Subheading', text: 'Essential Practices' },
      { type: 'List', items: ['Input validation and sanitization', 'Authentication and authorization', 'Data encryption', 'Regular security audits'] },
      { type: 'Code', code: '// Example of secure password handling\nconst bcrypt = require("bcrypt");\n\nasync function hashPassword(password) {\n  const saltRounds = 12;\n  return await bcrypt.hash(password, saltRounds);\n}' },
      { type: 'Paragraph', text: 'Implementing these practices from the beginning helps prevent common vulnerabilities.' }
    ]
  },
  {
    id: '7',
    title: 'The Rise of Edge Computing',
    summary: 'Understanding how edge computing is transforming data processing and reducing latency in modern applications.',
    category: 'Technology',
    categoryName: 'Technology',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-02-25'),
    mainImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=400&fit=crop',
    readTime: 9,
    views: 987,
    author: { name: 'Alex Thompson', avatar: '/avatars/alex.jpg', bio: 'Infrastructure engineer exploring edge computing and distributed systems.' },
    tags: ['Edge Computing', 'Infrastructure', 'Performance'],
    contentBlocks: [
      { type: 'Heading', text: 'What is Edge Computing?' },
      { type: 'Paragraph', text: 'Edge computing brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.' },
      { type: 'Subheading', text: 'Benefits' },
      { type: 'List', items: ['Reduced latency', 'Bandwidth optimization', 'Improved privacy', 'Better offline functionality'] },
      { type: 'Paragraph', text: 'This paradigm shift is particularly important for IoT devices and real-time applications.' }
    ]
  },
  {
    id: '8',
    title: 'Business Intelligence with Modern Data Stack',
    summary: 'How to build effective BI solutions using modern data tools and cloud platforms for better decision-making.',
    category: 'Business',
    categoryName: 'Business',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-02-20'),
    mainImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    readTime: 13,
    views: 1456,
    author: { name: 'Rachel Green', avatar: '/avatars/rachel.jpg', bio: 'Data analyst helping companies leverage data for strategic decisions.' },
    tags: ['Business Intelligence', 'Data Analytics', 'Strategy'],
    contentBlocks: [
      { type: 'Heading', text: 'Modern Data Stack' },
      { type: 'Paragraph', text: 'The modern data stack has revolutionized how organizations approach business intelligence, enabling faster insights and more agile decision-making.' },
      { type: 'Subheading', text: 'Components' },
      { type: 'List', items: ['Data extraction tools', 'Cloud data warehouses', 'Transformation frameworks', 'Visualization platforms'] },
      { type: 'Paragraph', text: 'These tools work together to create efficient, scalable data pipelines.' }
    ]
  },
  {
    id: '9',
    title: 'Progressive Web Apps: The Future of Web',
    summary: 'Why PWAs are becoming the standard for web applications and how to implement them effectively.',
    category: 'Mobile',
    categoryName: 'Mobile',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-02-15'),
    mainImageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
    readTime: 8,
    views: 2234,
    author: { name: 'Tom Harris', avatar: '/avatars/tom.jpg', bio: 'Full-stack developer specializing in PWA and mobile web technologies.' },
    tags: ['PWA', 'Web Development', 'Mobile'],
    contentBlocks: [
      { type: 'Heading', text: 'PWA Revolution' },
      { type: 'Paragraph', text: 'Progressive Web Apps combine the best of web and mobile applications, offering offline capabilities, push notifications, and app-like experiences.' },
      { type: 'Subheading', text: 'Key Features' },
      { type: 'List', items: ['Service workers for offline support', 'App shell architecture', 'Push notifications', 'Installable on home screen'] },
      { type: 'Code', code: '// Service worker example\nself.addEventListener("install", event => {\n  event.waitUntil(\n    caches.open("v1").then(cache => {\n      return cache.addAll(["/app/", "/app/index.html"]);\n    })\n  );\n});' },
      { type: 'Paragraph', text: 'PWAs are transforming how users interact with web applications on mobile devices.' }
    ]
  }
];

async function getPost(id: string) {
  const post = STATIC_BLOGS.find(p => p.id === id);
  return post || null;
}

async function getRelated(currentId: string, category: string) {
  return STATIC_BLOGS
    .filter(p => p.id !== currentId && (p.categoryName || p.category) === category)
    .slice(0, 3);
}

export async function generateStaticParams() {
  return STATIC_BLOGS.map(post => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: 'Post Not Found — TalentWithUs' };
  return {
    title: `${post.title} — TalentWithUs`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      images: post.mainImageUrl ? [post.mainImageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const related = await getRelated(post.id, post.categoryName || post.category || '');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.mainImageUrl,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.publishedAt?.toISOString(),
    author: { '@type': 'Person', name: post.author?.name || 'TalentWithUs' },
    publisher: { '@type': 'Organization', name: 'TalentWithUs' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <BlogDetailClient post={post} relatedPosts={related} />
    </>
  );
}
