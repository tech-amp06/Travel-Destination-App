import './login.css';
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/credentials.json'
import { useState } from 'react';
import authenticate from '../../api/authenticationApi';
import { useForm } from 'react-hook-form';

function Login() {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { register, handleSubmit } = useForm();

  async function auth({ username, password }: any) {
    if (await authenticate(username, password)) {
      setUsername(username);
      setIsValid(true);
      localStorage.setItem("loggedIn", "true");
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
            <form onSubmit={handleSubmit(auth)}>
              <label>Enter username</label>
              <input 
                {...register("username")}
                id="username" 
                type="text" 
              />

              <label>Enter password</label>
              <input 
              {...register("password")}
                id="password" 
                type="password"
              />

              { isValid || <p className='invalid-username'>Incorrect credentials</p> }

              <p className="others">Or Login/Signup With</p>

              <div className="other-ways">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256" alt="google" />
                <p>Sign in using Google account</p>
              </div>

              <div className="submit">
                <button 
                  type="submit" 
                  className="btn btn-success"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;