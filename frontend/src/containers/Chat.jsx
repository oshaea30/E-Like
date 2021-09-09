import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from '../components/chat/ChatCard';
import NoChats from '../components/chat/NoChats';

import { addChat, fetchChats } from '../reducks/chats/operations';
import { getChats } from '../reducks/chats/selectors';
import { getUser } from '../reducks/users/selectors';

import backBtn from "./../assets/img/icon-arrow.svg";

const Chat = (props) => {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	let [page, setPage] = useState(1);
	const [hasMoreItems, setHasMoreItems] = useState(true);

	const chats = getChats(selector);
	const user = getUser(selector);

	console.log(props)

	const matchId = props.match.params.id;
	// eslint-disable-next-line
	useEffect(() => dispatch(fetchChats(matchId, page)), [])

	const onNextChat = async () => {
		if (!chats.next) {
			return setHasMoreItems(false)
		}
		page++;
		setPage(page);
		dispatch(fetchChats(matchId, page))
	}

	const [body, setBody] = useState('');
	const handleBodyChange = (e) => {
		setBody(e.target.value)
	};
	const bodyChatHandler = async () => {
		if (!body.trim()) return;

		dispatch(addChat({ body, matchId }));

		setBody('')
	};

	//? Handle when user click enter type. 13 => Enter Key
	const onTypeEnter = (event) => event.keyCode === 13 && bodyChatHandler()

	return (
		<React.Fragment>
			<div className="chat">
				<header className="chat">
					<img src={backBtn} alt="" />
					<div className="name">{props.location.state.partnerName}</div>
				</header>

				<div className="content">
					<div
						id="scrollableDiv"
						style={{
							overflow: 'auto',
							display: 'flex',
							flexDirection: 'column-reverse'
						}}
					>
						<InfiniteScroll
							dataLength={chats.results.length}
							next={onNextChat}
							style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
							inverse={true} //
							hasMore={hasMoreItems}
							scrollableTarget="scrollableDiv"
						>
							{
								<ul>
									{
										chats.results.length > 0 ?
											chats.results.map(chat =>
												<ChatList
													key={chat.id}
													data={{ chat, userId: user.id }}
												/>) :
											<NoChats />
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
							name="body" placeholder="Message"
						>
						</textarea>
						<button onClick={bodyChatHandler} type="button">
							Send
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Chat;