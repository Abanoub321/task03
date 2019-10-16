import "reflect-metadata";
import {createConnection} from "typeorm";
import {Members} from "../Entity/Member";
 
const con = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "test",
    database: "mydb",
    entities: [
        Members
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    let m = new Members();
    m.name = 'Abanoub mamdouh';
    m.email = 'abanoubmilad12@gmail.com';
    m.phone = '01206968646';
    m.committee = 'media';
    await connection.manager.save(m);
    console.log("member has been saved. member id is " + m.id);
}).catch(error => console.log(error));