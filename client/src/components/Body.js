import React, { useEffect, useState } from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "../DataLayer";
import { Favorite, MoreHoriz, PlayCircleFilled } from "@material-ui/icons";
import SongRow from "./SongRow";
import Home from "./subcomponents/Home";
import { useParams, useLocation } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

function Body({ spotify, chooseTrack }) {
    const [{ discover_weekly }] = useDataLayerValue();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const path = useLocation().pathname;
    const { id } = useParams();

    let cancel = false;
    useEffect(() => {
        if (!search) {
            if (path !== "/search") {
                setSearchResult([]);
            }
            return;
        }

        spotify.searchTracks(search).then((res) => {
            if (cancel) return;
            setSearchResult(res.tracks.items);
        });

        return () => (cancel = true);
    }, [search, path]);

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleChooseTrack = (track) => {
        chooseTrack(track);
        setSearch("");
    };

    return (
        <div className='body'>
            <Header
                spotify={spotify}
                search={search}
                changeSearch={onChangeSearch}
            />
            <Switch>
                <Route exact path='/'>
                    <Home spotify={spotify} chooseTrack={chooseTrack} />
                </Route>
                <Route path='/playlist/:id'>
                    <>
                        <div className='body__info'>
                            <img src={discover_weekly?.images[0]?.url} alt='' />
                            <div className='body_infoText'>
                                <strong>PLAYLIST</strong>
                                <h2>{discover_weekly?.name}</h2>
                                <p>{discover_weekly?.description}</p>
                            </div>
                        </div>
                        <div className='body__songs'>
                            <div className='body__icons'>
                                <PlayCircleFilled className='body__shuffle' />
                                <Favorite fontSize='large' />
                                <MoreHoriz />
                            </div>
                            {discover_weekly?.tracks.items.map((item) => {
                                return (
                                    <SongRow
                                        key={item.track.id}
                                        track={item.track}
                                        chooseTrack={chooseTrack}
                                    />
                                );
                            })}
                        </div>
                    </>
                </Route>
                <Route exact path='/search'>
                    {searchResult.length && (
                        <div className='body__songs'>
                            {searchResult.map((item) => (
                                <SongRow
                                    key={item.id}
                                    track={item}
                                    chooseTrack={handleChooseTrack}
                                />
                            ))}
                        </div>
                    )}
                </Route>
            </Switch>
        </div>
    );
}

export default Body;
