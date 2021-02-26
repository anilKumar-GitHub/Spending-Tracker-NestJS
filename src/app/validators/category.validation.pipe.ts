import { ArgumentMetadata, Injectable, HttpException, 
    HttpStatus, PipeTransform, BadRequestException } from '@nestjs/common';

import { Category } from 'app/entities';
import { CategoryType } from 'app/custom/enum';

@Injectable()
export class CategoryValidationPipe implements PipeTransform<any> {

  async transform(category: Category, arg: ArgumentMetadata) {

    console.log(category)
    if (!category)
      throw new BadRequestException('Incomplete request.');

    if (category.parent != null && category.parent.name == category.name) {
      throw new HttpException('same type can\'t be set as parent', HttpStatus.CONFLICT);
    }

    if (CategoryType.EXPENSE != category.type && CategoryType.INCOME != category.type) {
      throw new HttpException('Invalid category type. Allowed[' 
          + CategoryType.EXPENSE + ', ' + CategoryType.INCOME +']',
          HttpStatus.BAD_REQUEST);
    }

    return category;
  }
}