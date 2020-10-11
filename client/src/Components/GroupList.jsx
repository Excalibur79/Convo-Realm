import React,{useState,useContext,useEffect} from "react";
import {UserContext} from "../Contexts/UserContext";
import Group from "./Group";
import "../styles/GroupList.scss";



function GroupList(props)
{
    
    const {Usergroups}=useContext(UserContext);
    const [mongoIdofShownGroup,changeId]=useState("");

    const handleswitch=(value)=>
    {
        changeId(value);
    }

    return(
        <div className="Group-List">
           {Usergroups.map((Usergroup)=><Group 
               chats={Usergroup.chats} 
               mongoGroupId={Usergroup._id}
               groupname={Usergroup.name}
               members={Usergroup.members}
               socketroomid={Usergroup.socketroomid}     
               handleswitch={handleswitch}  
               mongoIdofShownGroup={mongoIdofShownGroup}   
                key={Usergroup._id}
           
           />)}
        </div>

    )
}
export default GroupList;