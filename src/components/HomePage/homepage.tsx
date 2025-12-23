import './homepage.css'
import { useState, useEffect } from "react";
import { Destinations } from '../../assets/destinations';
import { Themes } from '../../assets/themes';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { getTopFlights } from '../../api/getTopFlights';
import { FaPlaneDeparture } from 'react-icons/fa';

function HomePage() {
  const goToRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const themesList: any = [];
  const [topTripsList, setTopTripsList] = useState<any>([]);

  useEffect(() => {
    setTimeout(
      () => {
        setIndex((index + 1) % Destinations.length)
      }, 5000
    );

    return () => {};
  }, [index]);

  useEffect(() => {
    const fetchTopFlights = async () => {
      const response = await getTopFlights();

      if (response) {
        setTopTripsList(response);
      } else {
        setTopTripsList([]);
      }
    }

    fetchTopFlights();
  }, []);

  for (var i = 0; i < Themes.length; i++) {
    themesList.push(
      i !== 5 ? (
        <div key={i} className="content">
          <div className="cover">
            <img src={Themes[i].hlink} alt={Themes[i].caption} />
          </div>

          <div className="description">
            <h1>{ Themes[i].theme }</h1>
            <p>{ Themes[i].caption }</p>
          </div>
        </div>
      ) : (
        <div key={i} className="content" ref={goToRef}>
          <div className="cover">
            <img src={Themes[i].hlink} alt={Themes[i].caption} />
          </div>

          <div className="description">
            <h1>{ Themes[i].theme }</h1>
            <p>{ Themes[i].caption }</p>
          </div>
        </div>
      )
    )
  }

  return (
    <>
      <div className="slide-div" onClick={() => {navigate('/flights')}}>
        <img className="slider" src={ Destinations[index].hlink } alt="..." />
        <div className="slider-text">
          <h2>{ Destinations[index].heading }</h2>
          <h1>{ Destinations[index].country }</h1>
          <h2>{ Destinations[index].caption }</h2>
        </div>
      </div>

      <div className="themes">
        <h1>Top Trips This Week!</h1>

        <div className="trip-container">
          {topTripsList.map((trip: any, index: number) => (
            <div key={index} className="trip-card">
              <div 
                className="trip"
                onClick={() => {navigate(`/flights/:${trip.source_code}/:${trip.dest_code}`)}}
              >
                <div className="trip-details">
                  <div className="place">
                    <h4>{trip.source_location}</h4>
                    <p>{trip.source_airport}</p>
                  </div>

                  <FaPlaneDeparture size={24} color="#3498db" className="arrow-icon" />

                  <div className="place">
                    <h4>{trip.dest_location}</h4>
                    <p>{trip.dest_airport}</p>
                  </div>
                </div>

                <div className="pricing">
                  <h5 className="price">₹{trip.inr ? trip.inr.toLocaleString('en-IN') : "N/A"}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="themes">
        <h1>Find your mood</h1>

        <div className="content-container">
          { themesList }
        </div>
      </div>
    </>
  )
}

export default HomePage;