import React, {useState, useCallback, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useSocket} from '../context/SocketProvider'
import './Lobby.css'
const LobbyScreen = () => {
    const[email, setEmail] = useState('')
    const[room, setRoom] = useState("")

    const socket = useSocket()
    const navigate = useNavigate();
    console.log(socket)

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", {email, room});

    }, [email, room, socket])
    const handleJoinRoom = useCallback(
        (data) => {
          const { email, room } = data;
          navigate(`/room/${room}`);
        },
        [navigate]
      );
    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return() =>{socket.off('room:join', handleJoinRoom)}
    }, [socket])
    return(
        <section>
            <h1 id="title">XPRESS VIDEO CHAT</h1>
        <div id = 'container'>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <img src="https://cdn-icons-png.flaticon.com/512/948/948212.png?w=1060&t=st=1684228622~exp=1684229222~hmac=d191f0cf54055d86a6753ef88a92171dbdbc45e4dee76e8e0deb7af1e3410449"/>
                <input type="email" id = "email" placeholder = "Email" value = {email} onChange={e => setEmail(e.target.value)}/>
                <br></br>
                <input type="text" id = "room" placeholder="Room Id" value = {room} onChange={e => setRoom(e.target.value)}/>
                <br></br>
                <button>Join</button>
            </form>
        </div>
        </section>
    )
}

export default LobbyScreen;