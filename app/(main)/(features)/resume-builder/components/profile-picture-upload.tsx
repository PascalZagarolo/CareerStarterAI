'use client';

import { useState, useRef, useCallback } from 'react';
import { useLanguage } from './i18n/language-context';
import { toast } from 'sonner';

interface ProfilePictureUploadProps {
  currentPicture?: string;
  onPictureChange: (pictureUrl: string | undefined) => void;
}

export default function ProfilePictureUpload({ currentPicture, onPictureChange }: ProfilePictureUploadProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File size too large. Please upload an image smaller than 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onPictureChange(result.data.url);
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
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
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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