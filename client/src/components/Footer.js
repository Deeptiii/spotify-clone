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
            {/* <div className="footer__left">
                <img className="footer__albumLogo"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/The_Local_Train.jpg/330px-The_Local_Train.jpg" alt=""/>
                <div className="footer__songInfo">
                    <h4>Yeah!</h4>
                    <p>Usher</p>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className="footer__green"></ShuffleIcon>
                <SkipPreviousIcon className="footer__icon"></SkipPreviousIcon>
                <PlayCircleOutlineIcon fontSize="large" className="footer__icon"></PlayCircleOutlineIcon>
                <SkipNextIcon className="footer__icon"></SkipNextIcon>
                <RepeatIcon className="footer__green"></RepeatIcon>
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div> */}
        </div>
    );
}

export default Footer;
