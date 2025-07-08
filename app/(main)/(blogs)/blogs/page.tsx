'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight, BookOpen, Star, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { blogPosts, categories, BlogPost } from '../data/blog-posts';
  
export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'readTime' | 'title'>('date');

  // Filter and search blog posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query)
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'readTime':
          return a.readTime - b.readTime;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Recommended article mock data
  const recommendedArticle = {
    title: 'The Ultimate Guide to Career Growth in 2024',
    description: 'Explore actionable strategies, expert insights, and proven frameworks to accelerate your professional journey this year. This essential guide covers everything from personal branding to networking and upskilling.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    author: 'Alex Morgan',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2024-02-01',
    tags: ['career', 'growth', 'strategy', '2024'],
    cta: 'Read the Guide',
    href: '/blogs/career-growth-2024',
  };

  const promotedImage = recommendedArticle.imageUrl;

  return (
    <div className="min-h-screen bg-white">
      {/* Recommended Article Section at Top */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <section className="w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left: Content */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 w-fit">
                    <Star className="h-4 w-4" />
                    Editor's Choice
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    The Ultimate Guide to{' '}
                    <span className="text-blue-600">Career Growth</span> in 2024
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
                    Explore actionable strategies, expert insights, and proven frameworks to accelerate your professional journey this year.
                  </p>
                  
                  {/* Author and Meta */}
                  <div className="flex items-center gap-4 mb-8">
                    <img 
                      src={recommendedArticle.authorAvatar} 
                      alt={recommendedArticle.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-200" 
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{recommendedArticle.author}</div>
                      <div className="text-sm text-slate-500">
                        {new Date(recommendedArticle.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {recommendedArticle.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Link 
                    href={recommendedArticle.href}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 group"
                  >
                    Read the Guide
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Right: Image */}
                <div className="flex-1 relative">
                  <div className="w-full h-full min-h-[300px] lg:min-h-[400px]">
                    <img
                      src={recommendedArticle.imageUrl}
                      alt={recommendedArticle.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Career Insights & Expert Advice
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Level up your
              <span className="text-blue-600"> career</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
              Discover proven strategies, expert insights, and actionable tips to advance your career, 
              ace interviews, and land your dream job.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <section className="w-full bg-gradient-to-br from-blue-50 to-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                Trending Articles
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Start with our most popular and impactful career guides
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.filter(post => post.featured).slice(0, 3).map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group">
                  {/* Image */}
                  {post.imageUrl && (
                    <div className="w-full aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ minHeight: 140, maxHeight: 240 }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {post.category}
                      </Badge>
                      <Badge variant="default" className="text-xs bg-yellow-500 hover:bg-yellow-600">
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex flex-col gap-4">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 group/link mt-2"
                      >
                        Read more
                        <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Categories */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Category Filters - horizontally scrollable */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center">
              {/* Left arrow (desktop only) */}
              <button
                type="button"
                className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm mr-2 disabled:opacity-30"
                aria-label="Scroll left"
                onClick={() => {
                  const el = document.getElementById('category-scroll');
                  if (el) el.scrollBy({ left: -150, behavior: 'smooth' });
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div
                id="category-scroll"
                className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pr-2"
                style={{ scrollBehavior: 'smooth' }}
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm font-medium transition-all ${
                      selectedCategory === category 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                    style={{ minWidth: 90 }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {/* Right arrow (desktop only) */}
              <button
                type="button"
                className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm ml-2 disabled:opacity-30"
                aria-label="Scroll right"
                onClick={() => {
                  const el = document.getElementById('category-scroll');
                  if (el) el.scrollBy({ left: 150, behavior: 'smooth' });
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          {/* Sort Options */}
          <div className="flex items-center gap-3 flex-shrink-0 mt-4 lg:mt-0">
            <span className="text-sm text-slate-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'readTime' | 'title')}
              className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="date">Latest</option>
              <option value="readTime">Read Time</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* All Posts */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-slate-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-slate-300 mb-6">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">No articles found</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Try adjusting your search terms or browse our categories to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Article Image */}
                  {post.imageUrl && (
                    <div className="w-full aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-t-xl"
                        style={{ minHeight: 120, maxHeight: 220 }}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default" className="text-xs bg-yellow-500 hover:bg-yellow-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      <Link href={`/blogs/${post.slug}`} className="block">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-slate-200 text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Link 
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 group/link"
                      >
                        Read article
                        <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get career insights delivered to your inbox
            </h2>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Stay updated with the latest career advice, job search tips, and industry trends. 
              Join thousands of professionals advancing their careers.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20 focus:border-white/40"
              />
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 font-medium">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 