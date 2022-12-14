import 'src/App.css'
import './roleSelect.css'
import Button from 'src/components/button'
import { useEffect, useState } from 'react'
import socket from "../socketConfig.jsx";

function RoleSelect(props) {
    const [validUser, setValidUser] = useState(false);
    const [inputText, setInputText] = useState("");

    function handleHostSelect(role) {
        socket.emit("join_tv", "", ()=>console.log("ack"));
        console.log(`HOST role selected`);
    }

    function handlePlayerSelect(role) {
        if (validUser) {
            socket.emit("join_game", {"name":inputText})
            console.log(`PLAYER role selected`)
        }
    }

    function handleChange(e) {
        setInputText(e.target.value);
    }

    useEffect(() => {
        if (inputText.length > 0) {
            setValidUser(true);
        } else {
            setValidUser(false);
        }
    }, [inputText]);

    return (
        <div id="rs_container">
            <div id="rs_info_text" className='info_text'>
                Choose your role!
            </div>
            <Button label={"Host"} onClick={handleHostSelect} />
            <Button label={"Player"} onClick={handlePlayerSelect} clickable={validUser} />
            <input placeholder="Username" onChange={handleChange}></input>
        </div >
    )
}

export default RoleSelect