import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log('Cloudinary upload starting for file:', file.name);
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name-here') {
      throw new Error('Invalid cloud_name root. Please set up your Cloudinary credentials in the .env.local file.');
    }
    
    if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === 'your-api-key-here') {
      throw new Error('Cloudinary API key not configured. Please set up your Cloudinary credentials in the .env.local file.');
    }
    
    if (!process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET === 'your-api-secret-here') {
      throw new Error('Cloudinary API secret not configured. Please set up your Cloudinary credentials in the .env.local file.');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'pyramid-agro-export',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else if (!result?.secure_url) {
            console.error('Cloudinary upload succeeded but no URL returned');
            reject(new Error('Cloudinary upload succeeded but no URL returned'));
          } else {
            console.log('Cloudinary upload successful, URL:', result.secure_url);
            resolve(result.secure_url);
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadImage function:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
