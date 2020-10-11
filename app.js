var express=require("express");
var mongoose=require("mongoose");
var socket=require("socket.io");
var bodyparser=require("body-parser");
var passport=require("passport");
var localstrategy=require("passport-local");
var cors=require("cors");
const cookieparser = require("cookie-parser");
const session = require("express-session");
var Chatdata=require("./models/Chatdata.js");
var Group=require("./models/Group.js");
var User=require("./models/User.js");
var app=express();
var path=require("path");

const {adduser,addgroupdata,removeuser,remainingmembersingroup,printgroupsarray,pushmessagetogroup,getmessagesfromgroup,cleanmessagesfromgroup}=require("./helper.js");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://Ankur:ankursahamotog5plus@cluster0.pidwk.mongodb.net/ConvoRealm?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex",true);





app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(
    cors({
      origin: "https://convo-realm.herokuapp.com", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
//app.use(express.json());






//mongoose depeciation warnings fixes

//Setting User Authentication Initials

//var passportlocalmongoose=require("passport-local-mongoose");


app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieparser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//--------------------------Here Goes The Routes ----------------------------------------------

app.get("/",(req,res)=>
{   
    res.send("Hello");
})

app.post("/register",function(req,res)//Register
{
        User.register(new User({username:req.body.username,avatar:req.body.avatar,groups:req.body.groups}),req.body.password,function(err,user)
        {
            if(err)
            {
                throw err;
            }
            passport.authenticate("local",{session:true})(req,res,function()
            {
                res.status(200).json(req.user);
               console.log("The registered user is",req.user);
            });
        });
});

app.post("/login",function(req,res)//Login
{
    passport.authenticate("local",{session:true})(req,res,function()
     {

            try
            {
                if(req.user)
                {
                  
                   return res.status(200).json(req.user);
                }
                else
                {
                    console.log("Credentials wrong");
                    return res.status(500).send(err);
                }
            }
            catch(err)
            {
                console.log(err.message);
                res.status(500).send(err);
            }


                
                
     });
           
});

/*app.get("/getuser",(req,res)=>
{
    if(req.user)
    {
        res.send(req.user)
    }
    else
    {
        res.send("User has Logged Out!!");
    }
})*/

app.get("/getuser",async (req,res)=>
{
    try
    {
        
        var user=await (await User.findById(req.user._id)).execPopulate("groups");
        //console.log(user);
        return req.user?res.status(200).json(user):res.status(500).send("No User");
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
})

app.post("/createGroup",async (req,res)=>
{
    try
    {
        var searchedGroup=await Group.findOne({socketroomid:req.body.socketroomid});
       // console.log(req.user);
        if(!searchedGroup)
        {
            var newGroup= await Group.create(req.body);
            var user=await User.findById(req.user._id);
            //console.log(user);
            user.groups.push(newGroup);
            await user.save();
            await user.execPopulate("groups");
            //console.log(newGroup);
            //console.log(user);
            return res.status(200).json({data:{message:"Group Created",groupdata:newGroup,user:user}});
        }
        console.log("Group Already exists!!");
        return res.status(500).send("Group already exists!");
    }
    catch(err)
    {
        return res.status(500).send(err);
    }
    
});


app.post("/joinGroup",async (req,res)=>
{
    try
    {
        //console.log(req.body.socketid);
        var group=await Group.findOne({socketroomid:req.body.socketid});
       // console.log(group);
        if(group)
        {
            var user=await User.findById(req.user._id);
            var GroupPresentInUser=user.groups.find((hisgroup)=>hisgroup.toString()===group._id.toString());
            if(GroupPresentInUser)
            {
                console.log("Group already present in user");
                return res.status(500).send("Group already present in User!!");
            }
            var userPresentInGroup=group.members.find((userdata)=>userdata.id===req.user._id.toString());
            if(userPresentInGroup)
            {
                console.log("User already Present In Members Array Of  This Group");
                return res.status(500).send("User already Present In Members Array Of  This Group");
            }
            group.members.push({id:user._id.toString()});
            await group.save();
            user.groups.push(group);
            await user.save();
            await user.execPopulate("groups");
            //console.log(user);
            //console.log(group);
            return res.status(200).json({data:{message:"Joining Successful",groupdata:group,user:user}});
        }
        console.log("Group with this socket id does'nt exist!");
        return res.status(500).send("Group with this socket Id doesnt exist!!");
    }
    catch
    {
        return res.status(500).send("Server Error!");
    }
});


const PORT =  process.env.PORT || 5000;









var server = app.listen(PORT,()=>
{
    console.log(`Server has started on port ${PORT}`);
});

var io=socket(server);

io.on("connection",(socket)=>
{
    //console.log("Made a socket Connection");
    socket.on("join",(data,cb)=>
    {
        
        const returnedusers=adduser({usersocketid:socket.id,name:data.name,room:data.room});
        //console.log("The users array is ",returnedusers);
        if(returnedusers)
        {
            socket.broadcast.to(data.room).emit("notification",{notification:{room:data.room,text:`${data.name} has Joined to room ${data.room}`}});
            socket.join(data.room);
            
            cb(data);
        }

        cb({error:"User is already present in that room no need to rejoin"});
       
        
    });

    socket.on("sendmessage",(data,callback)=>
    {
        //console.log("the message is ",data);
        console.log("message has successfully pushed to group",pushmessagetogroup(data));
        io.to(data.room).emit("message",{message:{name:data.name,text:data.text,room:data.room,avatar:data.avatar}});
        callback();
    })



    socket.on("disconnect",async function()
    {
       
       // console.log(socket.id);
        var data=removeuser(socket.id);
        
        if(data.length>0)
        {
            for(var i=0;i<data.length;i++)
            {
                console.log(`remaining members in ${data[i].room} is:`,remainingmembersingroup(data[i].room));
                console.log(`${data[i].name} disconnected from room ${data[i].room}`);
                socket.broadcast.to(data[i].room).emit("notification",{notification:{room:data[i].room,text:`${data[i].name} disconnected from ${data[i].room}`}});

                if(remainingmembersingroup(data[i].room)===0)
                {
                    var group=await Group.findOne({socketroomid:data[i].room});
                    console.log("The found group to be backed up is ",group);

                   var messages= await getmessagesfromgroup(data[i].room);
                    for(var j=0;j<messages.length;j++)
                    {
                        group.chats.push(messages[j]);
                    }   
                   
                    await group.save();
                   // console.log(group);
                    cleanmessagesfromgroup(data[i].room);


                }

            }
           
        }
        else
        {
            console.log("Socket Disconnected which was unsubscribed anyways!");

        }
        
        
      
        

    })

});

//Client Render=--------
if(process.env.NODE_ENV==="production")
{
    app.use(express.static("client/build"));
    app.get("*",function(req,res)
    {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
}


//-----------------------





