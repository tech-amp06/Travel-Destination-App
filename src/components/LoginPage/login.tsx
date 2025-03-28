import './login.css';
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/credentials.json'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  function auth() {
    if (username === "traveller06" && password === "myself_traveller") {
      setIsValid(true);
      localStorage.setItem("loggedIn", "true");
      navigate('/');
    } else {
      setIsValid(false);
    }
  }

  return (
    <>
      <div className="page">
        <img className='bg-image' src="https://images3.alphacoders.com/568/568877.jpg" alt="hawaii" />
        
        <div className="login">
          <h1>Sign in</h1>

          <div className="login-details">
            <form>
              <label>Enter username</label>
              <input 
                value={username} 
                id="username" 
                type="text" 
                onChange={e => {setUsername(e.target.value)}}
              />

              <label>Enter password</label>
              <input 
                value={password}
                id="password" 
                type="password"
                onChange={e => {setPassword(e.target.value)}}
              />
            </form>

            { isValid || <p className='invalid-username'>Incorrect credentials</p> }

            <p className="others">Or Login/Signup With</p>

            <div className="other-ways">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256" alt="google" />
              <p>Sign in using Google account</p>
            </div>

            <div className="submit">
              <button 
                type="button" 
                className="btn btn-success"
                onClick={auth}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;