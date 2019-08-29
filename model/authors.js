var mongoose=require("mongoose")
var schema=mongoose.Schema
var authorschema=new schema({
    btitle:String,
    genre:{type:String,required:true},
    author:{type:String,required:true}
})
var authormodel=mongoose.model("authors",authorschema,"lib1")
module.exports=authormodel