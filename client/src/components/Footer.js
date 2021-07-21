import React, { useState, useEffect } from "react";
import "./Footer.css";
// import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import ShuffleIcon from "@material-ui/icons/Shuffle";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
// import VolumeDownIcon from "@material-ui/icons/VolumeDown";
// import { Grid, Slider } from "@material-ui/core";
import SpotifyPlayer from "react-spotify-web-playback";

function Footer({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    return (
        <div className='footer'>
            <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
                initialVolume='0.5'
                styles={{
                    activeColor: "#fff",
                    bgColor: "#333",
                    color: "#fff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#fff"
                }}
            />
        </div>
    );
}

export default Footer;
