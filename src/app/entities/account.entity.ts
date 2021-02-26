import { Entity, Column } from "typeorm";
import { AbstractEnyity } from "./abstract.entity";

@Entity()
export class Account extends AbstractEnyity {

    constructor(id ?: number, name ?: String, note ?: String)   {
        super(id);
        this.name = name;
        this.note = note;
    }
    
    @Column({ length: 50, unique: true })
    name: String;

    @Column({ length: 255, nullable: true })
    note: String;
}