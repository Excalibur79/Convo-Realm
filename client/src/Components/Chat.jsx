import React,{useState,useEffect,useContext} from "react";
import {UserContext} from "../Contexts/UserContext";
import {ChatContext} from "../Contexts/ChatContext";

import "../styles/Chat.scss";



function Chat(props)
{
   // const {Username,Userid}=useContext(UserContext);
    //const [messages,setmessages]=useState(props.chats);
    //const [notifications,setnotifications]=useState([]);
   // const [notification,setnotification]=useState("");

   const {notifications,notification,messages,message,groupname,roomid,Changenotifications,Changenotification,Changemessages,
    Changemessage,Changegroupname,Changeroomid    
        }=useContext(ChatContext);

    useEffect(()=>
    {
      if(props.shown)
      {
         
            Changegroupname(props.groupname);
            Changeroomid(props.socketroomid);
           
           
      }
    })
  

  
   
    


  
    return null;
}
export default Chat;