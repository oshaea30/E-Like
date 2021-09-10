import { Link, useLocation } from "react-router-dom";

import activeMenuIcon from "./../../assets/img/icon.svg";
import menuIcon from "./../../assets/img/icon-gray.svg";
import chatIcon from "./../../assets/img/icon-chat.svg";
import activeChatIcon from "./../../assets/img/icon-chat-green.svg";

const Header = () => {
    let location = (useLocation());
    return (
        <header>
            <Link to="/"><img src={ location.pathname === '/' ? activeMenuIcon : menuIcon } alt="menu icon" /></Link>
            <Link to="/matches"><img src={location.pathname === '/matches' ? activeChatIcon : chatIcon} alt="chat icon" /></Link>
        </header>
    )
}

export default Header;