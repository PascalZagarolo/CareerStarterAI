'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { 
  Search, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Briefcase,
  Filter,
  Bookmark,
  BookmarkPlus,
  Sparkles,

  X,
  ExternalLink,
  RefreshCw,
  Database,

  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job, SearchParams } from '@/lib/job-aggregation/types';

// AI suggestions for search
const aiSuggestions = [
  'AI Engineer',
  'Prompt Engineer', 
  'Machine Learning Researcher',
  'Data Scientist',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Product Manager',
  'UX Designer',
  'Full Stack Developer',
  'Software Engineer',
  'Cloud Architect',
  'Cybersecurity Analyst',
  'Mobile Developer'
];

export default function JobSearch() {
  const router = useRouter();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  console.log(jobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sources, setSources] = useState<string[]>([]);
  const [cacheHit, setCacheHit] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  // Filters state
  const [filters, setFilters] = useState({
    location: '',
    radius: '25',
    salaryRange: '',
    jobType: '',
    experienceLevel: ''
  });

  // Filter options
  const locations = [
    'San Francisco, CA', 
    'New York, NY', 
    'Austin, TX', 
    'Seattle, WA', 
    'Boston, MA', 
    'Portland, OR',
    'Denver, CO',
    'Palo Alto, CA',
    'Chicago, IL',
    'Washington, DC',
    'Miami, FL',
    'Phoenix, AZ'
  ];
  const salaryRanges = ['$50k - $80k', '$80k - $120k', '$120k - $180k', '$180k+'];
  const jobTypes = ['Remote', 'On-site', 'Hybrid'];
  const experienceLevels = ['Entry', 'Mid-level', 'Senior', 'Lead'];

  // Fetch jobs from API
  const fetchJobs = async (searchParams: SearchParams) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.query) queryParams.append('query', searchParams.query);
      if (searchParams.location) queryParams.append('location', searchParams.location);
      if (searchParams.radius) queryParams.append('radius', searchParams.radius.toString());
      if (searchParams.salaryRange) queryParams.append('salaryRange', searchParams.salaryRange);
      if (searchParams.jobType) queryParams.append('jobType', searchParams.jobType);
      if (searchParams.experienceLevel) queryParams.append('experienceLevel', searchParams.experienceLevel);
      if (searchParams.remote !== undefined) queryParams.append('remote', searchParams.remote.toString());
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', jobsPerPage.toString());

      const response = await fetch(`/api/jobs/search?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setJobs(data.data.jobs);
        setFilteredJobs(data.data.jobs);
        setTotalJobs(data.data.total);
        setTotalPages(data.data.totalPages);
        setSources(data.data.sources);
        setCacheHit(data.data.cacheHit);
        setExecutionTime(data.data.executionTime);
      } else {
        console.error('Failed to fetch jobs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and search
  useEffect(() => {
    const searchParams: SearchParams = {
      query: searchQuery,
      location: filters.location,
      radius: parseInt(filters.radius),
      salaryRange: filters.salaryRange,
      jobType: filters.jobType,
      experienceLevel: filters.experienceLevel,
      remote: filters.jobType === 'Remote',
      page: currentPage,
      limit: jobsPerPage
    };
    fetchJobs(searchParams);
  }, [searchQuery, filters, currentPage]);

  // Get current jobs for pagination
  const currentJobs = filteredJobs;

  // Handle search suggestions
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Handle save job
  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Handle job click
  const handleJobClick = (jobId: string) => {
    router.push(`/job-search/${jobId}`);
  };

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      radius: '25',
      salaryRange: '',
      jobType: '',
      experienceLevel: ''
    });
    setSearchQuery('');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-webkit-slider-track {
          background: #e5e7eb;
          height: 8px;
          border-radius: 4px;
        }
        
        .slider::-moz-range-track {
          background: #e5e7eb;
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
                <p className="text-gray-600">Discover opportunities that match your skills and career goals</p>
              </div>
              <Button
                onClick={() => router.push('/job-search/submit-job')}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Job</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="max-w-[1400px] mx-auto">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
              {/* Main Search and Location */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                      {aiSuggestions
                        .filter(suggestion => 
                          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                            <span>{suggestion}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Location (e.g., San Francisco, CA)"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                  {filters.location && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                      {locations
                        .filter(location => 
                          location.toLowerCase().includes(filters.location.toLowerCase())
                        )
                        .slice(0, 3)
                        .map((location, index) => (
                          <button
                            key={index}
                            onClick={() => handleFilterChange('location', location)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{location}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                <Button className="h-12 px-6 bg-gray-600 hover:bg-gray-700 text-white w-full lg:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Quick Filter Pills */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span className="text-sm text-gray-600 mr-2 whitespace-nowrap">Quick filters:</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filters.jobType === 'Remote' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('jobType', filters.jobType === 'Remote' ? '' : 'Remote')}
                  >
                    Remote
                  </Button>
                  <Button
                    variant={filters.experienceLevel === 'Senior' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('experienceLevel', filters.experienceLevel === 'Senior' ? '' : 'Senior')}
                  >
                    Senior
                  </Button>
                  <Button
                    variant={filters.salaryRange === '$120k - $180k' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('salaryRange', filters.salaryRange === '$120k - $180k' ? '' : '$120k - $180k')}
                  >
                    $120k+
                  </Button>
                  {Object.values(filters).some(value => value !== '') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Advanced Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Location Radius Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Search Radius
                    </label>
                    <span className="text-sm text-gray-500">
                      {filters.radius === '0' ? 'Any distance' : `${filters.radius} miles`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.radius}
                    onChange={(e) => handleFilterChange('radius', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Any</span>
                    <span>25</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Salary Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <select
                    value={filters.salaryRange}
                    onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Salaries</option>
                    {salaryRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={filters.experienceLevel}
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Filters Display */}
                {(filters.location || filters.salaryRange || filters.jobType || filters.experienceLevel || filters.radius !== '25') && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
                    <div className="space-y-1">
                      {filters.location && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Location: {filters.location}</span>
                          <button
                            onClick={() => handleFilterChange('location', '')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {filters.radius !== '25' && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Radius: {filters.radius === '0' ? 'Any distance' : `${filters.radius} miles`}</span>
                          <button
                            onClick={() => handleFilterChange('radius', '25')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {filters.salaryRange && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Salary: {filters.salaryRange}</span>
                          <button
                            onClick={() => handleFilterChange('salaryRange', '')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {filters.jobType && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Type: {filters.jobType}</span>
                          <button
                            onClick={() => handleFilterChange('jobType', '')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {filters.experienceLevel && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Level: {filters.experienceLevel}</span>
                          <button
                            onClick={() => handleFilterChange('experienceLevel', '')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Results Count */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {totalJobs} job{totalJobs !== 1 ? 's' : ''} found
                  </p>
                  {sources.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      From {sources.length} source{sources.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1">
              {loading ? (
                // Loading skeletons
                <div className="space-y-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentJobs.length > 0 ? (
                <>
                  {/* Job Cards */}
                  <div className="space-y-6">
                    {currentJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={() => handleJobClick(job.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Company Logo */}
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                              {job.company.charAt(0)}
                            </div>

                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                      {job.title}
                                    </h3>
                                    {job.isAIIRecommended && (
                                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        AI Recommended
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center">
                                      <Building2 className="w-4 h-4 mr-1" />
                                      {job.company}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="w-4 h-4 mr-1" />
                                      {job.salary}
                                    </div>
                                  </div>

                                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {job.description}
                                  </p>

                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {job.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      <div className="flex items-center">
                                        <Briefcase className="w-4 h-4 mr-1" />
                                        {job.type}
                                      </div>
                                      <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(job.datePosted)}
                                      </div>
                                    </div>
                                    <div className="flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="text-sm font-medium mr-1">View Details</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Save Button */}
                          <div className="ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent job card click
                                handleSaveJob(job.id);
                              }}
                              className={`p-2 hover:bg-gray-100 ${
                                savedJobs.includes(job.id) ? 'text-indigo-600' : 'text-gray-400'
                              }`}
                            >
                              {savedJobs.includes(job.id) ? (
                                <Bookmark className="w-5 h-5 fill-current" />
                              ) : (
                                <BookmarkPlus className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sources and Performance Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Database className="w-4 h-4 mr-1" />
                          <span>Sources: {sources.join(', ')}</span>
                        </div>
                        {cacheHit && (
                          <div className="flex items-center text-green-600">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            <span>Cached</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span>{executionTime}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              onClick={() => setCurrentPage(page)}
                              className="w-10 h-10 p-0"
                            >
                              {page}
                            </Button>
                          );
                        })}
                        
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Empty state
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse all available positions.
                  </p>
                  <div className="space-x-3">
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                    <Button onClick={() => router.push('/job-search/submit-job')}>
                      Submit a Job
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 