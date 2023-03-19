import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

function EditorPage() {

  // Creating a state to store participants in the sidebar
  const [client, setClient] = useState([
    {socketId: 1, username: "Ankit P"},
    {socketId: 2, username: "John D"}
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
   <Editor>
    
   </Editor>
   </div>

   </div>
  );
}

export default EditorPage;
