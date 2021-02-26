import { Controller, Get, Post, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractController } from './abstract';
import { Category } from '@app-entities';
import { CategoriesService } from '@app-services';
import { CategoryValidationPipe } from '@app-validators';

@Controller('categories')
export class CategoriesController extends AbstractController {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private categoryService: CategoriesService
    ) {
        super()
    }

    @Get()
    public getList(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Post()
    public async addNewCategory(@Body(new CategoryValidationPipe()) category: Category): Promise<Category> {

        if (category.parent) {
            await this.categoryRepository.findOne(category.parent.id)
            .then(p => {
                if (p) {
                    category.parent = p;
                    console.log('parent id : ' + category.parent.name)
                }
            })
        }

        await this.categoryRepository.save(category).then(res => {
            category = res;
        }).catch(err => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        });
        return category;
    }

    @Delete('/:id')
    public deleteCategory(@Param('id') id: number): void {

        this.categoryRepository.delete(id).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            throw new HttpException('category not found', HttpStatus.NOT_FOUND)
        });
    }
}