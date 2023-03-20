import React, { useState } from "react";
// using uuid to generate unique roomid
import {v4 as uuidv4} from "uuid";
// enabling toast to notify users that a new roomid is genearetd
import toast from "react-hot-toast";
// to transfer from one route to a different route
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  // creating states to update and assign data for roomid and username
  const [roomID, setroomID] = useState('');
  const [username, setusername] = useState('');

  // updating the roomid input box with the id generated using uuid
  const createNewRoom = function(event){
    event.preventDefault();
    const newID = uuidv4();
    // console.log(newID);
    setroomID(newID)
    // toast message genearted
    toast.success("Created a new room!");
  }

  const navigate = useNavigate();
  // to check data entered by user
  const joinRoom = function(){
    // if the fields are not filled
    if(!roomID || !username){
      toast.error("ROOM ID and USERNAME is required!")
      return;
    }

    // in case of successful data entry redirect to editor page
    navigate(`/editor/${roomID}`, {
      // used to pass data from one route to a different route - here username is being passed
      state: {
        username
      },
    })
  }

  // to use "Enter" button for entering the room 
  const handleClick = function(event){
    if(event.code === "Enter"){
      joinRoom();
    }
  }

  return (
    <div className="homePageWrapper">

    {/* form elements */}
    <div className="formPageWrapper">

    {/* 1. LOGO */}
    <img className="logo" src="/code-sync.png" alt="code-sync-logo"></img>
    <h4 className="mainLabel">
    Paste Room Invitation ID
    </h4>

    {/* 2. Providing input credentials */}
    <div className="inputCred">
    <input className="inputBox" placeholder="ROOM ID" onChange={function(event){
      setroomID(event.target.value);
    }} value={roomID} onKeyUp={handleClick}></input>

    <input className="inputBox" placeholder="USERNAME" onChange={function(event){
      setusername(event.target.value);
    }} value={username} onKeyUp={handleClick}></input>

    {/* 3. Join button */}
    <button className="btn joinBtn" onClick={joinRoom}>Join</button>

    {/* 4. Id Genearation */}
    {/* Prompting users to generate a new id */}
    <span className="info">If you don't have an invite then create &nbsp; 
    <a onClick={createNewRoom} href="" className="createNewRoom">new room</a>
    </span>
    </div>
    </div>
    <footer>
      <h4>Built with 💚&nbsp;by&nbsp; <a href="https://github.com/patnaikankit">Ankit Patnaik</a></h4>
    </footer>
    </div>
  );
}

export default Home;
