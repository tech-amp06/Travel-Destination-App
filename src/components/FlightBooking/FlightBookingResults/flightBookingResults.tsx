import './flightBookingResults.css'
import { fetchFlights } from '../../../api/fetchFlights';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import airlines from '../../../assets/airlines.json';

function FlightBookingResults() {
  const { source, destination } = useParams();
  const [flightRoutes, setFlightRoutes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFlights = async () => {
    const response = await fetchFlights({ 
      doj: '2013-01-01', 
      fromCity: source, 
      toCity: destination 
    });
    
    setFlightRoutes(response);
  }

  const emptyElement = (
    <div className="empty-element">
      <img src="https://www.shutterstock.com/image-vector/air-plane-vector-pictogram-isolated-600nw-1955848036.jpg" alt="empty" />
      <h4>Oops! There are no flights for the route currently...</h4>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    getFlights();
    setLoading(false);
  }, []);

  return (
    <>
      <div className="bg-div">
        <img className='bg' src="https://wallpapers.com/images/featured/plane-desktop-yms31u8wyuke7ari.jpg" alt="background" />

        <div className="results">
          <h1>Flights from { source } to { destination }</h1>
          { !loading ? (
            flightRoutes.length ? (
              flightRoutes.map((route: any) => {
                return (
                  <div className="route" key={route.flight_no} onClick={() => {
                    navigate(`/flight-details/${ route.flight_no }`);
                  }}>
                    <div className="desc">
                      <div className="airlines">
                        <img style={{ marginRight: 30, width: 80 }} src={airlines.find((airline) => airline.name === route.airline)?.logo_url} alt="airline-logo" />

                        <div className="airlines-info">
                          <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{ route.airline }</p>
                          <p style={{ fontSize: "0.8rem", color: "grey" }}>
                            { route.airline.split(" ")[0][0] + (route.airline.split(" ")[1] ? route.airline.split(" ")[1][0] : route.airline[2]) + route.flight_no }
                          </p>
                        </div>
                      </div>

                      <div className="time">
                        <div className="dep">
                          <p style={{fontSize: "1.2rem", fontWeight: "bold", margin: 0}}>{ route.departure }</p>
                          <p style={{ margin: 0 }}>{ source }</p>
                        </div>

                        <div className="duration">
                          <p>{ Math.floor(route.duration / 60) + ':' + route.duration % 60 } hours</p>
                          <img style={{ width: '180px' }} src="https://t3.ftcdn.net/jpg/08/16/49/72/360_F_816497244_5CV8jjVwjn5Bda8yjUq5RJ29xeyxbe24.jpg" alt="arrow" />
                        </div>
                        
                        <div className="arr">
                          <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0 }}>
                            { route.arrival }
                          </p>
                          
                          <p style={{ margin: 0 }}>
                            { destination }
                          </p>
                        </div>
                      </div>

                      <div className="fare">
                        Rs. { route.price } &nbsp; 
                        <s style={{ fontSize: "0.8rem", fontWeight: "normal" }}>{ route.price + 1800 }</s>  
                        <span style={{ color: 'orange', fontSize: "0.8rem" }}>
                          &nbsp;{ Math.round((1800 / route.price) * 100) }% OFF
                        </span>
                      </div>
                    </div>

                    <div className="flight-details">
                      <p>View flight details</p>
                    </div>
                  </div>
                )
              })) : emptyElement
            ) : (
              <div className="loading">
                <p className='center-text'>Loading...</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default FlightBookingResults