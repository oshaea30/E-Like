import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
                    let partnerName = item.user_id_1.id !== user.id ? item.user_id_1.username : item.user_id_2.username;
                    return (
                        <Link to={{
                            pathname:`/matches/${item.id}`,
                            state: {partnerName}
                        }} key={item.id} >
                        <li>
                            <img src={item.user_id_1.id !== user.id ? item.user_id_1.main_image : item.user_id_2.main_image} alt="profile" />
                            <div className="right">
                                <strong className="name">{partnerName}</strong>
                                { item.latest_chat ?
                                    <p className="message"> {item.latest_chat.body} &nbsp;
                                        <span><strong>{formatDate(item.latest_chat.created_at)}</strong></span>
                                    </p>
                                    : null
                                }
                            </div>
                        </li>
                        </Link>
                    )
                })
            }
        </ul>
    )
}

export default MatchList;