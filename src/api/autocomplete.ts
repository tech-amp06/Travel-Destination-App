import axios from 'axios';

export const getRelatedAirports = async (searchVal: string) => {
  try {
    console.log(searchVal);
    const response = await axios.post("http://localhost:3000/data/airport-list", { 
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