const express=require("express")
const {noteModel}=require("../model/note.model")
const noteRouter=express.Router();

noteRouter.get("/",async(req,res)=>{
    const notes=await noteModel.find({"user":req.body.user})
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const note=new noteModel(payload)
    await note.save()
    res.send("new note created")
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
    
    
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteID=req.params.id
    const payload=req.body
    const note=await noteModel.findOne({_id:noteID})
    const userID_in_note=note.user
    const userID_making_req=req.body.user
    try {
        if(userID_making_req!==userID_in_note){
           res.send({"msg":"you are not authorized"})
        }else{
            await noteModel.findByIdAndUpdate({_id:noteID},payload)
            res.send("updated")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong"})
    }
    
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    const note=await noteModel.findOne({_id:noteID})
    const userID_in_note=note.user
    const userID_making_req=req.body.user
    try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"})
         }else{
            await noteModel.findByIdAndDelete({_id:noteID})
            res.send("deleted...")
         }
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong"})

    }
  
})

module.exports={noteRouter}