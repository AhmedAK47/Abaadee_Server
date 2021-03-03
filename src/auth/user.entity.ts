import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity({ name: "User_Auth" })
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt:string;
    async validatPassword(password:string){
        const hash= await bcrypt.hash(password,this.salt);
        return hash==this.password;
    }
}
// this is a git check