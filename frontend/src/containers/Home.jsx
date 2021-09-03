import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from 'react-tinder-card';
import { fetchUsers } from './../reducks/users/operations';
import { getUsers } from "../reducks/users/selectors";

import crossIcon from "./../../src/assets/img/icon-cross.svg";
import heartIcon from "./../assets/img/icon-heart.svg";
import menuIcon from "./../assets/img/icon.svg";
import chatIcon from "./../assets/img/icon-chat.svg";

const DIRECTION_RIGHT = 'right';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const users = getUsers(selector);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleSwipe = (direction, user_id) => {
    if (direction === DIRECTION_RIGHT) {
      console.log("like from user " + user_id);
    }
  }
  
  const onCardLeftScreen = (id) => {
    console.log(id + ' left the screen')
  }

  return (
    <div className="home">
      <header>
        <img src={menuIcon} alt="menu icon" />
        <img src={chatIcon} alt="chat icon" />
      </header>

      <div className="swipe-container">
        {
          users.map( user => {
            return ( <TinderCard 
              key={user.id}
              onSwipe={(direction) => handleSwipe(direction, user.id)} 
              onCardLeftScreen={() => onCardLeftScreen(user.id)} 
              preventSwipe={['up', 'down']}>
                <div className="swipe">
                  <img src={user.main_image} className="swipe-main" alt="" />
                  <img src={crossIcon} className="swipe-cross" alt="" />
                  <img src={heartIcon} className="swipe-heart" alt="" />
                </div>
            </TinderCard> )
          })
        }
      </div>
    </div>
  );
};

export default Home;
