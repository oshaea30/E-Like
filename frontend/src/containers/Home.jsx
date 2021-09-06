import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from 'react-tinder-card';
import NoUsers from "../components/home/NoUsers";
import { fetchUsers } from './../reducks/users/operations';
import { getUsers } from "../reducks/users/selectors";
import { addLike  } from "../reducks/likes/operations";

import crossIcon from "./../../src/assets/img/icon-cross.svg";
import heartIcon from "./../assets/img/icon-heart.svg";
import menuIcon from "./../assets/img/icon.svg";
import chatIcon from "./../assets/img/icon-chat.svg";

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';

const alreadyRemoved = [];

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const users = getUsers(selector);

  const [isLastUser, setIsLastUser] = useState(false);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [users]);

  const handleSwipe = (direction, receive_user_id) => {
    if (direction === DIRECTION_RIGHT) {
      dispatch(addLike(receive_user_id));
    }
    alreadyRemoved.push(receive_user_id);
    setIsLastUser(users.filter(user => !alreadyRemoved.includes(user.id)).length === 0);
  }
  
  const swipe = (dir) => {
    const cardsLeft = users.filter(user => !alreadyRemoved.includes(user.id));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = users.map(user => user.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  }

  return (
    <div className="home">
      <header>
        <img src={menuIcon} alt="menu icon" />
        <img src={chatIcon} alt="chat icon" />
      </header>

      <div className="swipe-container">
        { users.length > 0 ?
          users.map( (user, index) => {
            return ( <TinderCard 
              ref={childRefs[index]}
              key={user.id}
              onSwipe={(direction) => handleSwipe(direction, user.id)}
              preventSwipe={['up', 'down']}>
                <div className="swipe">
                  <img src={user.main_image} className="swipe-main" alt="" />
                </div>
            </TinderCard> )
          }) : 
          <NoUsers />
        }
        { users.length && !isLastUser ? 
          <>
            <img src={crossIcon} className="swipe-cross" onClick={() => swipe(DIRECTION_LEFT)}  alt="" />
            <img src={heartIcon} className="swipe-heart" onClick={() => swipe(DIRECTION_RIGHT)}  alt="" />
          </>
          : <NoUsers />
        }
      </div>
    </div>
  );
};

export default Home;
