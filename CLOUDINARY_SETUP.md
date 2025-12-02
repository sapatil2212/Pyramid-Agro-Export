# Cloudinary Setup Guide

To use the home page CMS with image upload functionality, you need to set up Cloudinary:

## 1. Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your Cloudinary Credentials
1. Log in to your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy the following values:
   - Cloud Name
   - API Key
   - API Secret

## 3. Update Environment Variables

### For Local Development
Add these variables to your `.env.local` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:
   - `CLOUDINARY_CLOUD_NAME` = your-cloud-name
   - `CLOUDINARY_API_KEY` = your-api-key
   - `CLOUDINARY_API_SECRET` = your-api-secret
4. Make sure to select **Production**, **Preview**, and **Development** for each variable
5. Redeploy your application for changes to take effect

## 4. Test the Setup
1. Start your development server: `npm run dev`
2. Log in as an admin user
3. Go to Dashboard > Home
4. Try uploading an image to test the integration

## Features Available
- ✅ Upload images from local machine
- ✅ Automatic image optimization
- ✅ Dynamic home page content management
- ✅ Real-time preview
- ✅ Admin-only access control

## Image Upload Limits
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, WebP, GIF
- Images are automatically optimized and stored in Cloudinary
