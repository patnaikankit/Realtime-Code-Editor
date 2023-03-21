import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
// location is used to use data from a different route
import { useLocation, reactNavigator, useNavigate, Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { initSocket } from '../socket';
import { Socket } from "socket.io-client";

function EditorPage() {

  // initializing a socket connection
  // useRef is used so when data is manipulated and you don't want to re-render the page  
  const socketRef = useRef(null);
  const location = useLocation();
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const {roomID} = useParams();
  // Creating a state to store participants in the sidebar
  const [client, setClient] = useState([]);


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
        roomID,
        // ? is used in case if there is no username js will not show an error
        username: location.state?.username,
      });

      // listening for joined event
      Socket.current.on(ACTIONS.JOINED, ({client, username, socketId}) => {
        if(username !== location.state?.username){
          toast.success(`${username} joined the room.`);
          console.log(`${username} joined`);
        }

        setClient(client);
      })

      //listening for disconnected users
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId,username}) => {
        toast.success(`${username} left the room.`);
        setClient((prev) => {
          return prev.filter(
              (client) => (client.socketId !== socketId)
          );
      }); 
      })
    };
    init();

    //  always clear the listeners
    return () => {
      // socketRef.current.disconnect();
      // // unsubscribing the clients who have left
      // socketRef.current.off(ACTIONS.JOINED);
      // socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);


  // to get a copy of the room id
  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomID);
      toast.success("Room Id has been copied to your clipboard");
    }
    catch(err){
      toast.error("Could not copy room id");
      console.log(err);
    }
  }

  // to leave the room
  function leaveRoom(){
    reactNavigator('/');
  }

  // in case we don't get the username client will be redirected to home page
  if(!location.state){
    return <Navigate to="/"></Navigate>
  }


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
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>

      </div>

      {/* Actual coding space for the clients */}
      <div className="code-space">
        <Editor socketRef={socketRef} roomID={roomID}></Editor>
      </div>

    </div>
  );
}

export default EditorPage;
