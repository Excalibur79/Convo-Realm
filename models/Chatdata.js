var mongoose = require("mongoose");

var chatdataschema=new mongoose.Schema(
    {
        messages:[
            {
                avatar:String,
                name:String,
                text:String

            }
        ]
    }
);

module.exports = mongoose.model("Chatdata",chatdataschema);