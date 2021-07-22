import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "../DataLayer";
import { Link } from "react-router-dom";

function Sidebar({ spotify }) {
    const [{ playlists }, dispatch] = useDataLayerValue();

    const setCurrentPlaylist = (id) => {
        spotify.getPlaylist(id).then((response) =>
            dispatch({
                type: "SET_DISCOVER_WEEKLY",
                discover_weekly: response
            })
        );
    };

    return (
        <div className='sidebar'>
            <img
                className='sidebar__logo'
                src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
                alt=''
            />
            <Link to='/'>
                <SidebarOption title='Home' Icon={HomeIcon} />
            </Link>
            <Link to='/search'>
                <SidebarOption title='Search' Icon={SearchIcon} />
            </Link>
            {/* <Link to='/library'>
                <SidebarOption title='My Library' Icon={LibraryMusicIcon} />
            </Link> */}

            <br />
            <strong className='sidebar__title'>PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map((playlist) => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                    <SidebarOption
                        title={playlist.name}
                        id={playlist.id}
                        setCurrentPlaylist={setCurrentPlaylist}
                    />
                </Link>
            ))}
        </div>
    );
}

export default Sidebar;
