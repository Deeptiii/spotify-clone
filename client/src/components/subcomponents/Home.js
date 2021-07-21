import React, { useState, useEffect } from "react";
import { useDataLayerValue } from "../../DataLayer";
import SongRow from "../SongRow";

const Home = ({ spotify, chooseTrack }) => {
    // const [{ spotify }, dispatch] = useDataLayerValue();
    const [recommentation, setRecommentation] = useState([]);
    useEffect(() => {
        spotify
            .getRecommendations({
                min_energy: 0.4,
                seed_artists: [
                    "1mYsTxnqsietFxj1OgoGbG",
                    "5GnnSrwNCGyfAU4zuIytiS"
                ],
                min_popularity: 50
            })
            .then((res) => {
                setRecommentation(res.tracks);
            });
    }, []);
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
