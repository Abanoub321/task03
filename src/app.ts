import "reflect-metadata";
import {createConnection} from "typeorm";
import {Members} from "../Entity/Member";
const express = require('express');
const app = express();
   
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "abanoub5599",
    database: "mydb",
    entities: [
        Members
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    app.listen(3000,()=> console.log("Listening to port 3000"));

    let memberRepo = connection.getRepository(Members);

    app.get('/',async (req,res)=>{
      let savedmembers = await memberRepo.find();
        if(savedmembers.length<1)
         {
         res.send("No members exists");
        }else{
         res.send(savedmembers);
        }
    });

    app.get('/:id',async(req,res)=>{
        let id:number = parseInt(req.params.id);
        let member = await memberRepo.findOne(id);
        if(member === undefined){
        res.send("Doesn't Exist");
        }else{
            res.send(member);
        }
    });

    app.use(express.json());

     app.post('/',async (req,res)=>{
        let newMember:Members = req.body;
        await memberRepo.save(newMember);   
        res.send(newMember);
    });

    app.put('/:id',async(req,res)=>{
        let id:number = parseInt(req.params.id);
        let newMember = await memberRepo.findOne(id);
        if(newMember === undefined){
            res.send("Doesn't Exist");
        }else{
            newMember.name = req.body.name;
            newMember.committee = req.body.committee;
            newMember.phone = req.body.phone;
            newMember.email =req.body.email;
            await memberRepo.save(newMember);
            res.send(newMember);
        }
       
    });

    app.delete('/:id',async(req,res)=>{
        let id:number = parseInt(req.params.id);
        let removedMember = await memberRepo.findOne(id);
        if(removedMember===undefined){
            res.send("This member doesn't exist already");
        }else{
            await memberRepo.remove(removedMember);
            res.send("Deleted..");
        }
    });
}).catch(error => console.log(error));