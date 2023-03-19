import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
// location is used to use data from a different route
import { useLocation } from "react-router-dom";

function EditorPage() {

  // initializing a socket connection
  // useRef is used so when data is manipulated and you don't want to re-render the page  
  const socketRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const init = async function () {
      socketRef.current = await initSocket();

      // to notify the users that something went wrong while entering the room
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));
      
      // function gets called if an error is encountered
      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
    }

      // to notify the server when a new client is joining the room
      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        // ? is used in case if there is no username js will not show an error
        username: location.state?.username,
      });
    };
    init();
  }, []);

  // Creating a state to store participants in the sidebar
  const [client, setClient] = useState([
    { socketId: 1, username: "Ankit P" },
    { socketId: 2, username: "John D" }
  ])

  return (
    <div className="Editorpage">

      <div className="side-bar">

        {/* New div initiated to provide appropriate spacing between the componenets */}
        <div className="components">

          {/* div for logo */}
          <div className="logo">
            <img src="/code-sync.png" alt="logo" className="image">
            </img>
          </div>

          <h3>Connected</h3>

          {/* Participant list */}
          <div className="clientList">
            {/* Initializing a map to store and display all the clients  */}
            {client.map((item) => (
              /* passing the data to Client.js for further manipulation */
              <Client
                key={item.socketId}
                username={item.username}
              />
            ))}
          </div>
        </div>

        {/* Buttons at the end of the sidebar */}
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>

      </div>

      {/* Actual coding space for the clients */}
      <div className="code-space">
        <Editor />

      </div>

    </div>
  );
}

export default EditorPage;
