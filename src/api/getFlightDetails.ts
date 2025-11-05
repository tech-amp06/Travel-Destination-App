import axios from "axios"

export const getFlightDetails = async (flight_no: string | undefined) => {
  const response = await axios.get(`http://localhost:3000/flights/flight-details/${ flight_no }`);

  if (response.data) {
    console.log(response.data.payload);
    return response.data.payload;
  } else {
    return null;
  }
}