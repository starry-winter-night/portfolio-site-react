import axios from 'axios';

class Cloudinary {
  constructor() {
    this.cloudinary = axios.create({
      baseURL: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
    });
  }
  async imageUpload(file) {
    const data = new FormData();

    data.append('file', file);
    data.append(
      'upload_preset',
      `${process.env.REACT_APP_CLOUDINARY_CLOUD_UNSIGNED_NAME}`
    );

    try {
      const response = await this.cloudinary.post('upload', data);
      
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default Cloudinary;
