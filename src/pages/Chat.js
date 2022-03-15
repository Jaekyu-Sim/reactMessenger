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
      })//여기 수정해야함. 렌더링 될때마다 메시지 보내는것처럼 되어있으니, 나중에 [] 와 같은 렌더링 초기 1회에만 실행되는 식으로 변경 해야함.
    const onSubmit = (e) => {
        
        console.log("button clicked");
        console.log(e)
        e.preventDefault();
        const message = msg;
        socket.emit('message', {userId, message})
        console.log(message);
        console.log("usesr Id : ", userId);
        setMsg("");
    }
     const putEnter = (e) => {
         const message = msg
         e.preventDefault();
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
                <Button type="primary" onClick={onSubmit}>Send</Button>
            </Input.Group>
        </div>
    )
}

export default React.memo(Chat);