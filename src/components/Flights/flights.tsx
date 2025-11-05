import './flights.css'
import FlightBooking from '../FlightBooking/flightBooking';

function Flights() {
  return (
    <>
      <div className="bg-div">
        <img className='bg' src="https://wallpapers.com/images/featured/beach-sunset-bwvid0licus1pjda.jpg" alt="background" />

        <FlightBooking />
      </div>
    </>
  )
}

export default Flights;