import { PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractEnyity {
    
    constructor(id ?: number) {
        this.id = id; 
    }

    @PrimaryGeneratedColumn()
    id: number;
}