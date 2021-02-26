import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '@app-entities';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    )   { }

    public findAll(): Promise<Category[]>    {

        let cat: Promise<Category[]> = this.categoryRepository.find();
        cat.then((data) => {
            data.forEach(d => {
                let parent = d.parent;
                console.log(d.id + " : " + d.name + " : " + d.parent + " : " + parent)
            });
        })
        return cat;
    }

    public async save(category: Category): Promise<Category>   {

        await this.categoryRepository.findOne(category.parent.id)
        .then(p => {
            category.parent = p;
            console.log('parent id : ' + category.parent.name)
        })
        return this.categoryRepository.save(category);
    }
}