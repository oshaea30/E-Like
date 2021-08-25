import React from 'react';

import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import  IconButton from '@material-ui/core/IconButton';

import '../assets/SwipeButtons.css';


const SwipeButtons = () => {
    return (
        <div className="swipeButtons">
            <IconButton className="repeat"><ReplayIcon fontSize="large"/></IconButton>
            <IconButton className="left"><CloseIcon fontSize="large"/></IconButton>
            <IconButton className="right"><FavoriteIcon fontSize="large"/></IconButton>
        </div>
    );
};

export default SwipeButtons;
