'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  Palette,
  Layout,
  Database
} from 'lucide-react';
import { ResumeWithDetails } from '@/lib/hooks/use-saved-resumes';

interface ResumeManagementProps {
  resumes: ResumeWithDetails[];
  loading: boolean;
  onDeleteResume: (id: string) => void;
}

export function ResumeManagement({ resumes, loading, onDeleteResume }: ResumeManagementProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showActions, setShowActions] = useState<string | null>(null);
  const [seedingData, setSeedingData] = useState(false);

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || resume.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'archived':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLayoutIcon = (layout: string) => {
    switch (layout) {
      case 'single-column':
        return '📄';
      case 'two-column':
        return '📋';
      case 'sidebar':
        return '📑';
      case 'header-focused':
        return '📝';
      default:
        return '📄';
    }
  };

  const handleSeedData = async () => {
    setSeedingData(true);
    try {
      const response = await fetch('/api/resumes/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Reload the page to show the new data
        window.location.reload();
      } else {
        console.error('Failed to seed data');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      setSeedingData(false);
    }
  };

  const handleResumeClick = (resume: ResumeWithDetails) => {
    // Navigate to resume builder with the resume data
    router.push(`/resume-builder?resumeId=${resume.id}`);
  };

  const handleEditClick = (e: React.MouseEvent, resume: ResumeWithDetails) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/resume-builder?resumeId=${resume.id}&mode=edit`);
  };

  const handleViewClick = (e: React.MouseEvent, resume: ResumeWithDetails) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/resume-builder?resumeId=${resume.id}&mode=view`);
  };

  const handleDeleteClick = (e: React.MouseEvent, resumeId: string) => {
    e.stopPropagation(); // Prevent card click
    onDeleteResume(resumeId);
  };

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Resumes</CardTitle>
            <p className="text-gray-600 mt-1">Manage your professional resumes</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Resume
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Resume List */}
        <div className="space-y-4">
          {filteredResumes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first resume to get started'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!searchTerm && statusFilter === 'all' && (
                  <>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Resume
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSeedData}
                      disabled={seedingData}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      {seedingData ? 'Creating...' : 'Seed Sample Data'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02] bg-white"
                onClick={() => handleResumeClick(resume)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Template Preview */}
                      <div className="relative">
                        <div className="h-16 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-lg">
                          {getLayoutIcon(resume.template?.layout || 'single-column')}
                        </div>
                        {/* Color Scheme Indicator */}
                        {resume.colorScheme && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                               style={{ backgroundColor: resume.colorScheme.primary }}>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {resume.name}
                          </h3>
                          {resume.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        
                        {/* Template and Color Info */}
                        <div className="flex items-center space-x-4 mb-2">
                          {resume.template && (
                            <div className="flex items-center space-x-1">
                              <Layout className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{resume.template.name}</span>
                            </div>
                          )}
                          {resume.colorScheme && (
                            <div className="flex items-center space-x-1">
                              <Palette className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{resume.colorScheme.name}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Status and Version */}
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(resume.status)}>
                            {resume.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            v{resume.version} • {formatDate(resume.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={(e) => handleViewClick(e, resume)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={(e) => handleEditClick(e, resume)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowActions(showActions === resume.id ? null : resume.id);
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                        
                        {showActions === resume.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                            <button 
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                              onClick={(e) => handleEditClick(e, resume)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </button>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                              onClick={(e) => handleViewClick(e, resume)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
                              onClick={(e) => handleDeleteClick(e, resume.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 