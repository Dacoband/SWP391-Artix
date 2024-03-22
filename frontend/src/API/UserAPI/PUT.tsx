
import axios from 'axios'


const profilecreatorurl = 'https://localhost:7233/api/Creator/updateProfilePicture/'
const backgroundcreatorurl = 'https://localhost:7233/api/Creator/updateBackground/'
export async function PutCreatorBackgroundPicture(CreatorID:string,imageFile:string) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      // Optionally, add additional headers such as Authorization if required
      // 'Authorization': 'Bearer your-token',
    };
    const body = {
      imageFile // Base64 string
    };
    const response = await axios.put(`${backgroundcreatorurl}${CreatorID}`, imageFile, { headers });
    console.log('UploadComplete:', response.data);
  } catch (err) {
    console.error(err);
  }
}

export async function PutCreatorProfilePicture(CreatorID:string,imageFile:string) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      // Optionally, add additional headers such as Authorization if required
      // 'Authorization': 'Bearer your-token',
    };
    const body = {
      imageFile // Base64 string
    };
    const response = await axios.put(`${profilecreatorurl}${CreatorID}`, imageFile, { headers });
    console.log('UploadComplete:', response.data);
  } catch (err) {
    console.error(err);
  }
  }