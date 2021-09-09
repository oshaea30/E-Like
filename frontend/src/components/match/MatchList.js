import { useSelector } from "react-redux";
import { getUser } from "./../../reducks/users/selectors";

const MatchList = (props) => {

    const selector = useSelector((state) => state);
    const user = getUser(selector);

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {month: 'short', day: '2-digit'})
    }

    return (
        <ul>
            {
                props.list.map(item => {
                    return (
                        <li key={item.id}>
                            <img src={item.user_id_1.id !== user.id ? item.user_id_1.main_image : item.user_id_2.main_image} alt="profile" />
                            <div className="right">
                                <strong className="name">{item.user_id_1.id !== user.id ? item.user_id_1.username : item.user_id_2.username}</strong>
                                { item.latest_chat ?
                                    <p className="message"> {item.latest_chat.body} &nbsp;
                                        <span><strong>{formatDate(item.latest_chat.created_at)}</strong></span>
                                    </p>
                                    : null
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default MatchList;