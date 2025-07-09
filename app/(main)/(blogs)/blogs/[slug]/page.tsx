'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, Tag, TrendingUp, Eye, Heart, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts, getRelatedPosts } from '../../data/blog-posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const { slug } = await params;
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost);
      setLoading(false);
    };

    loadPost();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
            <p className="text-slate-600 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blogs">
              <Button className="w-full">Back to Blogs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Back Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Article Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4 text-sm">
                  {post.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>2.4k views</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                </div>
              </div>
            </div>

            {/* Ad Space 1 - Top */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border-2 border-dashed border-slate-200">
              <div className="flex items-center justify-center gap-3 text-slate-400 mb-4">
                <Megaphone className="h-5 w-5" />
                <span className="text-sm font-medium">Advertisement</span>
              </div>
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl h-32 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Ad Space - 728x90</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-sm hover:bg-slate-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Ad Space 2 - Middle */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border-2 border-dashed border-slate-200">
              <div className="flex items-center justify-center gap-3 text-slate-400 mb-4">
                <Megaphone className="h-5 w-5" />
                <span className="text-sm font-medium">Advertisement</span>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl h-48 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Ad Space - 300x250</span>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getRelatedPosts(post, 2).map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="text-xs mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        <Link href={`/blogs/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium">{relatedPost.author}</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt={post.author}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-slate-100"
                />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{post.author}</h3>
                <p className="text-slate-600 text-sm mb-4">Career Expert & Professional Coach</p>
                <Button variant="outline" size="sm" className="w-full">
                  Follow Author
                </Button>
              </div>
            </div>

            {/* Ad Space 3 - Sidebar Top */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border-2 border-dashed border-slate-200">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-3">
                <Megaphone className="h-4 w-4" />
                <span className="text-xs font-medium">Ad</span>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-48 flex items-center justify-center">
                <span className="text-slate-500 text-sm font-medium">Ad Space - 300x250</span>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Articles</h3>
              <div className="space-y-4">
                {blogPosts.filter(p => p.featured).slice(0, 3).map((popularPost) => (
                  <div key={popularPost.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-1">
                        <Link href={`/blogs/${popularPost.slug}`} className="hover:text-blue-600">
                          {popularPost.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-500">{popularPost.readTime} min read</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Space 4 - Sidebar Bottom */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border-2 border-dashed border-slate-200">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-3">
                <Megaphone className="h-4 w-4" />
                <span className="text-xs font-medium">Ad</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-64 flex items-center justify-center">
                <span className="text-slate-500 text-sm font-medium">Ad Space - 300x400</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Get Career Insights</h3>
              <p className="text-blue-100 text-sm mb-4">
                Subscribe for the latest career advice and job search tips
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Ahead in Your Career
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals getting weekly career insights
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
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