import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from 'react-tinder-card';
import Empty from "../components/default/Empty";
import Header from "../components/default/Header";
import { fetchUsers, removeUser } from './../reducks/users/operations';
import { getUsers } from "../reducks/users/selectors";
import { addLike  } from "../reducks/likes/operations";

import crossIcon from "./../../src/assets/img/icon-cross.svg";
import heartIcon from "./../assets/img/icon-heart.svg";

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';

const alreadyRemoved = [];

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const users = getUsers(selector);
  const userList = users.results;

  let [page, setPage] = useState(1);
  
  useEffect(() => {
    if (users && users.results.length === 0) {
      dispatch(fetchUsers({page}));
    }
    // eslint-disable-next-line
  }, []);

  const childRefs = useMemo(() => Array(userList.length).fill(0).map(i => React.createRef()), [userList]);

  const outOfFrame = (user_id) => {
    // remove user from store
    dispatch(removeUser(user_id));
  }

  const handleSwipe = (direction, receive_user_id) => {
    if (direction === DIRECTION_RIGHT) {
      dispatch(addLike(receive_user_id));
    }
    alreadyRemoved.push(receive_user_id);
    let lastUser = userList.filter(user => !alreadyRemoved.includes(user.id)).length === 0;
    if (lastUser && users.next) {
      // eslint-disable-next-line
      setPage(++page);
      dispatch(fetchUsers({page}));
    }
  }
  
  const swipe = (dir) => {
    const cardsLeft = userList.filter(user => !alreadyRemoved.includes(user.id));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = userList.map(user => user.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  }

  return (
    <div className="home">
      <Header />
      <div className="swipe-container">
        { userList.length > 0 ?
          userList.map( (user, index) => {
            return ( <TinderCard 
              ref={childRefs[index]}
              key={user.id}
              onSwipe={(direction) => handleSwipe(direction, user.id)}
              onCardLeftScreen={() => outOfFrame(user.id)}
              preventSwipe={['up', 'down']}>
                <div className="swipe">
                <h1 className="swipe-name">{user.username}</h1>
                <img src={user.main_image} className="swipe-main" alt="" />
                <h2 className="swipe-bio">{user.bio}</h2>
              
                </div>
            </TinderCard> )
          }) : 
          <Empty message="Can not find users. Please try later."/>
        }
        { userList.length > 0 ? 
          <>
            <img src={crossIcon} className="swipe-cross" onClick={() => swipe(DIRECTION_LEFT)}  alt="" />
            <img src={heartIcon} className="swipe-heart" onClick={() => swipe(DIRECTION_RIGHT)}  alt="" />
          </>
          : null
        }
      </div>
    </div>
  );
};

export default Home;