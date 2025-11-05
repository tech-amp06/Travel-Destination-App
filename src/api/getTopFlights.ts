import axios from "axios";

export const getTopFlights = async () => {
  try {
    const response = await axios.get("http://localhost:3000/flights/top-flights");

    if (response.data) {
      console.log(response.data);
      return [...response.data];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}