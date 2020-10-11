//const user = require("./models/user");

var users=[];
var groups=[];

const adduser=(data)=>
{
    var usersocketid=data.usersocketid;
    var name=data.name;
    var room=data.room;
   
    var sameuserobjectpresent=users.find((x)=>JSON.stringify(x)===JSON.stringify({usersocketid:usersocketid,name:name,room:room}));
    var issameuserobjectpresent=sameuserobjectpresent?true:false;
    //console.log("Same user presence is",issameuserobjectpresent,"And The clone user is",sameuserobjectpresent);
    if(!issameuserobjectpresent)
    {
        const user={
            usersocketid:usersocketid,
            name:name,
            room:room
        }
       console.log("The groups array is",addgroupdata(user)) ;
        users.push(user);
        return users;
    }
    return false;
    
}

const addgroupdata=(data)=>
{
    var socketroomid=data.room;
    var messages=[];
    var isgroupalreadypresent=groups.filter((x)=>x.socketroomid===socketroomid);
   
    if(isgroupalreadypresent.length===0)
    {
        const group={
            socketroomid:socketroomid,
            messages:messages
        }
        groups.push(group);
        return groups;
    }
    return groups;
}
const printgroupsarray=()=>
{
    return groups;
}
var removeuser=(id)=>
{
  
        //var user=users.find((user)=>id===user.usersocketid);
        var user =users.filter((user)=>id===user.usersocketid);
       // console.log("asdasasd",user);
        if(user)
        {
           // console.log("helper// removed user is",user);
            users=users.filter((y)=>y.usersocketid!==id);
            //console.log("Now the users array is ",users);
            return user;
    
        }
        return user;
      
 
    
}

const remainingmembersingroup=(roomid)=>
{
    var counter=0;
    for(var i=0;i<users.length;i++)
    {
        if(users[i].room===roomid)
        {
            counter++;
        }
    }
    return counter;
}

const pushmessagetogroup=(data)=>
{
    for(var i=0;i<groups.length;i++)
    {
        if(groups[i].socketroomid===data.room)
        {
            groups[i].messages.push(data);
            return groups[i];

        }
    }
    
}

const getmessagesfromgroup=(socketroomid)=>
{
    var group=groups.find((x)=>x.socketroomid===socketroomid);
  //  console.log("hmmmmmm",group);
    return group.messages;
}

const cleanmessagesfromgroup=(socketroomid)=>
{
    for(var i=0;i<groups.length;i++)
    {
        if(groups[i].socketroomid===socketroomid)
        {
            groups[i].messages=[];
           // console.log(`${groups[i].socketroomid} 's messages has been cleaned Up!`);
            break;
        }
    }
    
}

module.exports={adduser,addgroupdata,removeuser,remainingmembersingroup,printgroupsarray,pushmessagetogroup,getmessagesfromgroup,cleanmessagesfromgroup};