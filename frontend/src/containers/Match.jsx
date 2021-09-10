import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../reducks/matches/selectors";
import { fetchMatches } from "../reducks/matches/operations";
import Header from "../components/default/Header";
import MatchList from "../components/match/MatchList";
import Empty from "../components/default/Empty";

import chatIcon from "./../assets/img/icon-chat.svg";

const Match = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const matches = getMatches(selector);

  useEffect(() => {
    dispatch(fetchMatches());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="matches">
        <Header />
        {matches.length > 0 ?
          <MatchList list={matches} />
          : <Empty  icon={chatIcon} message="You haven't matched yet. Let's send likes"/>
        }

      </div>
    </>
  )
}

export default Match;