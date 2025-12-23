import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getFlightDetails } from "../../api/getFlightDetails";
import airlines from '../../assets/airlines.json';
import { useForm } from "react-hook-form";
import './flightDetails.css';
import { addPassenger } from "../../api/updatePassenger";

interface FlightDetailsModel {
  flight_no: number,
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

export interface pnr {
  pname: string,
  dob: Date,
  schedule_id: number
}

function FlightDetails() {
  const { register, handleSubmit } = useForm();
  const { flight_no } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetailsModel | null>(null);
  const [passengerNumber, setPassengerNumber] = useState(1);

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

  useEffect(() => {
    console.log(passengerNumber);
  }, [passengerNumber]);

  const updatePassenger = async (passengers: any) => {
    const len = Math.floor(Object.keys(passengers).length / 2);
    let passengerDetails = [];

    for (let i = 0; i < len; i++) {
      passengerDetails.push({
        pname: passengers['pname' + i],
        dob: passengers['dob' + i],
        schedule_id: flightDetails?.schedule_id
      })
    }
    
    const response = await addPassenger(passengers);

    if (response) {
      console.log("Passenger detail added successfully!");
    } else {
      console.log("Passenger detail update failed");
    }
  }

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

        <div className="flight-info-grid mb-5">
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

        <div className="passenger-no-btns">
          { [1, 2, 3, 4, 5, 6].map((value) => {
            return (
              <button
                key={value}
                className={`passenger-no ${value === passengerNumber ? 'active' : ''}`}
                onClick={() => setPassengerNumber(value)}
              >
                {value}
              </button>
            )
          }) }
        </div>

        <button 
          className="btn btn-primary w-100 my-4 text"
          data-bs-toggle="modal" 
          data-bs-target="#passenger-details"
        >
          <h5>Book now</h5>
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="passenger-details" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Passenger Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(updatePassenger)}>
                { Array.from({ length: passengerNumber }).map((value, index) => {
                  return (
                    <div style={{ marginBottom: '20px' }} className="details-section">
                      <label htmlFor={"pname" + index} className="form-label">Name of passenger {index + 1}</label>
                      <input {...register(("pname" + index))} id={"pname" + index} type="text" className="form-control" />

                      <label htmlFor={"dob" + index}>Date of birth</label>
                      <input {...register(("dob" + index))} id={"dob" + index} type="date" className="form-control" />
                    </div>
                  )
                }) }

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary mx-auto mb-0" id="liveToastBtn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            {/* <img src="..." className="rounded me-2" alt="..." /> */}
            <strong className="me-auto">Successful</strong>
            <small>now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Tickets booked successfully!
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightDetails;