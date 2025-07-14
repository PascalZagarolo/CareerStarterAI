import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const imageKitPrivateKey = process.env.IMAGE_KIT_KEY;
    const imageKitPublicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
    
    if (!imageKitPrivateKey || !imageKitPublicKey) {
      return NextResponse.json({
        success: false,
        error: 'ImageKit credentials not configured',
        details: {
          privateKeyExists: !!imageKitPrivateKey,
          publicKeyExists: !!imageKitPublicKey
        }
      });
    }

    // Test 1: Check key formats
    const privateKeyValid = imageKitPrivateKey.startsWith('private_');
    const publicKeyValid = imageKitPublicKey.startsWith('public_');

    // Test 2: Try a simple API call to verify credentials
    let apiTestResult: any = null;
    try {
      const response = await fetch('https://api.imagekit.io/v1/files', {
        headers: {
          'Authorization': `Basic ${Buffer.from(imageKitPrivateKey + ':').toString('base64')}`
        }
      });
      
      apiTestResult = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      };
    } catch (error) {
      apiTestResult = {
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Test 3: Create a test image and try upload using server-side method
    let uploadTestResult: any = null;
    try {
      // Create a simple 1x1 pixel PNG image in base64
      const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const testMimeType = 'image/png';
      const testFileName = 'test-image.png';
      
      // Create form data for server-side upload
      const imageKitFormData = new FormData();
      imageKitFormData.append('file', `data:${testMimeType};base64,${testImageBase64}`);
      imageKitFormData.append('fileName', testFileName);
      imageKitFormData.append('folder', 'test-uploads');
      imageKitFormData.append('useUniqueFileName', 'true');
      imageKitFormData.append('tags', 'test,debug');
      imageKitFormData.append('responseFields', 'url,fileId,name');

      const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(imageKitPrivateKey + ':').toString('base64')}`
        },
        body: imageKitFormData
      });

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        uploadTestResult = {
          success: true,
          status: uploadResponse.status,
          data: uploadData
        };
      } else {
        const errorText = await uploadResponse.text();
        uploadTestResult = {
          success: false,
          status: uploadResponse.status,
          error: errorText
        };
      }
    } catch (error) {
      uploadTestResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown upload error'
      };
    }

    return NextResponse.json({
      success: true,
      configuration: {
        privateKeyValid,
        publicKeyValid,
        privateKeyLength: imageKitPrivateKey.length,
        publicKeyLength: imageKitPublicKey.length
      },
      apiTest: apiTestResult,
      uploadTest: uploadTestResult,
      recommendations: {
        checkCredentials: !privateKeyValid || !publicKeyValid ? 'Fix key formats' : 'Keys look good',
        checkApiAccess: apiTestResult?.ok ? 'API access working' : 'API access failed',
        checkUpload: uploadTestResult?.success ? 'Upload working' : 'Upload failed'
      }
    });

  } catch (error) {
    console.error('ImageKit test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 