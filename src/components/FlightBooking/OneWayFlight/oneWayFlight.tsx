import './oneWayFlight.css'
import Airports from '../../../assets/airports.json'
import { useState } from "react";

type cityData = {
  [key: string]: string;
}

function OneWayFlight({ details }: any) {
  const [date, setDate] = useState(Date());
  const [fromCity, setFromCity] = useState("Delhi");
  const [toCity, setToCity] = useState("Bengaluru");
  const [travellerCount, setTravellerCount] = useState(1);

  const airports: cityData = Airports;

  return (
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
          <option className='fs-6' value="Paris">Paris</option>
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
          <option className='fs-6' value="Paris">Paris</option>
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
  )
}

export default OneWayFlight