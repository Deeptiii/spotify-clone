import React, { useState } from "react";
import Body from "./Body";
import Sidebar from "./Sidebar";
import "./Player.css";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

function Player({ accessToken, spotify }) {
    const [playingTrack, setPlayingTrack] = useState();

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };

    return (
        <Router>
            <div className='player'>
                <div className='player__body'>
                    <Sidebar spotify={spotify} />
                    <Body spotify={spotify} chooseTrack={chooseTrack} />
                </div>
                <Footer
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                />
            </div>
        </Router>
    );
}

export default Player;
