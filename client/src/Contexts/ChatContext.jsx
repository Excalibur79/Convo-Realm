import React,{createContext,useState} from "react";

export const ChatContext=createContext();

export function ChatProvider(props)
{
  const [notifications,setnotifications]=useState([]);
 const [messages,setmessages]=useState([]);
 const [message,setmessage]=useState("");
 const [notification,setnotification]=useState("");
 const [groupname,setgroupname]=useState("");
 const [roomid,setroomid]=useState("");

 const Changenotifications=array=>
 {
     setnotifications(array);
 }
 const Changenotification=data=>
 {
     setnotification(data);
 }
 
 const Changemessages=array=>
 {
     setmessages(array);
 }
 const Changemessage=data=>
 {
     setmessage(data);
 }

 const Changegroupname=data=>
 {
    setgroupname(data);
 }
 const Changeroomid=data=>
 {
     setroomid(data);
 }
 
    return(
        <ChatContext.Provider value={{
            notifications:notifications,
            notification:notification,
            messages:messages,
            message:message,
            groupname:groupname,
            roomid:roomid,
            Changenotifications:Changenotifications,
            Changenotification:Changenotification,
            Changemessages:Changemessages,
            Changemessage:Changemessage,
            Changegroupname:Changegroupname,
            Changeroomid:Changeroomid,


          }
        }>
            {props.children}
        </ChatContext.Provider>

    )
}
