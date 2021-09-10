import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ChatList from "../components/chat/ChatCard";
import NoChats from "../components/chat/NoChats";
import { addChat, fetchChats, resetChats } from "../reducks/chats/operations";
import { getChats } from "../reducks/chats/selectors";
import { getUser } from "../reducks/users/selectors";
import backBtn from "./../assets/img/icon-arrow.svg";

const Chat = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    let [page, setPage] = useState(1);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    let history = useHistory();

    const chats = getChats(selector);
    const user = getUser(selector);

    const matchId = props.match.params.id;
    useEffect(() => {
        dispatch(resetChats());
        dispatch(fetchChats(matchId, page));

        // eslint-disable-next-line
    }, []);

    const onNextChat = () => {
        if (!chats.next) {
            return setHasMoreItems(false);
        }
        setPage(++page);
        dispatch(fetchChats(matchId, page));
    };

    const [body, setBody] = useState("");
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };
    const bodyChatHandler = () => {
        if (!body.trim()) return;

        dispatch(addChat({ body, matchId }));

        setBody("");
    };

    const backHandler = () => {
        history.push("/matches");
    };

    //? Handle when user click enter type. 13 => Enter Key
    const onTypeEnter = (event) => event.keyCode === 13 && bodyChatHandler();

    return (
        <React.Fragment>
            <div className="chat">
                <header className="chat">
                    <img onClick={backHandler} src={backBtn} alt="" />
                    <div className="name">
                        {props.location.state.partnerName}
                    </div>
                </header>

                <div className="content">
                    <div
                        id="scrollableDiv"
                        style={{
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column-reverse",
                        }}
                    >
                        <InfiniteScroll
                            dataLength={chats.results.length}
                            next={onNextChat}
                            style={{
                                display: "flex",
                                flexDirection: "column-reverse",
                            }} //To put endMessage and loader to the top.
                            inverse={true} //
                            hasMore={hasMoreItems}
                            scrollableTarget="scrollableDiv"
                        >
                            {
                                <ul>
                                    {chats.results.length > 0 ? 
                                        chats.results.map((chat) => (
                                            <ChatList
                                                key={chat.id}
                                                data={{ chat, userId: user.id }}
                                            />
                                        ))
                                    : <NoChats />
                                    }
                                </ul>
                            }
                        </InfiniteScroll>
                    </div>

                    <div className="send-message">
                        <textarea
                            value={body}
                            onChange={handleBodyChange}
                            autoFocus
                            onKeyDown={(e) => onTypeEnter(e)}
                            name="body"
                            placeholder="Message"
                        ></textarea>
                        <button onClick={bodyChatHandler} type="button">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;
