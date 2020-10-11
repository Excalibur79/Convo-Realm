var mongoose=require("mongoose");

var groupschema=new mongoose.Schema(
    {
        name:String,
        members:[
            {
                id:String
            }
        ],
        chats:[
            {
              name:String,
              room:String,
              avatar:String,
              text:String
            }
        ],

        socketroomid:String

    }
);

module.exports=mongoose.model("Group",groupschema);