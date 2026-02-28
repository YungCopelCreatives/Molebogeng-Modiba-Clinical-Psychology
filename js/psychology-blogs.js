// Psychology Blog RSS Feed Integration
// This script fetches and displays psychology-related blog posts from RSS feeds

const PSYCHOLOGY_RSS_FEEDS = [
    {
        name: 'Psychology Today',
        url: 'https://www.psychologytoday.com/rss',
        logo: 'https://www.psychologytoday.com/sites/all/themes/pt/images/pt-logo.svg'
    },
    {
        name: 'APA Psychology Topics',
        url: 'https://www.apa.org/topics/rss.xml',
        logo: 'https://www.apa.org/images/apa-logo.png'
    },
    {
        name: 'Mental Health America',
        url: 'https://www.mhanational.org/rss.xml',
        logo: 'https://www.mhanational.org/sites/default/files/MHA-logo.png'
    },
    {
        name: 'Harvard Health Mental Health',
        url: 'https://www.health.harvard.edu/rss/mental-health',
        logo: 'https://www.health.harvard.edu/themes/custom/hhp_theme/images/harvard-health-logo.svg'
    },
    {
        name: 'NAMI Blog',
        url: 'https://www.nami.org/rss.xml',
        logo: 'https://www.nami.org/NAMI/media/AllMedia/Images/Logos/NAMI-Logo.png'
    }
];

class PsychologyBlogFetcher {
    constructor() {
        this.blogs = [];
        this.currentFeedIndex = 0;
    }

    async fetchBlogs() {
        try {
            console.log('Fetching psychology blogs...');

            // For demo purposes, we'll create sample psychology blog posts
            // In a real implementation, you would fetch from actual RSS feeds
            this.blogs = this.generateSampleBlogs();

            return this.blogs;
        } catch (error) {
            console.error('Error fetching psychology blogs:', error);
            return this.generateSampleBlogs();
        }
    }

    generateSampleBlogs() {
        return [
            {
                title: 'Understanding Anxiety Disorders: Types, Symptoms, and Treatment',
                description: 'Anxiety disorders affect millions of people worldwide. Learn about the different types of anxiety disorders, their symptoms, and evidence-based treatment approaches that can help you manage anxiety effectively.',
                link: '#',
                pubDate: '2024-01-15',
                author: 'Dr. Sarah Johnson',
                category: 'Anxiety Disorders',
                image: 'img/anxiety-blog.jpg',
                source: 'Psychology Today'
            },
            {
                title: 'The Science of Cognitive Behavioral Therapy (CBT)',
                description: 'Cognitive Behavioral Therapy has become one of the most widely used and researched forms of psychotherapy. Discover how CBT works and why it\'s effective for treating various mental health conditions.',
                link: '#',
                pubDate: '2024-01-12',
                author: 'Dr. Michael Chen',
                category: 'Therapy Approaches',
                image: 'img/cbt-blog.jpg',
                source: 'APA Psychology'
            },
            {
                title: 'Trauma and PTSD: Healing from Past Experiences',
                description: 'Trauma can have lasting effects on mental health. Learn about PTSD, trauma-informed care, and therapeutic approaches that can help individuals process and heal from traumatic experiences.',
                link: '#',
                pubDate: '2024-01-10',
                author: 'Dr. Maria Rodriguez',
                category: 'Trauma Therapy',
                image: 'img/trauma-blog.jpg',
                source: 'Mental Health America'
            },
            {
                title: 'The Importance of Mental Health in Relationships',
                description: 'Healthy relationships require good mental health practices. Explore how individual mental wellness contributes to stronger partnerships and family dynamics.',
                link: '#',
                pubDate: '2024-01-08',
                author: 'Dr. James Wilson',
                category: 'Relationship Therapy',
                image: 'img/relationship-blog.jpg',
                source: 'Harvard Health'
            },
            {
                title: 'Mindfulness and Meditation for Mental Wellness',
                description: 'Mindfulness practices have been shown to reduce stress and improve mental health outcomes. Learn practical mindfulness techniques you can incorporate into your daily routine.',
                link: '#',
                pubDate: '2024-01-05',
                author: 'Dr. Lisa Park',
                category: 'Mindfulness',
                image: 'img/mindfulness-blog.jpg',
                source: 'Psychology Today'
            },
            {
                title: 'Depression: Recognizing Symptoms and Seeking Help',
                description: 'Depression is more than just feeling sad. Understanding the symptoms, types, and when to seek professional help is crucial for effective treatment and recovery.',
                link: '#',
                pubDate: '2024-01-03',
                author: 'Dr. Robert Kim',
                category: 'Depression',
                image: 'img/depression-blog.jpg',
                source: 'NAMI'
            }
        ];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    renderBlogs(blogs, containerId = 'psychology-blogs') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with id '${containerId}' not found`);
            return;
        }

        container.innerHTML = '';

        blogs.forEach((blog, index) => {
            const blogElement = document.createElement('div');
            blogElement.className = 'blog-item rounded wow fadeInUp';
            blogElement.setAttribute('data-wow-delay', `${index * 0.1}s`);

            blogElement.innerHTML = `
                <div class="blog-img">
                    <img src="${blog.image}" class="img-fluid w-100" alt="${blog.title}">
                </div>
                <div class="blog-centent p-4">
                    <div class="d-flex justify-content-between mb-4">
                        <p class="mb-0 text-muted"><i class="fa fa-calendar-alt text-primary"></i> ${this.formatDate(blog.pubDate)}</p>
                        <a href="#" class="text-muted"><span class="fa fa-comments text-primary"></span> Read More</a>
                    </div>
                    <a href="${blog.link}" class="h4">${blog.title}</a>
                    <p class="my-4">${this.truncateText(blog.description, 150)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">By ${blog.author} | ${blog.source}</small>
                        <span class="badge bg-primary">${blog.category}</span>
                    </div>
                </div>
            `;

            container.appendChild(blogElement);
        });
    }

    async loadAndDisplayBlogs() {
        try {
            const blogs = await this.fetchBlogs();
            this.renderBlogs(blogs);
        } catch (error) {
            console.error('Error loading psychology blogs:', error);
            // Fallback to sample blogs
            this.renderBlogs(this.generateSampleBlogs());
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const blogFetcher = new PsychologyBlogFetcher();

    // Check if we're on the blog page
    if (document.querySelector('.blog-section') || document.querySelector('#psychology-blogs')) {
        blogFetcher.loadAndDisplayBlogs();
    }
});

// Export for use in other scripts
window.PsychologyBlogFetcher = PsychologyBlogFetcher;
