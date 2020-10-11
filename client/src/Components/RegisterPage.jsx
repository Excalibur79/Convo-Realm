import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import {baseUrl} from "./backendUrl";
import {Redirect,Link} from "react-router-dom";
import "../styles/RegisterPage.scss";
import AvatarList from "./AvatarList";
import dropdown from "../Icons/dropdown.png";
import submit from "../Icons/submit.png";

import {UserContext} from "../Contexts/UserContext";


function RegisterPage(props)
{
    const {Username,Userid,Useravatar,Usergroups,Changeuser,Changeid,Changeavatar,Changegroups}=useContext(UserContext);
    const [name,setname]=useState(Username);
    const [avatar,setavatar]=useState(Useravatar);
    const [password,setpassword]=useState("")
    const [groups,setgroups]=useState([]);

    //----------------------------Animation states -----------------------

    const [AvatarListShown,toggleAvatarListShown]=useState(false);
    //-----------------------------------------------------------------------

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(name!=="" && avatar!=="" && password!=="")
        {
            axios({
                method:"POST",
                data:{
                    username:name,
                    avatar:avatar,
                    password:password,
                    groups:groups
                },
                withCredentials:true,
                url:`${baseUrl}/register`
            }).then((res)=>
            {
               // console.log(res);
                Changeuser(res.data.username);
                Changeid(res.data._id);
                Changeavatar(res.data.avatar);
                Changegroups(res.data.groups);
                props.history.push("/");
            }).catch((err)=>
            {
                console.log(err);
                alert("Registration failed 😥❗");
                Changeuser("");
                Changeavatar("");
                Changegroups([]);
    
            })
        }   
        else
        {
            alert("Invalid Credentials!");
        }

       
       
       
        
    }
    useEffect(()=>
    {
        toggleAvatarListShown(false);
    },[avatar])
    const ChangeAvatar=(data)=>
    {
        setavatar(data);
    }
    return(
        <div>
             <div className="RegisterPage">
                <h1 className="Heading"><span className="Convo">Convo </span><span className="Realm">Realm</span></h1>
                <h1 className="Heading"><span>Register</span></h1>
                <form onSubmit={handleSubmit}>
                    <div className="Name-div ">
                       
                        <input value={name} onChange={e=>setname(e.target.value)} placeholder=" " name="username" id="name"/>
                        <label className="Name-label" for="name">UserName</label>
                    </div>
                    <div className="Avatar-div">
                        <div className="Avatar-config">
                            <div className="Select-Avatar">{avatar!=""?`Selected (${avatar})`:"Select Avatar"}</div>
                            <div className={AvatarListShown?"Dropdown rotate180":"Dropdown rotate0"} onClick={()=>toggleAvatarListShown(!AvatarListShown)}>
                                <img src={dropdown}/></div>
                        </div>
                         
                         <AvatarList
                            ChangeAvatar={ChangeAvatar}
                            AvatarListShown={AvatarListShown}
                         />
                    </div>
                    <div className="Password-div">
                       
                         <input value={password} type="password" onChange={e=>setpassword(e.target.value)} placeholder=" " name="password" id="password"/>
                         <label className="Password-label" for="password">Password</label>
                    </div>
                   
                    <div className="Submit"><button><img src={submit}/></button></div>
                </form>
            </div>
            <div className={AvatarListShown?"To-Login u-z-index-1":"To-Login"}>Already have an account? <Link exact to="/login">Login</Link></div>
        </div>
           
    )
}

export default RegisterPage;