import './App.css'
import Login from './components/LoginPage/login'
import Header from './components/Header/header'
import HomePage from './components/HomePage/homepage'
import Flights from './components/Flights/flights'
import FlightBookingResults from './components/FlightBooking/FlightBookingResults/flightBookingResults'
import { Routes, Route } from 'react-router-dom'
import Profile from './components/Profile/profile'
import FlightDetails from './components/FlightDetails/flightDetails'

function App() {
  return (
    <>
      <Header />
    
      <Routes>
        <Route 
          path="/"
          index element={<HomePage />}
        />
        <Route 
          path="/login"
          element={<Login />}
        />
        <Route 
          path="/flights/:airport_code/:airport_code"
          element={<Flights />}
        />
        <Route 
          path="/flights"
          element={<Flights />}
        />
        <Route 
          path="/flights-results/:source/:destination"
          element={<FlightBookingResults />}
        />
        <Route 
          path='/flight-details/:flight_no'
          element={<FlightDetails />}
        />
        <Route 
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  )
}

export default App
