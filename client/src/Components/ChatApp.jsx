import React,{useState,useEffect,useContext} from "react";
import {baseUrl} from "./backendUrl";
import axios from "axios";
import {UserContext} from "../Contexts/UserContext";
import {ChatContext} from "../Contexts/ChatContext";
import Remote from "./Remote";
import GroupList from "./GroupList";
import ChatWindow from "./ChatWindow";
import "../styles/ChatApp.scss";



function ChatApp(props)
{
    const {Username,Userid,Useravatar,Usergroups,Changeuser,Changeid,Changeavatar,Changegroups}=useContext(UserContext);
    const {messages,Changemessages}=useContext(ChatContext);


    //Remote Animation Constants------
    const [Creategrouptoggle,setCreategrouptoggle]=useState(false);
    const [Joingrouptoggle,setJoingrouptoggle]=useState(false);

    const createtogglehandle=e=>
    {
        setCreategrouptoggle(!Creategrouptoggle);
        if(Joingrouptoggle)
        {
            setJoingrouptoggle(false);
        }
    }
    const jointogglehandle=e=>
    {
        setJoingrouptoggle(!Joingrouptoggle);
        if(Creategrouptoggle)
        {
            setCreategrouptoggle(false);
        }
    }

    //------

    useEffect(()=>
    {
        axios(
        {
            method:"GET",
            withCredentials:true,
            url:`${baseUrl}/getuser`
        }).then((res)=>
        {
            console.log(res.data);
            Changeuser(res.data.username);
            Changeid(res.data._id);
            Changeavatar(res.data.avatar);
            Changegroups(res.data.groups);

           

        }).catch((err)=>
        {
            console.log(err);
            props.history.push("/login");
        })
    },[])
    return(
        <div className="ChatApp">
            <div className="Left Section">
                <Remote
                    Creategrouptoggle={Creategrouptoggle}
                    Joingrouptoggle={Joingrouptoggle}
                    createtogglehandle={createtogglehandle}
                    jointogglehandle={jointogglehandle}
                />
                <GroupList
                Creategrouptoggle={Creategrouptoggle}
                Joingrouptoggle={Joingrouptoggle}
                
                />
            </div>
            <div className="Right Section">
                 <ChatWindow/>
            </div>
        </div>
    )
}
export default ChatApp;