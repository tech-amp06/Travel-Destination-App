import axios from "axios";
import { pnr } from "../components/FlightDetails/flightDetails";

export const addPassenger = async (passengers: pnr[]) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/passenger/pnr`, { passengers });

    if (response.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}