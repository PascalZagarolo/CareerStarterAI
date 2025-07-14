/**
 * Image validation utilities for the resume builder
 */

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ImageValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const DEFAULT_OPTIONS: Required<ImageValidationOptions> = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  minWidth: 100,
  minHeight: 100,
  maxWidth: 4000,
  maxHeight: 4000
};

/**
 * Validates an image file
 * @param file - The file to validate
 * @param options - Validation options
 * @returns Validation result
 */
export function validateImageFile(
  file: File, 
  options: ImageValidationOptions = {}
): ImageValidationResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  // Check file size
  if (file.size > opts.maxSize) {
    const maxSizeMB = opts.maxSize / (1024 * 1024);
    return { 
      isValid: false, 
      error: `File size too large. Maximum size is ${maxSizeMB}MB.` 
    };
  }

  // Check if file is empty
  if (file.size === 0) {
    return { isValid: false, error: 'File is empty' };
  }

  // Check file type
  if (!opts.allowedTypes.includes(file.type)) {
    const allowedTypes = opts.allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
    return { 
      isValid: false, 
      error: `Invalid file type. Only ${allowedTypes} images are allowed.` 
    };
  }

  return { isValid: true };
}

/**
 * Validates image dimensions using a FileReader
 * @param file - The file to validate
 * @param options - Validation options
 * @returns Promise with validation result
 */
export function validateImageDimensions(
  file: File,
  options: ImageValidationOptions = {}
): Promise<ImageValidationResult> {
  return new Promise((resolve) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    // First do basic validation
    const basicValidation = validateImageFile(file, opts);
    if (!basicValidation.isValid) {
      resolve(basicValidation);
      return;
    }

    // Create image element to check dimensions
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const { width, height } = img;
      
      // Check minimum dimensions
      if (width < opts.minWidth || height < opts.minHeight) {
        resolve({
          isValid: false,
          error: `Image dimensions too small. Minimum size is ${opts.minWidth}x${opts.minHeight} pixels.`
        });
        return;
      }

      // Check maximum dimensions
      if (width > opts.maxWidth || height > opts.maxHeight) {
        resolve({
          isValid: false,
          error: `Image dimensions too large. Maximum size is ${opts.maxWidth}x${opts.maxHeight} pixels.`
        });
        return;
      }

      resolve({ isValid: true });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        isValid: false,
        error: 'Failed to load image for validation'
      });
    };

    img.src = url;
  });
}

/**
 * Formats file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gets file extension from filename
 * @param filename - The filename
 * @returns File extension (without dot)
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Checks if a file is an image based on its MIME type
 * @param file - The file to check
 * @returns True if the file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Creates a unique filename for upload
 * @param originalName - Original filename
 * @param prefix - Optional prefix for the filename
 * @returns Unique filename
 */
export function createUniqueFilename(originalName: string, prefix = 'upload'): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = getFileExtension(originalName);
  
  return `${prefix}-${timestamp}-${randomString}.${extension}`;
} 