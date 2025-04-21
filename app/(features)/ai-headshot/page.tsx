'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeadshotOptions {
  gender: 'male' | 'female' | 'neutral';
  industry: string;
  style: string;
  background: string;
  clothing: string;
  additionalNotes: string;
}

interface GeneratedHeadshot {
  id: string;
  imageUrl: string;
}

export default function AIHeadshot() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<HeadshotOptions>({
    gender: 'neutral',
    industry: 'technology',
    style: 'professional',
    background: 'neutral',
    clothing: 'business',
    additionalNotes: '',
  });
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedHeadshots, setGeneratedHeadshots] = useState<GeneratedHeadshot[]>([]);
  const [selectedHeadshot, setSelectedHeadshot] = useState<string | null>(null);
  
  // Industry options for dropdown
  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'legal', label: 'Legal' },
    { value: 'creative', label: 'Creative & Design' },
    { value: 'marketing', label: 'Marketing & PR' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'hospitality', label: 'Hospitality' },
  ];
  
  // Style options for dropdown
  const styles = [
    { value: 'professional', label: 'Professional & Corporate' },
    { value: 'casual', label: 'Smart Casual' },
    { value: 'creative', label: 'Creative & Artistic' },
    { value: 'formal', label: 'Formal & Traditional' },
    { value: 'modern', label: 'Modern & Trendy' },
  ];
  
  // Background options
  const backgrounds = [
    { value: 'neutral', label: 'Neutral (Gray/White)' },
    { value: 'gradient', label: 'Soft Gradient' },
    { value: 'office', label: 'Office Environment (Blurred)' },
    { value: 'outdoor', label: 'Professional Outdoor' },
    { value: 'studio', label: 'Studio Lighting' },
  ];
  
  // Clothing options 
  const clothingOptions = [
    { value: 'business', label: 'Business Professional' },
    { value: 'smart', label: 'Smart Casual' },
    { value: 'formal', label: 'Formal Attire' },
    { value: 'industry', label: 'Industry Appropriate' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGenerateHeadshots = () => {
    setIsGenerating(true);
    
    // In a real app, we would call an API endpoint that leverages a service like Midjourney, Stable Diffusion, etc.
    // Here we'll simulate an API call with a timeout
    setTimeout(() => {
      // Mock generated headshots - in a real app these would come from the AI service
      const mockHeadshots: GeneratedHeadshot[] = [
        { id: '1', imageUrl: 'https://placehold.co/400x400/3949ab/ffffff?text=Headshot+1' },
        { id: '2', imageUrl: 'https://placehold.co/400x400/5e35b1/ffffff?text=Headshot+2' },
        { id: '3', imageUrl: 'https://placehold.co/400x400/d81b60/ffffff?text=Headshot+3' },
        { id: '4', imageUrl: 'https://placehold.co/400x400/00897b/ffffff?text=Headshot+4' },
      ];
      
      setGeneratedHeadshots(mockHeadshots);
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };
  
  const handleSelectHeadshot = (id: string) => {
    setSelectedHeadshot(id);
  };
  
  const handleDownloadHeadshot = () => {
    if (!selectedHeadshot) {
      alert('Please select a headshot first');
      return;
    }
    
    // In a real app, this would trigger an actual download
    alert('Downloading your headshot. In a production app, this would save the full resolution image to your device.');
  };
  
  const handleEnhanceHeadshot = () => {
    if (!selectedHeadshot) {
      alert('Please select a headshot first');
      return;
    }
    
    // In a real app, this would trigger an enhancement API call
    alert('In a production app, this would enhance your selected headshot with higher resolution and additional professional retouching.');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Professional Headshot</h1>
            <p className="text-gray-600">Create studio-quality professional headshots for your CV, LinkedIn, and other professional profiles</p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Upload Photo', 'Choose Style', 'Generated Headshots'].map((label, index) => (
                <div 
                  key={index}
                  className={`text-sm font-medium ${step > index + 1 ? 'text-purple-600' : step === index + 1 ? 'text-purple-600' : 'text-gray-400'}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Photo</h2>
                  
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    {uploadedImage ? (
                      <div className="relative w-64 h-64 mb-4">
                        <Image 
                          src={uploadedImage}
                          alt="Uploaded image"
                          fill
                          className="object-cover rounded"
                        />
                        <button 
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or JPEG (max. 5MB)
                        </p>
                      </>
                    )}
                    
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileUpload}
                    />
                    
                    {!uploadedImage && (
                      <label
                        htmlFor="file-upload"
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer"
                      >
                        Select Photo
                      </label>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          For best results, use a clear front-facing photo with good lighting and a neutral background. Your face should be clearly visible.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleNextStep}
                      disabled={!uploadedImage}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Headshot</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender Presentation
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={options.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="neutral">Gender Neutral</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={options.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      >
                        {industries.map((industry) => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                        Style
                      </label>
                      <select
                        id="style"
                        name="style"
                        value={options.style}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      >
                        {styles.map((style) => (
                          <option key={style.value} value={style.value}>
                            {style.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                        Background
                      </label>
                      <select
                        id="background"
                        name="background"
                        value={options.background}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      >
                        {backgrounds.map((bg) => (
                          <option key={bg.value} value={bg.value}>
                            {bg.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="clothing" className="block text-sm font-medium text-gray-700 mb-1">
                        Clothing Style
                      </label>
                      <select
                        id="clothing"
                        name="clothing"
                        value={options.clothing}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      >
                        {clothingOptions.map((clothing) => (
                          <option key={clothing.value} value={clothing.value}>
                            {clothing.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={options.additionalNotes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="Any specific preferences or requirements..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={handlePrevStep}
                      className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Back
                    </button>
                    
                    <button
                      onClick={handleGenerateHeadshots}
                      disabled={isGenerating}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </div>
                      ) : (
                        'Generate Headshots'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Professional Headshots</h2>
                  
                  <p className="text-gray-600 mb-4">Select the headshot you prefer.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {generatedHeadshots.map((headshot) => (
                      <div 
                        key={headshot.id}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 hover:shadow-lg transition-all duration-200 ${
                          selectedHeadshot === headshot.id ? 'border-purple-500 shadow-md' : 'border-transparent'
                        }`}
                        onClick={() => handleSelectHeadshot(headshot.id)}
                      >
                        <div className="relative w-full pb-[100%]">
                          <Image
                            src={headshot.imageUrl}
                            alt={`Generated headshot ${headshot.id}`}
                            fill
                            className="object-cover"
                          />
                          
                          {selectedHeadshot === headshot.id && (
                            <div className="absolute top-2 right-2 h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-between mt-6">
                    <button
                      onClick={handlePrevStep}
                      className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Back to Options
                    </button>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleEnhanceHeadshot}
                        disabled={!selectedHeadshot}
                        className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Enhance Quality
                      </button>
                      
                      <button
                        onClick={handleDownloadHeadshot}
                        disabled={!selectedHeadshot}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Download Headshot
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Need help with your application? Try our <Link href="/cover-letter" className="text-indigo-600 hover:text-indigo-800 font-medium">Cover Letter Generator</Link></p>
        <p className="text-xs text-gray-500 mt-2">Your photos are processed securely and deleted after 24 hours</p>
      </div>
    </div>
  );
} 