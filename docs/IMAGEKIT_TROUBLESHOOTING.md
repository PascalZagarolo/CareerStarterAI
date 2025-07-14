# ImageKit Integration Troubleshooting Guide

This guide helps resolve common issues with ImageKit integration in the resume builder app.

## Common Issues and Solutions

### 1. Missing Authorization Parameters Error

**Error Message:**
```
"Your request is missing authorization parameters. Read the upload API documentation."
```

**Cause:** This occurs when the authentication method is incorrect or missing required parameters.

**Solutions:**

#### A. Check Authentication Method
- ✅ **Correct:** Server-side upload with Basic authentication
- ❌ **Incorrect:** Client-side upload without proper server-side setup

#### B. Verify Required Fields
- ✅ **Required:** `file`, `fileName` (for server-side upload)
- ❌ **Missing:** Basic authentication header

#### C. Check Basic Authentication
- ✅ **Correct:** `Authorization: Basic <base64-encoded-private-key:>`
- ❌ **Incorrect:** Missing colon after private key

### 2. Environment Variables Not Configured

**Error:** "Image upload service not configured"

**Solution:**
1. Add to your `.env.local` file:
```bash
IMAGE_KIT_KEY=private_your_private_key_here
IMAGE_KIT_PUBLIC_KEY=public_your_public_key_here
IMAGE_KIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
```

2. Verify key formats:
   - Private key should start with `private_`
   - Public key should start with `public_`

### 3. Invalid Credentials

**Error:** "Invalid ImageKit configuration"

**Solution:**
1. Log into your ImageKit dashboard
2. Go to Developer Options → API Keys
3. Copy the correct private and public keys
4. Ensure keys are not truncated or modified

### 4. File Upload Failures

**Common Causes:**
- File too large (check ImageKit limits)
- Invalid file type
- Network connectivity issues
- Incorrect authentication method

**Debugging Steps:**
1. Check file size (should be under 25MB for free tier)
2. Verify file is a valid image (PNG, JPG, JPEG, etc.)
3. Test with a smaller image first
4. Verify Basic authentication is working

## Testing Your Setup

### 1. Use the Test Endpoint

Visit `/api/upload/imagekit/test` to run comprehensive tests:

```bash
curl http://localhost:3000/api/upload/imagekit/test
```

This endpoint will:
- ✅ Verify environment variables
- ✅ Check key formats
- ✅ Test API connectivity
- ✅ Attempt a test upload using server-side method
- ✅ Provide detailed recommendations

### 2. Manual API Test

Test your credentials directly with ImageKit:

```bash
curl -X GET "https://api.imagekit.io/v1/files" \
  -H "Authorization: Basic $(echo -n 'private_your_key:' | base64)"
```

### 3. Test Upload with Postman

1. Set method to `POST`
2. URL: `https://upload.imagekit.io/api/v1/files/upload`
3. Headers:
   - `Authorization: Basic <base64-encoded-private-key:>`
4. Body: `form-data`
   - `file`: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
   - `fileName`: `test.png`
   - `folder`: `test-uploads`

## Debugging Steps

### 1. Check Server Logs

Look for these log messages in your console:

```javascript
// Configuration check
console.log('ImageKit credentials configured:', {
  privateKeyLength: imageKitPrivateKey.length,
  publicKeyLength: imageKitPublicKey.length,
  privateKeyFormat: imageKitPrivateKey.startsWith('private_') ? 'valid' : 'invalid',
  publicKeyFormat: imageKitPublicKey.startsWith('public_') ? 'valid' : 'invalid'
});

// Upload attempt
console.log('Uploading to ImageKit:', {
  fileName: fileName,
  folder: 'resume-headshots',
  fileSize: base64.length,
  mimeType: mimeType
});
```

### 2. Network Tab Inspection

1. Open browser DevTools
2. Go to Network tab
3. Attempt upload
4. Check the request to `/api/upload/imagekit`
5. Verify:
   - Request method is POST
   - Authorization header is present
   - Form data includes file and fileName

### 3. ImageKit Dashboard

1. Log into ImageKit dashboard
2. Check Media Library for uploaded files
3. Verify file permissions and access

## Recent Fixes Applied

### ✅ Fixed Authorization Issues

**Problem:** Using client-side upload method incorrectly
**Solution:** Switched to server-side upload with Basic authentication

**Before:**
```javascript
// ❌ Incorrect - Client-side method without proper setup
const token = crypto
  .createHmac('sha1', imageKitPrivateKey)
  .update(fileName + expire)
  .digest('hex');

const formDataBody = [
  'Content-Disposition: form-data; name="token"',
  '',
  token,
  // ... other fields
].join('\r\n');
```

**After:**
```javascript
// ✅ Correct - Server-side authentication
const imageKitFormData = new FormData();
imageKitFormData.append('file', `data:${mimeType};base64,${base64}`);
imageKitFormData.append('fileName', fileName);
// ... other fields

const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(imageKitPrivateKey + ':').toString('base64')}`
  },
  body: imageKitFormData
});
```

### ✅ Enhanced Error Handling

- Added detailed error logging
- Improved error message parsing
- Better debugging information

### ✅ Added Test Endpoint

- Comprehensive configuration testing
- API connectivity verification
- Test upload functionality using server-side method
- Detailed recommendations

## Server-Side Upload Method

The app now uses ImageKit's server-side upload method which requires:

1. **Private Key**: Your ImageKit private key for Basic authentication
2. **File**: Base64 encoded image with data URL prefix
3. **FileName**: Name of the file to upload
4. **Basic Authentication**: `Authorization: Basic <base64-encoded-private-key:>`

### Required Form Fields

According to ImageKit's server-side upload documentation, the following fields are required:

- `file`: The file to upload (base64 with data URL prefix)
- `fileName`: Name of the file

Optional fields:
- `useUniqueFileName`: Whether to use unique filename
- `tags`: Comma-separated tags
- `folder`: Folder path in ImageKit
- `responseFields`: Comma-separated fields to return in response

### Basic Authentication

```javascript
const authHeader = `Basic ${Buffer.from(imageKitPrivateKey + ':').toString('base64')}`;
```

**Important:** The colon (`:`) after the private key is required for Basic authentication.

## Still Having Issues?

1. **Run the test endpoint** first: `/api/upload/imagekit/test`
2. **Check the troubleshooting steps** above
3. **Verify your ImageKit account** is active and has upload permissions
4. **Check Basic authentication** format
5. **Contact support** with the detailed error logs

## Support Resources

- [ImageKit API Documentation](https://docs.imagekit.io/api-reference/upload-file-api)
- [ImageKit Server-Side Upload](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload)
- [ImageKit Community](https://community.imagekit.io/) 