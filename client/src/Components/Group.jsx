import React,{useState,useEffect} from "react";
import Chat from "./Chat";
import "../styles/Group.scss";


function Group(props)
{
    var isClicked=false;
    if(props.mongoIdofShownGroup===props.mongoGroupId)
    {
        isClicked=true;
    }
    const handleClick=e=>
    {
        
        props.handleswitch(props.mongoGroupId);
    }
  
    if(props.groupname)
    {
        var groupimage=props.groupname[0];
       var groupname=props.groupname;
    }    
    return(
        <div className="Group">
                 <div className={isClicked?"Group-div Current-group":"Group-div"} onClick={handleClick} >
                     <div className="Image-Container">
                          <div className="Image">{groupimage}</div>
                     </div>
                     <div className="Group-name">
                           {groupname}
                     </div>
                   
                </div>
                <div className="Chat-window">
                    <Chat
                    shown={isClicked}
                    mongogroupid={props.mongoGroupId}
                    socketroomid={props.socketroomid}
                    groupname={props.groupname}
                    chats={props.chats}
                   
                    

                    />
                </div>
               
        </div>
       
    )
}
export default Group;
