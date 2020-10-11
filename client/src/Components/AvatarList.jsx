import React,{useState} from "react";
import "../styles/AvatarList.scss";
import Avatar from "./Avatar";
function AvatarList(props)
{
    //-------Avatar array--------------------'
    var avatarnames=["ant","antilope","bear","bee","bug","bunny","butterfly",
    "cat","caterpillar","chameleon","cobra","cow","coyote","crab","crocodile",
    "dog","duck","elephant","fish","frog","giraffe","goldfish","gorilla","horse",
"jaguar","koala","lion","lizard","lobster","medusa","octopus","ostrich","owl",
"parrot","pig","rabbit","reindeer","rooster","scorpion","sea star","shark",
"sheep","snake","spider","stingray","tasmanian devil","toucan","turtle",
"wolf","zebra"];

   var set1=[];
   var set2=[];
   var set3=[];
   var set4=[];
   var set5=[];
   var set6=[];

   var set7=[];
   var set8=[];
   var set9=[];
   var set10=[];

    if(avatarnames)
    {
        for(var i=0;i<5;i++)
    {
        set1.push(avatarnames[i]);
    }
    for(var i=5;i<10;i++)
    {
        set2.push(avatarnames[i]);
    }
    for(var i=10;i<15;i++)
    {
        set3.push(avatarnames[i]);
    }
    for(var i=15;i<20;i++)
    {
        set4.push(avatarnames[i]);
    }
    for(var i=20;i<25;i++)
    {
        set5.push(avatarnames[i]);
    }
    for(var i=25;i<30;i++)
    {
        set6.push(avatarnames[i]);
    }
    for(var i=30;i<35;i++)
    {
        set7.push(avatarnames[i]);
    }
    for(var i=35;i<40;i++)
    {
        set8.push(avatarnames[i]);
    }
    for(var i=40;i<45;i++)
    {
        set9.push(avatarnames[i]);
    }
    for(var i=45;i<50;i++)
    {
        set10.push(avatarnames[i]);
    }

    }
    

    //------------------------------
    const [Avatarvalue,setAvatarvalue]=useState("");
    const ChangeAvatar=(data)=>
    {
        setAvatarvalue(data);
        props.ChangeAvatar(data);

    }
    return(
        <div className={props.AvatarListShown?"AvatarList AvatarList-shown":"AvatarList AvatarList-hidden"}>
                <div className="row">
                    {set1.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set2.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set3.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set4.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set5.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set6.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                    {set7.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                     {set8.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                   {set9.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>
                <div className="row">
                 {set10.map((data)=>
                    <div>
                        <Avatar name={data} setavatar={ChangeAvatar}/>
                    </div>)}
                </div>

        </div>
    )
}
export default AvatarList;