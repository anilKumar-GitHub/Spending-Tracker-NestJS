import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { AbstractEnyity } from "./abstract.entity";
import { Account } from "@app-entities";
import { Category } from "@app-entities";

@Entity()
export class Transactions extends AbstractEnyity    {

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column({ length: 255, nullable: true })
    note: string;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(type => Account)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}