import { NextRequest, NextResponse } from 'next/server';
import { validateImageFile, createUniqueFilename } from '@/lib/utils/image-validation';

export async function POST(request: NextRequest) {
  try {
    // Check if ImageKit is configured
    const imageKitPrivateKey = process.env.IMAGE_KIT_KEY;
    const imageKitPublicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
    
    if (!imageKitPrivateKey || !imageKitPublicKey) {
      console.error('ImageKit credentials not configured');
      console.error('Private key exists:', !!imageKitPrivateKey);
      console.error('Public key exists:', !!imageKitPublicKey);
      return NextResponse.json(
        { success: false, error: 'Image upload service not configured' },
        { status: 500 }
      );
    }

    // Validate key formats
    if (!imageKitPrivateKey.startsWith('private_')) {
      console.error('Invalid ImageKit private key format');
      return NextResponse.json(
        { success: false, error: 'Invalid ImageKit configuration' },
        { status: 500 }
      );
    }

    // Debug: Check key lengths (don't log the actual keys)
    console.log('ImageKit credentials configured:', {
      privateKeyLength: imageKitPrivateKey.length,
      publicKeyLength: imageKitPublicKey.length,
      privateKeyFormat: imageKitPrivateKey.startsWith('private_') ? 'valid' : 'invalid',
      publicKeyFormat: imageKitPublicKey.startsWith('public_') ? 'valid' : 'invalid'
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate image file using utility function
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid image file' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type;

    // Validate base64 string
    if (!base64 || base64.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to convert file to base64' },
        { status: 400 }
      );
    }

    // Additional validation: ensure file is actually an image
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File is not a valid image' },
        { status: 400 }
      );
    }

    // Create unique filename using utility function
    const fileName = createUniqueFilename(file.name, 'resume-headshot');

    // Debug logging (remove in production)
    console.log('Uploading to ImageKit:', {
      fileName: fileName,
      folder: 'resume-headshots',
      fileSize: base64.length,
      mimeType: mimeType
    });

    // Create form data for server-side upload
    const imageKitFormData = new FormData();
    imageKitFormData.append('file', `data:${mimeType};base64,${base64}`);
    imageKitFormData.append('fileName', fileName);
    imageKitFormData.append('folder', 'resume-headshots');
    imageKitFormData.append('useUniqueFileName', 'false');
    imageKitFormData.append('tags', 'resume,headshot,profile-picture');
    imageKitFormData.append('responseFields', 'url,fileId,name,size,height,width');

    // Upload to ImageKit using server-side upload method with Basic authentication
    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(imageKitPrivateKey + ':').toString('base64')}`
        // Don't set Content-Type - let the browser set it with boundary for FormData
      },
      body: imageKitFormData
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ImageKit upload failed:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Try to parse error response for more specific error messages
      let errorMessage = 'Failed to upload image to ImageKit';
      try {
        const errorJson = JSON.parse(errorData);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
        if (errorJson.help) {
          console.error('ImageKit help:', errorJson.help);
        }
      } catch (e) {
        // If we can't parse the error, use the default message
        console.error('Failed to parse error response:', e);
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('ImageKit response:', result);

    // Validate ImageKit response
    if (!result.url) {
      console.error('ImageKit response missing URL:', result);
      return NextResponse.json(
        { success: false, error: 'Invalid response from image service' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        fileId: result.fileId,
        name: result.name,
        size: result.size,
        height: result.height,
        width: result.width
      }
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during image upload' },
      { status: 500 }
    );
  }
} 