import axios from 'axios';

export const fetchFlights = async ({ doj, fromCity, toCity }: any) => {
  try {
    const response = await axios.post("http://localhost:3000/flights/fetch-flights", {
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