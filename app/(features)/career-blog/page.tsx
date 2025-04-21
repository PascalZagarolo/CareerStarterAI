'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CareerBlog() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'interview', name: 'Interview Tips' },
    { id: 'resume', name: 'Resume Building' },
    { id: 'career', name: 'Career Growth' },
    { id: 'technical', name: 'Technical Skills' },
    { id: 'success', name: 'Success Stories' },
  ];
  
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Questions You'll Face in Tech Interviews",
      excerpt: "Preparing for a technical interview? Here are the most common questions and how to answer them effectively.",
      author: "Alex Johnson",
      role: "Senior Technical Recruiter",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "interview",
      image: "/images/blog/tech-interview.jpg",
      featured: true
    },
    {
      id: 2,
      title: "How to Answer 'What's Your Greatest Weakness?' Without Shooting Yourself in the Foot",
      excerpt: "The dreaded weakness question doesn't have to be a trap. Learn how to turn it into an opportunity to showcase your self-awareness and growth mindset.",
      author: "Sarah Chen",
      role: "Career Coach",
      date: "April 28, 2023",
      readTime: "6 min read",
      category: "interview"
    },
    {
      id: 3,
      title: "Body Language Tips That Will Make You More Hireable",
      excerpt: "Your non-verbal cues speak volumes during an interview. Master these body language techniques to make a powerful impression.",
      author: "Marcus Wilson",
      role: "Behavioral Psychologist",
      date: "May 3, 2023",
      readTime: "5 min read",
      category: "interview"
    },
    {
      id: 4,
      title: "How I Landed Multiple Job Offers After 20+ Rejections",
      excerpt: "My journey from constant rejection to having multiple offers to choose from, and the lessons I learned along the way.",
      author: "Jessica Rivera",
      role: "Software Engineer",
      date: "May 10, 2023",
      readTime: "10 min read",
      category: "success",
      featured: true
    },
    {
      id: 5,
      title: "The Perfect Resume Formula for 2023",
      excerpt: "Stand out in a crowded job market with these proven resume techniques that will grab a recruiter's attention in seconds.",
      author: "Michael Thompson",
      role: "HR Director",
      date: "May 5, 2023",
      readTime: "7 min read",
      category: "resume"
    },
    {
      id: 6,
      title: "How to Showcase Your Projects in a Technical Interview",
      excerpt: "Learn how to present your projects effectively to demonstrate your skills and problem-solving abilities.",
      author: "David Kim",
      role: "Senior Developer",
      date: "May 12, 2023",
      readTime: "9 min read",
      category: "technical"
    },
    {
      id: 7,
      title: "Negotiating Your Salary: A Step-by-Step Guide",
      excerpt: "Don't leave money on the table. Follow these strategies to confidently negotiate the salary you deserve.",
      author: "Priya Sharma",
      role: "Compensation Specialist",
      date: "April 22, 2023",
      readTime: "8 min read",
      category: "career"
    },
    {
      id: 8,
      title: "Building Your Personal Brand on LinkedIn",
      excerpt: "Transform your LinkedIn profile from a digital resume to a powerful networking and opportunity magnet.",
      author: "James Wilson",
      role: "Personal Branding Consultant",
      date: "May 7, 2023",
      readTime: "6 min read",
      category: "career"
    }
  ];
  
  // Filter posts based on active category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Career Insights & Tips</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Practical advice and success stories to help you navigate your career journey.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="relative flex-1 max-w-xl">
              <input 
                type="text" 
                placeholder="Search for articles..." 
                className="w-full py-3 px-5 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.div 
                  key={post.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="md:w-2/5 h-52 md:h-auto bg-gray-200 relative overflow-hidden">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{post.category}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-6 flex flex-col">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
                        {categories.find(cat => cat.id === post.category)?.name || post.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-3">{post.date} • {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium text-sm">
                          {post.author.substring(0, 1)}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-800">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.role}</p>
                        </div>
                      </div>
                      <Link href={`/career-blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Category filter */}
        <div className="mb-8">
          <div className="overflow-x-auto py-2 -mx-4 px-4">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.div 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      {categories.find(cat => cat.id === post.category)?.name || post.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
                    {categories.find(cat => cat.id === post.category)?.name || post.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-3">{post.date} • {post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium text-sm">
                      {post.author.substring(0, 1)}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.role}</p>
                    </div>
                  </div>
                  <Link href={`/career-blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Newsletter subscription */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Get Career Tips Delivered to Your Inbox</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for weekly career advice, interview tips, and job search strategies.
            </p>
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/interview-prep" className="text-indigo-600 hover:text-indigo-800">AI Interview Coach</Link>
            <Link href="/job-search" className="text-indigo-600 hover:text-indigo-800">Job Search</Link>
            <Link href="/networking" className="text-indigo-600 hover:text-indigo-800">Networking Events</Link>
          </div>
          <p className="text-gray-600">© 2023 CareerStarter AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 