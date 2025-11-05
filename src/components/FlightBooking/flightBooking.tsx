import './flightBooking.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRelatedAirports } from '../../api/autocomplete';

interface AirportData {
  airport_code: string;
  airport_name: string;
  location: string;
}

function FlightBooking() {
  const { fromCity, toCity } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [srcSearchVal, setSrcSearchVal] = useState('');
  const [destSearchVal, setDestSearchVal] = useState('');
  const [srcRelatedAirports, setSrcRelatedAirports] = useState<AirportData[]>([]);
  const [destRelatedAirports, setDestRelatedAirports] = useState<AirportData[]>([]);

  const goToResults = (bookingDetails: any) => {
    navigate(`/flights-results/${bookingDetails.fromCity.split(", ")[0]}/${bookingDetails.toCity.split(", ")[0]}`);
  }

  useEffect(() => {
    const fetchRelatedAirports = async (srcSearchVal: string) => {
      const response = await getRelatedAirports(srcSearchVal);
      
      if (response) {
        setSrcRelatedAirports(response);
      } else {
        setSrcRelatedAirports([]);
      }
    }

    fetchRelatedAirports(srcSearchVal);
  }, [srcSearchVal]);

  useEffect(() => {
    const fetchRelatedAirports = async (destSearchVal: string) => {
      const response = await getRelatedAirports(destSearchVal);
      
      if (response) {
        setDestRelatedAirports(response);
      } else {
        setDestRelatedAirports([]);
      }
    }

    fetchRelatedAirports(destSearchVal);
  }, [destSearchVal])

  return (
    <>
      <div className="board">
        <form onSubmit={handleSubmit(goToResults)}>
          <div style={{margin: "20px"}}>
            <div className="form-check form-check-inline">
              <input {...register("tripType")} className="form-check-input" type="radio" name="tripType" id="one-way-radio" value="one-way-trip" />
              <label className="form-check-label" htmlFor="inlineRadio1">One Way</label>
            </div>

            <div className="form-check form-check-inline">
              <input {...register("tripType")} className="form-check-input" type="radio" name="tripType" id="round-trip-radio" value="round-trip" />
              <label className="form-check-label" htmlFor="inlineRadio2">Round Trip</label>
            </div>

            <div className="form-check form-check-inline">
              <input {...register("tripType")} className="form-check-input" type="radio" name="tripType" id="multi-city-radio" value="multi-city" />
              <label className="form-check-label" htmlFor="inlineRadio2">Multi City</label>
            </div>
          </div>

          <div className="details">
            <div className="from">
              <p>From</p>
              <input 
                {...register("fromCity")}
                className="form-control form-select-lg mb-3 fs-2 fw-bold border-0 py-0 mb-0 shadow-none" 
                list='srcAirportList'
                id='fromCity'
                value={fromCity}
                autoComplete='off'
                onChange={(e) => {
                  setSrcSearchVal(e.target.value);
                }}
              />
              <datalist id='srcAirportList'>
                { srcRelatedAirports.map((airport) => {
                  return (
                    <option value={ airport.airport_code + ', ' + airport.airport_name }>{ airport.location }</option>
                  )
                }) }
              </datalist>
            </div>

            <div className="to">
              <p>To</p>
              <input 
                {...register("toCity")}
                className="form-control form-select-lg mb-3 fs-2 fw-bold border-0 py-0 mb-0 shadow-none" 
                list='destAirportList'
                id='toCity'
                value={toCity}
                autoComplete='off'
                onChange={(e) => {
                  setDestSearchVal(e.target.value);
                }}
              />
              <datalist id='destAirportList'>
                { destRelatedAirports.map((airport) => {
                  return (
                    <option value={ airport.airport_code + ', ' + airport.airport_name }>{ airport.location }</option>
                  )
                }) }
              </datalist>
            </div>

            <div className="departure">
              <p>Departure</p>
              <input 
                {...register("doj")}
                type="date" 
                name="doj" 
                id="departure" 
                style={{ fontWeight: "bold" }}
              />

              <p>{ Date() }</p>
            </div>

            <div className="travellers">
              <p>Travellers</p>
              <input 
                {...register("travellers")}
                type="number" 
                name="travellers" 
                id="travellers" 
                className="fs-2 fw-bold border-0 outline-0 focus-none shadow-none w-25"
                min="1"
                defaultValue="1"
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
              type="submit"
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FlightBooking