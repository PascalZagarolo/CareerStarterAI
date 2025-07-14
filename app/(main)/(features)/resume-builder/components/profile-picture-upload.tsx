'use client';

import { useState, useRef, useCallback } from 'react';
import { useLanguage } from './i18n/language-context';
import { toast } from 'sonner';
import { validateImageFile } from '@/lib/utils/image-validation';

interface ProfilePictureUploadProps {
  currentPicture?: string;
  onPictureChange: (pictureUrl: string | undefined) => void;
  onSaveToDatabase?: (imageUrl: string) => Promise<void>;
}

export default function ProfilePictureUpload({ currentPicture, onPictureChange, onSaveToDatabase }: ProfilePictureUploadProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate image file using utility function
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid image file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let progressInterval: NodeJS.Timeout | undefined;

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Upload to ImageKit via our API
      const response = await fetch('/api/upload/imagekit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setUploadProgress(100);
        const imageUrl = result.data.url;
        onPictureChange(imageUrl);
        
        // Save to database if callback is provided
        if (onSaveToDatabase) {
          try {
            await onSaveToDatabase(imageUrl);
          } catch (error) {
            console.error('Failed to save image URL to database:', error);
            // Don't show error to user as the upload was successful
          }
        }
        
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error && error.message.includes('HTTP error! status: 500')) {
        toast.error('Image upload service is currently unavailable. Please try again later.');
      } else {
        toast.error('Failed to upload image. Please check your connection and try again.');
      }
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onPictureChange]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleRemovePicture = useCallback(() => {
    onPictureChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Profile picture removed');
  }, [onPictureChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{t.personalInfo.profilePicture}</label>
        {currentPicture && (
          <button
            type="button"
            onClick={handleRemovePicture}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : currentPicture
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {currentPicture ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={currentPicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <div className="text-xs text-white">{uploadProgress}%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">Click or drag to replace</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP up to 5MB
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Professional headshots work best
              </p>
              <p className="text-xs text-gray-400">
                Square images recommended
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
      </div>
    </div>
  );
} 