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
    console.log('Members deliverd');
        res.send(savedmembers);
    });

    app.get('/:id',async(req,res)=>{
    let id:number = parseInt(req.params.id);
    let member = await memberRepo.findOne(id);
    res.send(member);
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
        newMember.name = req.body.name;
        newMember.committee = req.body.committee;
        newMember.phone = req.body.phone;
        newMember.email =req.body.email;
        await memberRepo.save(newMember);
        res.send(newMember);
    });

    app.delete('/:id',async(req,res)=>{
        let id:number = parseInt(req.params.id);
        let removedMember = await memberRepo.findOne(id);
        await memberRepo.remove(removedMember);
        res.send("Deleted..");
    });
}).catch(error => console.log(error));