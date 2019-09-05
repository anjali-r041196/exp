var express=require('express');
const router=express.Router();
var mongoose=require("mongoose")
const path=require("path")
router.use(express.static(path.join(__dirname,"/public")))
var bodyparser=require("body-parser")

var auth=require("../model/authors")

router.use(bodyparser.urlencoded({extended:true}))

var multer=require("multer")
var upload=multer({dest:"uploads/"})
var type=upload.single("file1")
router.get("/add",function(req,res){
    res.render("newbook")
})
router.post("/add" ,type,function(req,res){
    
    var u=new auth();
    u.btitle=req.body.bt;
    u.genre=req.body.ge;
    u.author=req.body.au;
    
    u.image=req.file.filename;
   
    u.save(function(err){
       
            res.redirect("/authors")
        
    })
    
    })
router.get("/",function(req,res){
    auth.find({},function(req,result){
       
    
    res.render("authors",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"}],authorr:result})  
    })
})
router.post("/edit/:id", type, (req,res)=>{
   auth.updateOne({btitle:req.params.id} ,{$set:{
       btitle:req.body.btitle,
     genre : req.body.genre,
        author : req.body.author,
        image : req.file.filename
    }}, (err,result)=>{
        auth.find({},(err,result)=>{
            res.render("authors",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"}],authorr:result})  
            })}) 
})
router.get("/:title",function(req,res){
    var i=req.params.title
    auth.find({},function(req,result){
    res.render("singleauthor",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"}],authorr:result[i]})  
    })
})
router.get("/delete/:t",function(req,res){
    var i=req.params.t
    auth.deleteOne({btitle:i},function(req,result){
        auth.find({},function(req,result){
    res.render("authors",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"}],authorr:result})  
        })
})
})
router.get("/edit/:t",function(req,res){
    var i=req.params.t
   
        auth.findOne({btitle:i},function(req,result){
    res.render("edit",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"}],res:result})  
        
})
})
module.exports=router;