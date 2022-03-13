import React, { useState, useEffect, useLocation } from "react";
import { Input, Button} from "antd";
import queryString from "query-string";
import io from 'socket.io-client';
import { Link, useSearchParams } from "react-router-dom";

const socket =  io.connect('http://localhost:5000');

const Chat = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    //console.log("userId : ", searchParams.get('userId')); // 'name'
    const [msg, setMsg] = useState("");
    const [userId, setUserId] = useState("");
    const [chat, setChat] = useState([]);

    //setUserId(searchParams.get('userId'));
    // useEffect(() => {
    //     return () => {
    //       socket.close();
    //     };
    //   }, []);
    useEffect(() => {
        setUserId(searchParams.get('userId'))
    }, [])
    useEffect(()=>{
        socket.on('message',({userId,message})=>{
          setChat([...chat,{userId,message}])
        })

        //console.log("chat : ", chat);
      })
    const onSubmit = (e) => {
        
        console.log("button clicked");
        console.log(e)
        //e.preventDefault();
        const message = msg;
        socket.emit('message', {userId, message})
        console.log(message);
        console.log("usesr Id : ", userId);
        setMsg("");
    }
     const putEnter = () => {
         const message = msg
         console.log("t : ", userId, message)
         socket.emit('message', {userId, message});
         setMsg("");
     }

    const renderChat =()=>{
         return chat.map(({userId, message},index)=>(
           <div key={index}>
             <h3>{userId}:<span>{message}</span></h3>
           </div>
         ))
      }

    return (
        <div>
            {renderChat()}
            

            <Input.Group style={{position:"fixed", bottom:"10px"}}>
                <Input style={{ width: 'calc(100% - 200px)' }} 
                       onChange={(e) => {setMsg(e.target.value)}} 
                       value={msg} 
                       onPressEnter={putEnter}
                        />
                <Button type="primary" onClick={(e) => {onSubmit()}}>Send</Button>
            </Input.Group>
        </div>
    )
}

export default React.memo(Chat);