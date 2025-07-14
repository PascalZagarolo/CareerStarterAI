# ImageKit Integration Setup

This document explains how to set up ImageKit for profile picture uploads in the CareerStarter AI resume builder.

## Overview

The resume builder now supports professional profile picture uploads using ImageKit, a powerful image optimization and delivery service. This replaces the previous base64 encoding approach with a more scalable and performant solution.

## Features

- **Drag & Drop Upload**: Users can drag and drop images directly onto the upload area
- **File Validation**: Automatic validation of file types (JPEG, PNG, WebP) and size (max 5MB)
- **Progress Tracking**: Real-time upload progress with visual feedback
- **Image Optimization**: Automatic image optimization and CDN delivery via ImageKit
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Multi-language Support**: Full internationalization support

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# ImageKit Configuration
IMAGE_KIT_KEY=your_imagekit_private_key_here
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGE_KIT_URL_ENDPOINT=your_imagekit_url_endpoint_here
```

### Getting ImageKit Credentials

1. **Sign up for ImageKit**: Visit [imagekit.io](https://imagekit.io) and create an account
2. **Create a new project**: Set up a new project in your ImageKit dashboard
3. **Get your credentials**:
   - **Private Key**: Found in your project settings under "API Keys"
   - **Public Key**: Also found in project settings
   - **URL Endpoint**: Your unique ImageKit URL endpoint (e.g., `https://ik.imagekit.io/your_project_id`)

## API Endpoint

The upload functionality is handled by the `/api/upload/imagekit` endpoint:

- **Method**: POST
- **Content-Type**: multipart/form-data
- **File Field**: `file`
- **Response**: JSON with success status and image URL

### Example Response

```json
{
  "success": true,
  "data": {
    "url": "https://ik.imagekit.io/your_project_id/resume-headshots/filename.jpg",
    "fileId": "file_id_from_imagekit",
    "name": "filename.jpg",
    "size": 123456,
    "height": 800,
    "width": 600
  }
}
```

## File Organization

Uploaded images are organized in ImageKit with the following structure:

- **Folder**: `resume-headshots/`
- **Naming Convention**: `resume-headshot-{timestamp}-{randomString}.{extension}`
- **Tags**: `resume`, `headshot`, `profile-picture`

## Database Integration

The uploaded image URL is automatically saved to the `userResumes` table in the `imageUrl` field:

- **Table**: `user_resumes`
- **Field**: `image_url` (text, nullable)
- **Storage**: ImageKit CDN URL
- **Sync**: Automatic on upload and auto-save

## Security Considerations

1. **File Type Validation**: Only JPEG, PNG, and WebP files are accepted
2. **File Size Limits**: Maximum file size is 5MB
3. **Authentication**: Uses ImageKit private key for secure uploads
4. **Error Handling**: Comprehensive error handling prevents information leakage

## Data Structure

Profile pictures are stored in two places:

1. **Resume Data** (for immediate use):
```typescript
interface ResumeData {
  personalInfo: {
    // ... other fields
    profilePicture?: string; // ImageKit URL
  };
}
```

2. **Database** (for persistence):
```typescript
interface UserResume {
  // ... other fields
  imageUrl?: string; // ImageKit CDN URL
}
```

The system automatically syncs between these two locations to ensure data consistency.

## Usage in Templates

Profile pictures are automatically displayed in all resume templates when available:

```tsx
{personalInfo.profilePicture && (
  <div className="flex justify-center mb-3">
    <img
      src={personalInfo.profilePicture}
      alt="Profile"
      className="w-28 h-28 rounded-full object-cover border-2"
      style={{ borderColor: colorScheme.primary }}
    />
  </div>
)}
```

## Image Optimization

ImageKit automatically provides:

- **Responsive Images**: Automatic resizing for different screen sizes
- **Format Optimization**: Automatic WebP conversion for supported browsers
- **Quality Optimization**: Intelligent compression without quality loss
- **CDN Delivery**: Global content delivery network for fast loading

## Troubleshooting

### Common Issues

1. **"Image upload service not configured"**
   - Check that all ImageKit environment variables are set correctly
   - Verify that the private key is valid and has upload permissions

2. **"File size too large"**
   - Ensure uploaded files are under 5MB
   - Consider compressing images before upload

3. **"Invalid file type"**
   - Only JPEG, PNG, and WebP files are supported
   - Check file extension and MIME type

4. **Upload fails with 500 error**
   - Check ImageKit service status
   - Verify network connectivity
   - Check server logs for detailed error information

### Debug Mode

To enable debug logging, add the following to your environment:

```bash
DEBUG_IMAGEKIT=true
```

This will log detailed information about upload attempts and responses.

## Performance Benefits

- **Reduced Bandwidth**: Optimized images reduce data transfer
- **Faster Loading**: CDN delivery ensures fast image loading worldwide
- **Better SEO**: Optimized images improve page load times
- **Scalability**: No server storage required for images

## Cost Considerations

ImageKit offers a generous free tier:

- **Free Tier**: 20GB bandwidth, 20GB storage, 20,000 transformations
- **Paid Plans**: Start at $20/month for higher limits

For most resume builder usage, the free tier should be sufficient.

## Migration from Base64

If you're migrating from the previous base64 approach:

1. Existing base64 images will continue to work
2. New uploads will use ImageKit URLs
3. No data migration required
4. Gradual transition as users update their profile pictures

## Future Enhancements

Potential future improvements:

- **Image Cropping**: Add client-side image cropping before upload
- **Multiple Formats**: Support for additional image formats
- **Batch Upload**: Support for uploading multiple images
- **Image Editing**: Basic image editing capabilities
- **AI Enhancement**: Automatic image enhancement using AI 