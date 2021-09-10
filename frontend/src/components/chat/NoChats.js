import iconGray from './../../assets/img/icon-gray.svg';

const NoChats = () => {
    return (
        <div className="nouser-container">
            <img src={iconGray} alt="icon" />
            <h3>No chats.</h3>
        </div>
    );
}

export default NoChats;