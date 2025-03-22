import './flightBookingResults.css'
import flightRoutes from '../../../assets/flightRoutes.json';
import { useLocation } from 'react-router-dom';

function FlightBookingResults() {
  const location = useLocation();
  const filters = location.state;

  const elements: any = [];
  const emptyElement = (
    <div className="empty-element">
      <img src="https://www.shutterstock.com/image-vector/air-plane-vector-pictogram-isolated-600nw-1955848036.jpg" alt="empty" />
      <h4>Oops! There are no flights for the route currently...</h4>
    </div>
  );

  for (var i = 0; i < flightRoutes.length; i++) {
    if (flightRoutes[i].date == filters.date && flightRoutes[i].fromCity == filters.fromCity && flightRoutes[i].toCity == filters.toCity) {
      elements.push(
        <div className="route">
          <div className="desc">
            <div className="airlines">
              <img src={flightRoutes[i]['airlines-logo']} alt="Emirates-logo" />

              <div className="airlines-info">
                <p style={{ fontWeight: "bold" }}>{ flightRoutes[i].airlines }</p>
                <p style={{ fontSize: "0.8rem", color: "grey" }}>EA2308</p>
              </div>
            </div>

            <div className="time">
              <div className="dep">
                <p style={{fontSize: "1.2rem", fontWeight: "bold", margin: 0}}>{ flightRoutes[i].departure }</p>
                <p style={{ margin: 0 }}>{ filters.fromCity }</p>
              </div>

              <div className="duration">
                <p>3 hours</p>
                <img src="https://t3.ftcdn.net/jpg/08/16/49/72/360_F_816497244_5CV8jjVwjn5Bda8yjUq5RJ29xeyxbe24.jpg" alt="arrow" />
              </div>
              
              <div className="arr">
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0 }}>
                  { flightRoutes[i].arrival }
                </p>
                
                <p style={{ margin: 0 }}>
                  { filters.toCity }
                </p>
              </div>
            </div>

            <div className="fare">
              Rs. { flightRoutes[i].fares.economy } &nbsp; 
              <s style={{ fontSize: "0.8rem", fontWeight: "normal" }}>{ flightRoutes[i].fares.economy + 1800 } </s>  
              <span style={{ color: 'orange', fontSize: "0.8rem" }}>&nbsp;{ Math.round(180000 / flightRoutes[i].fares.economy) }% OFF</span>
            </div>
          </div>

          <div className="flight-details">
            <p>View flight details</p>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div className="bg-div">
        <img className='bg' src="https://wallpapers.com/images/featured/plane-desktop-yms31u8wyuke7ari.jpg" alt="background" />

        <div className="results">
          <h1>Flights from { filters.fromCity } to { filters.toCity }</h1>
          { (elements.length) ? elements : emptyElement }
        </div>
      </div>
      
    </>
  )
}

export default FlightBookingResults