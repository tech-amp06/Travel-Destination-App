import axios from 'axios';

export const getRelatedAirports = async (searchVal: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/data/airport-list`, { 
      "searchVal": searchVal 
    });
    
    if (response) {
      return response.data.payload;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}