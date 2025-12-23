import axios from "axios";
// import env from "react-dotenv";

export const getTopFlights = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/flights/top-flights`);

    if (response.data) {
      return [...response.data];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}