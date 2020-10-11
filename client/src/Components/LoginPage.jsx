import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import {baseUrl} from "./backendUrl";
import {Redirect,Link} from "react-router-dom";
import "../styles/LoginPage.scss";
import submit from "../Icons/submit.png";


import {UserContext} from "../Contexts/UserContext";


function LoginPage(props)
{
    const {Username,Userid,Useravatar,Usergroups,Changeuser,Changeid,Changeavatar,Changegroups}=useContext(UserContext);
    const [name,setname]=useState("");
    const [password,setpassword]=useState("")
    

    const login=(e)=>
    {
        e.preventDefault();
        if(name && password && name!=="" && password!=="")
        {
            var data={
                username:name,
                password:password,
            }
            axios({
                method: "POST",
                data:data ,
                withCredentials: true,
                url: `${baseUrl}/login`,
              }).then((res) =>
               {
                   console.log(res.data);
                   Changeuser(res.data.username);
                   Changeid(res.data._id);
                   Changeavatar(res.data.avatar);
                   Changegroups(res.data.groups);
                   props.history.push("/");
               }).catch((err)=>{
                   console.log(err);
                   alert("Wrong Credentials!!");
                   Changeuser("");
                   Changeid("");
                   Changeavatar("");
                   Changegroups([]);
               });
        }
        else{
            alert("Invalid Credentials!");
        }
       
        
    }

  
    const getuser=()=>
    {
        axios({
            method:"GET",
            withCredentials:true,
            url:`${baseUrl}/getuser`,
        }).then((res)=>
        {
            console.log(res.data);
        }).catch((err)=>
        {
            console.log(err);
        })
        
    }
    
    return(
        <div>
             <div className="LoginPage">
                <h1 className="Heading"><span className="Convo">Convo </span><span className="Realm">Realm</span></h1>
                <h1 className="Heading"><span>Login</span></h1>
                <form onSubmit={login}>

                    <div className="Name-div u-margin-bottom-small">
                       <input value={name} onChange={e=>setname(e.target.value)} placeholder=" " name="username" id="name"/>
                       <label className="Name-label" for="name">UserName</label>
                   </div>
                   <div className="Password-div">
                       
                       <input value={password} type="password" onChange={e=>setpassword(e.target.value)} placeholder=" " name="password" id="password"/>
                       <label className="Password-label" for="password">Password</label>
                  </div>

                    
                  <div className="Submit"><button><img src={submit}/></button></div>
                </form>
              
               
            </div>
            <div className="To-Register">Don't have an account? <Link exact to="/register">Register</Link> </div>
           
        </div>
           
    )
}

export default LoginPage;