import './homepage.css'
import { useState, useEffect } from "react";
import { Destinations } from '../../assets/destinations';
import { Themes } from '../../assets/themes';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const themesList: any = [];

  useEffect(() => {
    setTimeout(
      () => {
        setIndex((index + 1) % Destinations.length)
      }, 5000
    );

    return () => {};
  }, [index]);

  for (var i = 0; i < Themes.length; i++) {
    themesList.push(
      <div key={i} className="content">
        <div className="cover">
          <img src={Themes[i].hlink} alt={Themes[i].caption} />
        </div>

        <div className="description">
          <h1>{ Themes[i].theme }</h1>
          <p>{ Themes[i].caption }</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="slide-div" onClick={() => {navigate('/suggested', {state: Destinations[index].country})}}>
        <img className="slider" src={ Destinations[index].hlink } alt="..." />
        <div className="slider-text">
          <h2>{ Destinations[index].heading }</h2>
          <h1>{ Destinations[index].country }</h1>
          <h2>{ Destinations[index].caption }</h2>
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