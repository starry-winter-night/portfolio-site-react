import axios from 'axios';

class Cloudinary {
  constructor() {
    this.cloudinary = axios.create({
      baseURL: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
    });
  }
  async imageUpload(file) {
    const data = {
      file,
      upload_preset: `${process.env.REACT_APP_CLOUDINARY_CLOUD_UNSIGNED_NAME}`,
    };

    console.log(data);
    try {
      const response = await this.cloudinary.post('/image/upload', data);

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
}

export default Cloudinary;
