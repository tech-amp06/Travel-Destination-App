import axios from 'axios';

const authenticate = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password });
  
    if (response.data) {
      console.log("API Call Successful: ", response.data);
      return response.data;
    } else {
      console.log("Invalid Credentials");
      return null;
    }
  } catch (error) {
    console.log("API Call Failed: ", error);
  }
}

export default authenticate