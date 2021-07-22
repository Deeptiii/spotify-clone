import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { useDataLayerValue } from "../DataLayer";
import { useLocation } from "react-router-dom";

function Header({ changeSearch, search }) {
    const [{ user }, dispatch] = useDataLayerValue();
    const path = useLocation().pathname;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose();
        dispatch({
            type: "RESET_STATE"
        });
        window.history.pushState({}, null, "/");
    };

    return (
        <div className='header'>
            <div className='header__start'>
                <button className='route_button'> {"<"} </button>
                <button className='route_button'> {">"} </button>
            </div>
            {path === "/search" && (
                <div className='header__left'>
                    <SearchIcon />
                    <input
                        type='search'
                        placeholder='Search for Artists, Songs or Album'
                        value={search}
                        onChange={changeSearch}
                    />
                </div>
            )}
            <div className='header__right'>
                <button
                    aria-controls='profile-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                    className='header__rightButtons'>
                    <Avatar
                        src={user?.images[0]?.url}
                        alt={user?.display_name}
                    />
                    <h4>{user?.display_name}</h4>
                </button>
                <Menu
                    style={{ top: "50px", minWidth: "130px" }}
                    id='profile-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
