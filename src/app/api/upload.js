// pages/api/upload.js
import cloudinary from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data; // the base64 encoded image
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'your_preset', // Ensure to create an unsigned upload preset in your Cloudinary settings
      });
      res.status(200).json({ url: uploadedResponse.secure_url, public_id: uploadedResponse.public_id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }else if (method === 'PUT') {
    // Updating an existing image
    const { public_id, data: newImageData } = req.body; // Public ID of the existing image and the new image data

    try {
      // Delete the existing image
      await cloudinary.uploader.destroy(public_id);

      // Upload the new image
      const uploadedResponse = await cloudinary.uploader.upload(newImageData, {
        upload_preset: 'your_preset',
      });
      res.status(200).json({ url: uploadedResponse.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update image' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
