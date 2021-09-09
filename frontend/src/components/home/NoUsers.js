import iconGray from './../../assets/img/icon-gray.svg';

const NoUsers = () => {
    return (
        <div className="nouser-container">
            <img src={iconGray} alt="icon" />
            <h3>No users.</h3>
        </div>
    );
}

export default NoUsers;