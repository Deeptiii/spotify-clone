import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi({
    clientId: "3b35541d617445a691f6103e77676f8e"
});

function App() {
    const [{ token }, dispatch] = useDataLayerValue();

    const clearAccessToken = (expiresIn) => {
        setTimeout(() => {
            localStorage.setItem("token", "");
            localStorage.setItem("user", "");
        }, expiresIn * 1000);
    };

    useEffect(() => {
        try {
            if (!token) {
                const hash = getTokenFromUrl();
                window.location.hash = "";
                const _token = hash.access_token;

                if (_token) {
                    dispatch({
                        type: "SET_TOKEN",
                        token: _token
                    });

                    spotify.setAccessToken(_token);
                    clearAccessToken(hash.expires_in);

                    spotify.getMe().then((user) => {
                        // console.log("Person", user);
                        dispatch({
                            type: "SET_USER",
                            user: user
                        });
                    });

                    spotify.getUserPlaylists().then((playlists) => {
                        dispatch({
                            type: "SET_PLAYLISTS",
                            playlists: playlists
                        });
                    });

                    spotify
                        .getPlaylist("5nUWJ89D3u5bSHk53l10i1")
                        .then((response) =>
                            dispatch({
                                type: "SET_DISCOVER_WEEKLY",
                                discover_weekly: response
                            })
                        );
                }
            } else {
                spotify.setAccessToken(token);
                spotify
                    .getUserPlaylists()
                    .then((playlists) => {
                        dispatch({
                            type: "SET_PLAYLISTS",
                            playlists: playlists
                        });
                    })
                    .catch((err) => {
                        dispatch({ type: "RESET_STATE" });
                        window.location = "/";
                    });

                spotify
                    .getPlaylist("5nUWJ89D3u5bSHk53l10i1")
                    .then((response) =>
                        dispatch({
                            type: "SET_DISCOVER_WEEKLY",
                            discover_weekly: response
                        })
                    )
                    .catch((err) => {
                        dispatch({ type: "RESET_STATE" });
                        window.location = "/";
                    });
            }
        } catch (err) {
            dispatch({ type: "RESET_STATE" });
            window.location = "/";
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='app'>
            {token ? (
                <Player spotify={spotify} accessToken={token} />
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
