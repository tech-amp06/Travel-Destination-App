import './flightBooking.css'
import Airports from '../../assets/airports.json'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type cityData = {
  [key: string]: string;
}

function FlightBooking({ details }: any) {
  const [date, setDate] = useState(Date());
  const [fromCity, setFromCity] = useState("Delhi");
  const [toCity, setToCity] = useState("Bengaluru");
  const [travellerCount, setTravellerCount] = useState(1);
  const navigate = useNavigate();

  const airports: cityData = Airports;

  var filterDetails = {
    toCity,
    fromCity,
    date
  }

  return (
    <>
      <div className="board">
        <div className="details">
          <div className="from">
            <p>From</p>
            <select 
              className="form-select form-select-lg mb-3 fs-2 fw-bold border-0 py-0 mb-0 shadow-none" 
              aria-label="Large select example"
              value={ fromCity }
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option className='fs-6' selected>{ details.fromCity || "Delhi" }</option>
              <option className='fs-6' value="Bengaluru">Bengaluru</option>
              <option className='fs-6' value="Seattle">Seattle</option>
              <option className='fs-6' value="New York">New York</option>
              <option className='fs-6' value="Mumbai">Mumbai</option>
              <option className='fs-6' value="Dubai">Dubai</option>
            </select>
            
            <p>{ airports[fromCity] }</p>
          </div>

          <div className="to">
            <p>To</p>
            <select 
              className="form-select form-select-lg mb-3 fs-2 fw-bold border-0 py-0 mb-0 shadow-none" 
              aria-label="Large select example"
              value={ toCity }
              onChange={(e) => setToCity(e.target.value)}
            >
              <option className='fs-6' selected>{ details.toCity || "Bengaluru" }</option>
              <option className='fs-6' value="Seattle">Seattle</option>
              <option className='fs-6' value="New York">New York</option>
              <option className='fs-6' value="Mumbai">Mumbai</option>
              <option className='fs-6' value="Dubai">Dubai</option>
            </select>

            <p className='p-0'>{ airports[toCity] }</p>
          </div>

          <div className="departure">
            <p>Departure</p>
            <input 
              type="date" 
              name="departure" 
              id="departure" 
              min={Date()}
              style={{ fontWeight: "bold" }}
              value={ date }
              onChange={(e) => {setDate(e.target.value); console.log(Date())}}
            />

            <p>{ date }</p>
          </div>

          <div className="travellers">
            <p>Travellers</p>
            <input 
              type="number" 
              name="travellers" 
              id="travellers" 
              className="fs-2 fw-bold border-0 outline-0 focus-none shadow-none w-25"
              min="1"
              value={ travellerCount }
              onChange={(e) => setTravellerCount(Number(e.target.value))}
            />

            <p style={{ color: "black" }}>Travellers</p>
          </div>
        </div>

        <div className="discounts">
          <div className="special-fares heading">
            <h1>Select a special fare</h1>
            <p>Get possible discounts!</p>
          </div>

          <div className="special-fares">
            <h3>Regular</h3>
            <p>Regular Fares</p>
          </div>

          <div className="special-fares">
            <h3>Student</h3>
            <p>Extra discounts/baggage</p>
          </div>

          <div className="special-fares">
            <h3>Senior Citizens</h3>
            <p>Up to ₹600 off</p>
          </div>

          <div className="special-fares">
          <h3>Armed Forces</h3>
          <p>Up to ₹600 off</p>
          </div>

          <div className="special-fares">
            <h3>Doctors and Nurses</h3>
            <p>Up to ₹1200 off</p>
          </div>
        </div>

        <div className="search">
          <button 
            className="search-button"
            onClick={() => navigate('/flights-results', { state: filterDetails })}
          >
            SEARCH
          </button>
        </div>
      </div>
    </>
  )
}

export default FlightBooking