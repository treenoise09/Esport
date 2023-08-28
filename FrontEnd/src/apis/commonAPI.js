import axios from "axios";
const API_URL = 'http://localhost:4000'; // Replace with your backend API URL

export default async function uploadImage(id, image) {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post(API_URL+'/image?id='+id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Image successfully uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

