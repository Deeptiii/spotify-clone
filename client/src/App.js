import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {

  //Run code based on given condition

  // const [token, setToken] = useState(null);
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(()=> {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      }) 
         
      spotify.setAccessToken(_token);

      spotify.getMe().then(user=> {
        // console.log("Person", user);
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })

      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type:"SET_PLAYLISTS",
          playlists: playlists
        })
      })

      spotify.getPlaylist('5nUWJ89D3u5bSHk53l10i1').then(response => 
        dispatch({
          type: 'SET_DISCOVER_wEEKLY',
          discover_weekly: response
        })
      )
    }

  }, []);
  
  return (
    <div className="app">
      {
        token ? (         
        <Player spotify={spotify}/>
        ) : (
          <Login/>
        )
      }
      
    </div>
  );
}

export default App;
