'use client';

import { Template } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Palette, ChevronLeft, ChevronRight, Crown, Zap, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  selectedColorScheme: string;
  onTemplateChange: (templateId: string) => void;
  onColorSchemeChange: (colorSchemeId: string) => void;
  userPlan?: 'free' | 'premium' | 'professional'; // Add professional plan
}

export default function TemplateSelector({ 
  templates, 
  selectedTemplate, 
  selectedColorScheme,
  onTemplateChange,
  onColorSchemeChange,
  userPlan = 'free' // Default to free plan
}: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  // Reset focused index when category changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [selectedCategory]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!filteredTemplates.length) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : filteredTemplates.length - 1;
            scrollToTemplate(newIndex);
            return newIndex;
          });
          break;
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex(prev => {
            const newIndex = prev < filteredTemplates.length - 1 ? prev + 1 : 0;
            scrollToTemplate(newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredTemplates.length) {
            const template = filteredTemplates[focusedIndex];
            if (template.plan === 'free' || userPlan === 'premium' || userPlan === 'professional') {
              onTemplateChange(template.id);
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredTemplates, focusedIndex, onTemplateChange, userPlan]);

  const scrollToTemplate = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const templateWidth = 280 + 16; // template width + gap
      const scrollPosition = index * templateWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTemplateClick = (templateId: string, index: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template && (template.plan === 'free' || userPlan === 'premium' || userPlan === 'professional')) {
      setFocusedIndex(index);
      onTemplateChange(templateId);
    }
  };

  const getPlanRequired = (templatePlan: string) => {
    if (templatePlan === 'premium') return 'Premium';
    if (templatePlan === 'professional') return 'Professional';
    return 'Free';
  };

  const getPlanFeatures = (templatePlan: string) => {
    if (templatePlan === 'premium') {
      return ['Advanced Templates', 'Priority Support', 'Export Options'];
    }
    if (templatePlan === 'professional') {
      return ['Premium Templates', 'AI Features', 'Custom Branding', 'Priority Support'];
    }
    return ['Basic Templates', 'Standard Support'];
  };

  const getUpgradeMessage = (templatePlan: string) => {
    if (templatePlan === 'premium') {
      return 'Unlock Premium Templates';
    }
    if (templatePlan === 'professional') {
      return 'Unlock Professional Templates';
    }
    return 'Upgrade to Unlock';
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900">Design Templates</CardTitle>
            <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Suggest Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Instructions */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Use <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">←</kbd> <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">→</kbd> to navigate, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">Enter</kbd> to select
            </p>
          </div>

          {/* Templates Grid - Scrollable */}
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                {filteredTemplates.map((template, index) => {
                  const isLocked = (template.plan === 'premium' && userPlan === 'free') || 
                                  (template.plan === 'professional' && (userPlan === 'free' || userPlan === 'premium'));
                  const isSelectable = template.plan === 'free' || userPlan === 'premium' || userPlan === 'professional';
                  
                  return (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateClick(template.id, index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (isSelectable) {
                            handleTemplateClick(template.id, index);
                          }
                        }
                      }}
                      tabIndex={isSelectable ? 0 : -1}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        selectedTemplate === template.id
                          ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                          : focusedIndex === index
                          ? 'border-indigo-300 ring-1 ring-indigo-200 bg-indigo-25'
                          : isLocked
                          ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ width: '280px' }}
                    >
                      <div className="aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center p-4 relative overflow-hidden">
                        <div className="text-center w-full">
                          <div className="flex justify-center mb-2">
                            {template.colorSchemes.slice(0, 3).map((scheme, index) => (
                              <div
                                key={scheme.id}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ 
                                  backgroundColor: scheme.primary,
                                  marginLeft: index > 0 ? '-8px' : '0'
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                        </div>
                        
                                                {/* Enhanced Lock overlay for premium/professional templates */}
                        {isLocked && (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-indigo-600/90 to-blue-600/90 backdrop-blur-sm rounded-t-lg flex items-center justify-center p-2">
                            <div className="text-center text-white w-full">
                              {/* Plan Badge */}
                              <div className="inline-flex items-center px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-2">
                                <Zap className="h-3 w-3 mr-1" />
                                <span className="text-xs font-semibold">{getPlanRequired(template.plan)}</span>
                              </div>
                              
                              {/* Plan Name */}
                              <div className="text-sm font-bold mb-2">{getUpgradeMessage(template.plan)}</div>
                              
                              {/* Features List */}
                              <div className="text-xs space-y-0.5 mb-3">
                                {getPlanFeatures(template.plan).slice(0, 2).map((feature, idx) => (
                                  <div key={idx} className="flex items-center justify-center">
                                    <div className="w-1 h-1 bg-yellow-300 rounded-full mr-1"></div>
                                    <span className="truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Upgrade Button */}
                              <button 
                                className="bg-white text-indigo-600 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors shadow-lg w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Navigate to upgrade page
                                  console.log('Upgrade to', template.plan);
                                }}
                              >
                                Upgrade Now
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{template.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{template.category} • {template.layout}</div>
                          </div>
                          {template.plan !== 'free' && (
                            <div className="flex items-center space-x-1">
                              {template.plan === 'professional' ? (
                                <Crown className="h-3 w-3 text-yellow-500" />
                              ) : (
                                <Star className="h-3 w-3 text-purple-500" />
                              )}
                              <span className={`text-xs font-medium ${
                                template.plan === 'professional' ? 'text-yellow-600' : 'text-purple-600'
                              }`}>
                                {template.plan === 'professional' ? 'Pro' : 'Premium'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {focusedIndex === index && (
                        <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            {filteredTemplates.length > 3 && (
              <>
                <button
                  onClick={() => {
                    const newIndex = focusedIndex > 0 ? focusedIndex - 1 : filteredTemplates.length - 1;
                    setFocusedIndex(newIndex);
                    scrollToTemplate(newIndex);
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Previous template"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    const newIndex = focusedIndex < filteredTemplates.length - 1 ? focusedIndex + 1 : 0;
                    setFocusedIndex(newIndex);
                    scrollToTemplate(newIndex);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Next template"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme Selection */}
      {currentTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2 text-indigo-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">Color Scheme</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTemplate.colorSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => onColorSchemeChange(scheme.id)}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                    selectedColorScheme === scheme.id
                      ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">{scheme.name}</span>
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.primary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.secondary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.accent }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Primary:</span>
                      <span className="font-mono">{scheme.primary}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Secondary:</span>
                      <span className="font-mono">{scheme.secondary}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Accent:</span>
                      <span className="font-mono">{scheme.accent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 