var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");


var userschema=new mongoose.Schema(
    {
        avatar:String,
        username:String,
        password:String,
        groups:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Group"
            }
        
        ]
        
    }
);
userschema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User",userschema);