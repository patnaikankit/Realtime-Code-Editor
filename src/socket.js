import { io } from "socket.io-client";


// used to pass an instance of the io client
export const initSocket = async function () {
    const options = {
        "force new connection": true,
        reconnectionAttemp: "Infinity",
        timeout: 10000,
        transports: ["websockets"],
    };
    // passing the url of the server
    return io(process.env.REACT_APP_BACKEND_URL, options);
}