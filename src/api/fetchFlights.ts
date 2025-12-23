import axios from 'axios';

export const fetchFlights = async ({ doj, fromCity, toCity }: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/flights/fetch-flights`, {
      doj,
      fromCity,
      toCity
    });

    if (response.data) {
      console.log("API Call Successful");
      return response.data.payload;
    } else {
      console.log("No flights available");
      return response.data.payload;
    }
  } catch (error) {
    console.log("Error occurred: ", error);
  }
}