import React from 'react'
import '../assets/Header.css';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
function Header() {
    return (
        //BEM
        <div className="header">
            <IconButton>
             <PersonIcon className="header_icon" fontSize="large"/>
            </IconButton>
            <img
                className="header__log"
                src="images/group 4.png" alt="Applogo"/>
            <IconButton>
             <ForumIcon className="header_icon" fontSize="large"/>
            </IconButton>
        </div>
    );
}

export default Header;


