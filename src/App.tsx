import './App.css'
import Login from './components/LoginPage/login'
import Header from './components/Header/header'
import HomePage from './components/HomePage/homepage'
import Flights from './components/Flights/flights'
import Suggested from './components/SuggestedDestination/suggested'
import FlightBookingResults from './components/FlightBooking/FlightBookingResults/flightBookingResults'
import { Routes, Route } from 'react-router-dom'

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
          path="/flights"
          element={<Flights />}
        />

        <Route 
          path="/suggested"
          element={<Suggested />}
        />

        <Route 
          path="/flights-results"
          element={<FlightBookingResults />}
        />
      </Routes>
    </>
  )
}

export default App
