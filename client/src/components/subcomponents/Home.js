import React, { useState, useEffect } from "react";
import SongRow from "../SongRow";

const Home = ({ spotify, chooseTrack }) => {
    const [recommentation, setRecommentation] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (!recommentation.length)
            spotify.getMyTopArtists().then((res) => {
                const artst = res.items.map((item) => item.id);
                setArtists(artst);
            });
    }, [recommentation]);

    useEffect(() => {
        if (!recommentation.length)
            spotify
                .getRecommendations({
                    min_energy: 0.4,
                    seed_artists: artists,
                    min_popularity: 50
                })
                .then((res) => {
                    setRecommentation(res.tracks);
                });
        // eslint-disable-next-line
    }, [artists]);
    return (
        <div>
            <h2>Recommendations</h2>
            <div className='body__songs'>
                {recommentation.map((item) => (
                    <SongRow
                        key={item.id}
                        track={item}
                        chooseTrack={chooseTrack}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
