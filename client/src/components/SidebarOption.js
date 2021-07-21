import React from "react";
import "./SidebarOption.css";

function SidebarOption({ title, Icon, id, setCurrentPlaylist }) {
    const handleClick = (id) => {
        if (!id) return;
        setCurrentPlaylist(id);
    };
    return (
        <div className='sidebarOption' onClick={() => handleClick(id)}>
            {Icon && <Icon className='sidebarOption_icon' />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    );
}

export default SidebarOption;
