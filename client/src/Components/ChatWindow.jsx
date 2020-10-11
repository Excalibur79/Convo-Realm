import React,{useContext,useEffect,useState} from "react";
import {ChatContext} from "../Contexts/ChatContext";
import {UserContext} from "../Contexts/UserContext";
import InfoBar from "./InfoBar";
import MessageList from "./MessageList";
import Send from "../Icons/send.png";

import "../styles/ChatWindow.scss";

import io from "socket.io-client";
let socket;
const ENDPOINT=`https://convo-realm.herokuapp.com`;
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
    const [windowmessage,setwindowmessage]=useState("");
    const [sentmessage,setsentmessage]=useState({});
    const [windowgroupsdata,setwindowgroupsdata]=useState(Usergroups);
    var [helper,sethelper]=useState(1);

  /*  useEffect(()=>
    {
        setwindowmessages(messages);
    },[messages])*/

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
                //console.log("returned data is :");
                //console.log(returneddata);
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
            //var x=[data.notification.room,data.notification.text];
            //setwindownotifications([...windownotifications,x])

            
            Changenotification(windownotification);
            Changenotifications(windownotifications);
            
            
        })
    },[roomid,windownotifications,groupname])

    useEffect(()=>
    {
        var x=[windownotification.room,windownotification.text];
        //console.log("Window Notification is ",windownotification);
        setwindownotifications([...windownotifications,x]);

 
    },[windownotification])

   
        socket.on("message",(data)=>
        {
            try
            {
               // setwindowmessage(data.message);
               setsentmessage(data.message);
               setwindowmessage(data.message);


            }
            catch(err)
            {
                console.log(err);
            }
            
            
        })
      
   

    useEffect(()=>
    {
            
             if(sentmessage.name && sentmessage.room && sentmessage.avatar && sentmessage.text && Object.keys(sentmessage).length!==0)
             {
                // console.log("lulululu");
                var groupsdata=windowgroupsdata;
                for(var i=0;i<groupsdata.length;i++)
                {
                    if(groupsdata[i].socketroomid===sentmessage.room)
                    {
                        groupsdata[i].chats.push(sentmessage);
                        break;
                    }
                }
                setwindowgroupsdata(groupsdata);
                
                
             }
            

    },[sentmessage])

    const handleSend=()=>
    {
        if(typeof windowmessage!=="object" && windowmessage!=="")
        {
            var data={name:Username,room:roomid,avatar:Useravatar,text:windowmessage}
            socket.emit("sendmessage",data,()=>
            {

                setwindowmessage("");
                var val=document.getElementById("input-message");
               
                val.value="";
              

            })
        }
        else
        {
            alert("Can't Send an Empty Message!");
        }
       
    }
 //----------------------------   



    var filterednotifications=windownotifications.filter((x)=>roomid===x[0])

    useEffect(()=>
    {
        
        var filteredgroup=windowgroupsdata.find((group)=>group.socketroomid===roomid);
       // console.log("hurrururur");
        if(filteredgroup )
        {
            setwindowmessages(filteredgroup.chats);
           

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
                    <input name="message"  id="input-message" onChange={(e)=>setwindowmessage(e.target.value)} placeholder="Type a message"/>
                    <button onClick={handleSend}><img src={Send}/></button>
                </div>):(<></>)}
               
        </div>
    )
}
export default ChatWindow;