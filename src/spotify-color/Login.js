import React from 'react'
import logo from './Spotify_Logo_CMYK_Black.png'
import './Login.css'
import { loginURL } from './spotify';

function Login() {
    console.log(loginURL);
    return (
        <div className='loginDiv'>
            <img className='spotifyLogo' src={logo} alt="Spotify-Logo"/>
            <a className='loginLink' href={loginURL}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login;