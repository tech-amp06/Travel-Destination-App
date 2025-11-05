import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getFlightDetails } from "../../api/getFlightDetails";
import airlines from '../../assets/airlines.json';
import './flightDetails.css';

interface FlightDetails {
  flight_no: 35,
  route_id: number,
  distance: number,
  flight_duration: number,
  schedule_id: number,
  price_in_inr: number,
  departure: Date,
  model: string,
  airline: string,
  seating_capacity: number,
  source: string,
  destination: string,
  airport_code_source: string,
  airport_name_source: string,
  location_source: string,
  airport_code_dest: string,
  airport_name_dest: string,
  location_dest: string
}

function FlightDetails() {
  const navigate = useNavigate();
  const { flight_no } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);

  useEffect(() => {
    const fetchFlightDetails = async (flight_no: string | undefined) => {
      const response = await getFlightDetails(flight_no);

      if (response) {
        setFlightDetails(response[0]);
      } else {
        setFlightDetails(null);
      }
    }

    fetchFlightDetails(flight_no);
  }, [flight_no]);

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="throughout">
      <div className="particular-flight-details">
        <div className="metadata">
          <div className="logo">
            <img src={airlines.find(airline => airline.name === flightDetails?.airline)?.logo_url} alt="logo" />
          </div>
        </div>

        <div className="description">
          <h1>{flightDetails?.airline}</h1>
          <h3>Flight {flightDetails?.flight_no} • {flightDetails?.model}</h3>
        </div>

        <div className="route-info">
          <div className="airport-info">
            <div className="airport-code">{flightDetails?.airport_code_source}</div>
            <div className="airport-name">{flightDetails?.airport_name_source}</div>
            <div className="airport-location">{flightDetails?.location_source}</div>
          </div>
          
          <div className="route-divider">
            <div className="route-line">
              <div className="flight-duration">
                {formatDuration(flightDetails?.flight_duration || 0)}
              </div>
            </div>
          </div>

          <div className="airport-info">
            <div className="airport-code">{flightDetails?.airport_code_dest}</div>
            <div className="airport-name">{flightDetails?.airport_name_dest}</div>
            <div className="airport-location">{flightDetails?.location_dest}</div>
          </div>
        </div>

        <div className="flight-info-grid">
          <div className="info-section">
            <h2>Flight Details</h2>
            <div className="info-row">
              <span className="info-label">Distance</span>
              <span className="info-value">{flightDetails?.distance} km</span>
            </div>
            <div className="info-row">
              <span className="info-label">Aircraft</span>
              <span className="info-value">{flightDetails?.model}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Seating Capacity</span>
              <span className="info-value">{flightDetails?.seating_capacity} seats</span>
            </div>
          </div>

          <div className="info-section">
            <h2>Booking Information</h2>
            <div className="info-row">
              <span className="info-label">Price</span>
              <span className="info-value">{formatPrice(flightDetails?.price_in_inr || 0)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Schedule ID</span>
              <span className="info-value">{flightDetails?.schedule_id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Route ID</span>
              <span className="info-value">{flightDetails?.route_id}</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary w-100 my-4 text"
          onClick={() => {
            navigate('');
          }}  
        >
          <h5>Book now</h5>
        </button>
      </div>
    </div>
  )
}

export default FlightDetails;