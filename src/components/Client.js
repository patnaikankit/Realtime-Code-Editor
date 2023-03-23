import React from 'react';
// using avatar dependency to show avatars
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className="client">
        {/* displaying the avatar  of the client*/}
        {/* passing props */}
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
        </div>
    );
};

export default Client;
