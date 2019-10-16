import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
 
@Entity()
export class Members {
 
    @PrimaryGeneratedColumn()
    id: number | undefined;
 
    @Column('text')
    name: string | undefined;
 
    @Column('text')
    email: string | undefined;
 
    @Column('text')
    phone: string | undefined;
 
    @Column('text')
    committee: string | undefined;
}