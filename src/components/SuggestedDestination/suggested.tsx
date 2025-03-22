import { useLocation } from 'react-router-dom';
import FlightBooking from '../FlightBooking/flightBooking';
import './suggested.css';

type wallpaper = {
  [key: string]: string;
}

function Suggested() {
  const location = useLocation();
  
  var details = {
    fromCity: null,
    toCity: location.state
  };

  const wallpapers: wallpaper = {
    "Dubai": "https://wallpapercat.com/w/full/0/6/9/274793-2560x1600-desktop-hd-dubai-background-image.jpg",
    "Paris": "https://wallpapers.com/images/featured/paris-zy4x2ow5p7j5qi4a.jpg",
    "Andaman": "https://c4.wallpaperflare.com/wallpaper/965/221/99/koh-lipe-thailand-island-in-andaman-sea-to-the-border-with-malaysia-part-of-the-tarutao-national-marine-park-liming-rocks-turquoise-waters-and-white-sandy-beaches-1920%C3%971200-wallpaper-preview.jpg"
  }

  return (
    <>
      <div className="bg-div">
        <img className='bg' src={ wallpapers[details.toCity] } alt="background" />

        <FlightBooking details={ details } />
      </div>
    </>
  )
}

export default Suggested;