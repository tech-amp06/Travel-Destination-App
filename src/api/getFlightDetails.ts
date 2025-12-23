import axios from "axios"

export const getFlightDetails = async (flight_no: string | undefined) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/flights/flight-details/${ flight_no }`);
  console.log(response.data);
  
  if (response.data) {
    return response.data.payload;
  } else {
    return null;
  }
}