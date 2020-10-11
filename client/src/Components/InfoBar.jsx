import React,{useState} from "react";
import "../styles/InfoBar.scss";
import Notification from "../Icons/notification.png";
import uuid from "react-uuid";
function InfoBar(props)
{
    const [isNotificationsShown,toggleisNotificationShown]=useState(false);

    var groupimage=""
    var groupname=""
    var groupid="";
    if(props.groupname)
    {
        var groupimage=props.groupname[0];
       var groupname=props.groupname;
       var groupid=props.roomid;
    }    
    var notifications=[];
    for(var i=0;i<props.notifications.length;i++)
    {
        var id=props.notifications[i][0];
        var text=props.notifications[i][1];
        if(id && text)
        {
            notifications.push(props.notifications[i]);
        }
    }
    const handleNotifications=()=>
    {
        if(notifications.length>0)
        {
            toggleisNotificationShown(!isNotificationsShown);
        }
        else
        {
            toggleisNotificationShown(false);
        }
    }
    return(
        
        <div className="InfoBar">
            {groupname?( 
            <div className="InfoBar__Group-div" >
                <div className="InfoBar__Image-Container">
                      <div className="InfoBar__Image">{groupimage}</div>
               </div>
               <div className="InfoBar__Group-name">
                        {groupname} (Id: {groupid})
                </div>
                <div className="InfoBar__Notifications" onClick={handleNotifications}>
                    <img src={Notification}/>
                </div>
                <div className={isNotificationsShown?"Notifications-div Notifications-shown":"Notifications-div Notifications-hidden"}>
                         {notifications.map((notification)=><div key={uuid()}>{notification[1]}</div>)}
                </div>
                   
                </div>
                ):(<div></div>)}
            
        </div>
    )
}
export default InfoBar;