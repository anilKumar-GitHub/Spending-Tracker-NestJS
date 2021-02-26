import { Entity, Column, TreeParent, JoinColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { AbstractEnyity } from "./abstract.entity";
import { CategoryType } from "app/custom/enum/category.type";

@Entity()
export class Category extends AbstractEnyity    {

    @IsString({ message: 'Name should be non-numeric' })
    @MaxLength(50, { message: 'Category name length should not be more than 50 character' })
    @Column({ length: 50, unique: true })
    name: String;

    @IsNotEmpty({ message: 'Select the category type' })
    @Column({
        type: "enum",
        enum: CategoryType,
        default: CategoryType.EXPENSE
    })
    type: CategoryType;

    @Column({ length: 100, nullable: true })
    icon: String;

    @ManyToOne(type => Category, category => category.parent, { nullable: true, lazy: false })
    @JoinColumn({ name: 'parent_id' })
    parent: Category;
}