import React, { useState } from 'react';
// using uuid to generate unique roomid
import { v4 as uuidV4 } from 'uuid';
// enabling toast to notify users that a new roomid is genearetd
import toast from 'react-hot-toast';
// to transfer from one route to a different route
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // creating states to update and assign data for roomid and username
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');


    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
         // console.log(newID);
        setRoomId(id);
        // toast message genearted
        toast.success('Created a new room');
    };

     // to check data entered by user
    const joinRoom = () => {
        // if the fields are not filled
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // in case of successful data entry redirect to editor page
        navigate(`/editor/${roomId}`, {
            // used to pass data from one route to a different route - here username is being passed
            state: {
                username,
            },
        });
    };

    // to use "Enter" button for entering the room 
            const handleInputEnter = (e) => {
                if (e.code === 'Enter') {
                    joinRoom();
                }
            };
            return (
                <div className="homePageWrapper">

                    {/* form elements */}
                    <div className="formWrapper">

                    {/* 1. LOGO */}
                        <img
                            className="homePageLogo"
                            src="/code-sync.png"
                            alt="code-sync-logo"
                        />
                        <h4 className="mainLabel">Paste invitation ROOM ID</h4>

                        {/* 2. Providing input credentials */}
                        <div className="inputGroup">
                            <input
                                type="text"
                                className="inputBox"
                                placeholder="ROOM ID"
                                onChange={(e) => setRoomId(e.target.value)}
                                value={roomId}
                                onKeyUp={handleInputEnter}
                            />
                            <input
                                type="text"
                                className="inputBox"
                                placeholder="USERNAME"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                onKeyUp={handleInputEnter}
                            />

                            {/* 3. Join button */}
                            <button className="btn joinBtn" onClick={joinRoom}>
                                Join
                            </button>

                            {/* 4. Id Genearation */}
                            {/* Prompting users to generate a new id */}
                            <span className="createInfo">
                                If you don't have an invite then create &nbsp;
                                <a
                                    onClick={createNewRoom}
                                    href=""
                                    className="createNewBtn"
                                >
                                    new room
                                </a>
                            </span>
                        </div>
                    </div>
                    <footer>
                            <h4>Built with 💚&nbsp;by&nbsp; <a href="https://github.com/patnaikankit">Ankit Patnaik</a></h4>
                    </footer>
                </div>
    );
};

export default Home;
