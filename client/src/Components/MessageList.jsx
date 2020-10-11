import React,{useEffect,useRef} from "react";
import "../styles/MessageList.scss";
import uuid from "react-uuid";
import Message from "./Message";
//import ScrollToBottom from "react-scroll-to-bottom";
function MessageList(props)
{
    const scrollRef=useRef();
    useEffect(()=>
    {
     
     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      
    })
    var messages=props.messages;
    var chats=[];
    var chat={};
    for(var i=0;i<messages.length;i++)
    {
        if(i!==0)
        {
            if(messages[i].name===messages[i-1].name)
            {
                chat={
                    name:messages[i].name,
                    avatar:messages[i].avatar,
                    text:messages[i].text,
                    avatarvisibility:false};
                chats.push(chat);
            }
            else
            {
                chat={
                    name:messages[i].name,
                    avatar:messages[i].avatar,
                    text:messages[i].text,
                    avatarvisibility:true};
                chats.push(chat);
            }
        }
        else
        {
            chat={
                name:messages[i].name,
                avatar:messages[i].avatar,
                text:messages[i].text,
                avatarvisibility:true};
            chats.push(chat);
        }
    }
 
  
    return(
        <div className="MessageList">
            {chats.map((message)=><Message message={message} key={uuid()}/>)}
            <div ref={scrollRef} />
        </div>
    )
}
export default MessageList;