import './flightBookingResults.css'
import { fetchFlights } from '../../../api/fetchFlights';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

function FlightBookingResults() {
  const { source, destination } = useParams();
  const [flightRoutes, setFlightRoutes] = useState<any>([]);

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
    getFlights();
  }, []);

  return (
    <>
      <div className="bg-div">
        <img className='bg' src="https://wallpapers.com/images/featured/plane-desktop-yms31u8wyuke7ari.jpg" alt="background" />

        <div className="results">
          <h1>Flights from { source } to { destination }</h1>
          {
            flightRoutes.length ?
            flightRoutes.map((route: any) => {
              return (
                <div className="route">
                  <div className="desc">
                    <div className="airlines">
                      {/* <img src={route['airlines-logo']} alt="Emirates-logo" /> */}

                      <div className="airlines-info">
                        <p style={{ fontWeight: "bold" }}>{ route.airline }</p>
                        <p style={{ fontSize: "0.8rem", color: "grey" }}>EA2308</p>
                      </div>
                    </div>

                    <div className="time">
                      <div className="dep">
                        <p style={{fontSize: "1.2rem", fontWeight: "bold", margin: 0}}>{ route.departure }</p>
                        <p style={{ margin: 0 }}>{ source }</p>
                      </div>

                      <div className="duration">
                        <p>3 hours</p>
                        <img src="https://t3.ftcdn.net/jpg/08/16/49/72/360_F_816497244_5CV8jjVwjn5Bda8yjUq5RJ29xeyxbe24.jpg" alt="arrow" />
                      </div>
                      
                      <div className="arr">
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0 }}>
                          { (route.departure) + route.duration }
                        </p>
                        
                        <p style={{ margin: 0 }}>
                          { destination }
                        </p>
                      </div>
                    </div>

                    <div className="fare">
                      Rs. { (route.inr) as number } &nbsp; 
                      <s style={{ fontSize: "0.8rem", fontWeight: "normal" }}>{ route.inr + 1800 } </s>  
                      <span style={{ color: 'orange', fontSize: "0.8rem" }}>&nbsp;{ Math.round(180000 / route.inr) }% OFF</span>
                    </div>
                  </div>

                  <div className="flight-details">
                    <p>View flight details</p>
                  </div>
                </div>
              )
            }) : emptyElement
          }
        </div>
      </div>
    </>
  )
}

export default FlightBookingResults