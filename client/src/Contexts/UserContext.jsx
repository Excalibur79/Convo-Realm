import React,{createContext,useState} from "react";

export const UserContext=createContext();

export function UserProvider(props)
{
   const [Username,setusername]=useState("");
   const [Userid,setuserid]=useState("");
   const [Useravatar,setuseravatar]=useState("");
   const [Usergroups,setusergroups]=useState([]);

   const Changeuser=name=>
   {
       setusername(name);
   }

    const Changeid=id=>
    {
        setuserid(id);
    }

   const Changeavatar=avatar=>
   {
       setuseravatar(avatar);
   }
  
   const Changegroups=groups=>
   {
       setusergroups(groups);
   }
    return(
        <UserContext.Provider value={{
        Username:Username,
        Userid:Userid,
        Useravatar:Useravatar,
        Usergroups:Usergroups,
        Changeuser:Changeuser,
        Changeid:Changeid,
        Changeavatar:Changeavatar,
        Changegroups:Changegroups
          }
        }>
            {props.children}
        </UserContext.Provider>

    )
}
