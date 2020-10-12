import React,{useContext,useEffect,useState,useRef} from "react";
import {ChatContext} from "../Contexts/ChatContext";
import {UserContext} from "../Contexts/UserContext";
import InfoBar from "./InfoBar";
import MessageList from "./MessageList";
import Send from "../Icons/send.png";

import "../styles/ChatWindow.scss";

import io from "socket.io-client";
let socket;
const ENDPOINT=`https://convo-realm.herokuapp.com/`;
socket=io(ENDPOINT);



function ChatWindow(props)
{
    const {notifications,notification,messages,message,groupname,roomid,Changenotifications,Changenotification,Changemessages,
        Changemessage,Changegroupname,Changeroomid  
    }=useContext(ChatContext);


    const {Username,Userid,Useravatar,Changeavatar,Usergroups,Changegroups}=useContext(UserContext);

    const [windownotifications,setwindownotifications]=useState(notifications);
    const [windownotification,setwindownotification]=useState(notification);
    const [windowmessages,setwindowmessages]=useState(messages);
    const [sentmessage,setsentmessage]=useState({});
    const [windowgroupsdata,setwindowgroupsdata]=useState(Usergroups);

    var isRendered=useRef(false);

    useEffect(()=>
    {
        setwindowgroupsdata(Usergroups);
        
    },[Usergroups])
    
    useEffect(()=>
    {
        var data={name:Username,room:roomid,avatar:Useravatar};
        if(groupname!==""||roomid!=="")
        {
            socket.emit("join",data,(returneddata)=>
            {
               
            });
    
           
    
            return ()=>
            {
                socket.emit("disconnect");
                socket.off();
            }
        }
       

    },[roomid,groupname]);

   
    useEffect(()=>
    {
        socket.on("notification",(data)=>
        {
            
           
            setwindownotification(data.notification);
          

            
            Changenotification(windownotification);
            Changenotifications(windownotifications);
            
            
        })
    },[roomid,windownotifications,groupname])

    useEffect(()=>
    {
        var x=[windownotification.room,windownotification.text];
        setwindownotifications([...windownotifications,x]);

 
    },[windownotification])

   
    useEffect(()=>
    {
        socket.on("message",(data)=>
        {
            try
            {
               setsentmessage(data.message);


            }
            catch(err)
            {
                console.log(err);
            }
            
            
        })
      
    })
       
   

    useEffect(()=>
    {
            isRendered.current=true;
             if(sentmessage.name && sentmessage.room && sentmessage.avatar && sentmessage.text && Object.keys(sentmessage).length!==0)
             {
                var groupsdata=[...windowgroupsdata];
                for(var i=0;i<groupsdata.length;i++)
                {
                    if(groupsdata[i].socketroomid===sentmessage.room)
                    {
                        groupsdata[i].chats.push(sentmessage);
                        break;
                    }
                }
                if(isRendered.current)
                setwindowgroupsdata(groupsdata);
                
                
             }
             return()=>
             {
                 isRendered.current=false;
             }
            

    },[sentmessage])

    const handleSend=()=>
    {
        var val=document.getElementById("input-message");

        if(typeof val.value!=="object" && val.value!=="")
        {
            var data={name:Username,room:roomid,avatar:Useravatar,text:val.value}
            socket.emit("sendmessage",data,()=>
            {

               
               
                val.value="";
              

            })
        }
        else
        {
            alert("Can't Send an Empty Message!");
        }
       
    }
 //----------------------------   




    useEffect(()=>
    {
        if(isRendered.current)
        {
            var filteredgroup=windowgroupsdata.find((group)=>group.socketroomid===roomid);
                if(filteredgroup )
                {
                    setwindowmessages(filteredgroup.chats);
                

                }
        }
        
    },[windowgroupsdata,roomid]);

   
    
    

    
    return(
        <div className="ChatWindow">
                <div><InfoBar
                    groupname={groupname}
                    roomid={roomid}
                    notifications={windownotifications}
                /></div>
               
                      <MessageList messages={windowmessages}/>
              
                {groupname&&groupname!=""?( <div className="Message-Send">
                    <input name="message"  id="input-message" placeholder="Type a message"/>
                    <button onClick={handleSend}><img src={Send}/></button>
                </div>):(<></>)}
               
        </div>
    )
}
export default ChatWindow;